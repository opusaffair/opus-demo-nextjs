import { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useCookies } from "react-cookie";

const CURRENT_USER_QUERY = gql`
  query {
    me
  }
`;

const SIGN_IN = gql`
  mutation Signin($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

const SigninBox = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);

  const [signin, { error, loading, data }] = useMutation(SIGN_IN, {
    onCompleted(data) {
      const { login } = data;
      setCookie("token", login, { path: "/" });
      console.log("token is:", login);
    }
  });

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        e.stopPropagation();
        signin({
          variables: {
            email,
            password
          },
          refetchQueries: [{ query: CURRENT_USER_QUERY }]
        });
      }}
    >
      {error && <p>Error is: {error.message}</p>}
      <input
        name="email"
        placeholder="Email"
        autoComplete="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <br />
      <input
        name="password"
        placeholder="Password"
        autoComplete="current-password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <br />
      <button>{loading ? "Loading" : "Sign in"}</button>
    </form>
  );
};

export default SigninBox;
