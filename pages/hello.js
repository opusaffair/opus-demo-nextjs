import Layout from "../components/Layout";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useFetchUser } from "../utils/user";

const HelloView = props => {
  const HELLO_QUERY = gql`
    query hello {
      hello
    }
  `;

  const { user, userLoading } = useFetchUser();
  const { data, loading, error } = useQuery(HELLO_QUERY);
  if (error) console.log(error.message);
  const notAuthorized =
    error && error.message == `GraphQL error: Not Authorised!`;
  return (
    <Layout user={user} userLoading={userLoading}>
      <div>
        {!data && !loading && `Hello View`}
        {loading && <>Loading...</>}
        {data && <p>{data.hello}</p>}
        {!data && !loading && notAuthorized && <p>Not authorized to view</p>}
      </div>
    </Layout>
  );
};

export default HelloView;
