const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const env = require("./config");
const PORT = env.PORT;

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => "Hello world!"
  }
};

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  const app = express();
  server.applyMiddleware({ app });

  app.listen(PORT, () =>
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    )
  );
}

startServer();
