import withApolloClient from "../utils/with-apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";

function ApolloApp({ Component, pageProps, apolloClient }) {
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default withApolloClient(ApolloApp);
