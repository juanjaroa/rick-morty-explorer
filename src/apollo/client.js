import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        characters: {
          keyArgs: ["filter"], // Cache results based on filter, not page
          merge(existing = {}, incoming) {
            const existingResults = existing.results || [];
            const incomingResults = incoming.results || [];
            return {
              ...incoming,
              results: [...existingResults, ...incomingResults],
            };
          },
        },
      },
    },
  },
});

const httpLink = new HttpLink({
  uri: "https://rickandmortyapi.com/graphql",
  credentials: "same-origin",
});

export const client = new ApolloClient({
  link: httpLink,
  cache,
});
