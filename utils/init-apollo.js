import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import fetch from "isomorphic-unfetch";

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (typeof window === "undefined") {
  global.fetch = fetch;
}

function create(initialState, { fetchOptions }) {
  const httpLink = createHttpLink({
    uri: process.env.GRAPHQL_URI,
    credentials: "same-origin",
    fetchOptions
  });

  async function fetchToken() {
    try {
      const url = `${process.env.BASE_URI}/api/session`;
      const res = await fetch(url);
      if (res.ok) {
        const sessionState = await res.json();
        return (
          (sessionState &&
            sessionState.session &&
            sessionState.session.idToken) ||
          null
        );
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  const authLink = setContext(async (_, { headers }) => {
    const token = await fetchToken();
    // console.log("token in authLink", token);
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ""
      }
    };
  });

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  const isBrowser = typeof window !== "undefined";

  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState || {})
  });
}

export default function initApollo(initialState, options) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === "undefined") {
    let fetchOptions = {};

    return create(initialState, {
      ...options,
      fetchOptions
    });
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  return apolloClient;
}
