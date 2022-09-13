const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const env = require("./config");
const resolvers = require("./graphql/resolver");
const typeDefs = require("./graphql/typeDef");
const mongoose = require("mongoose");
const { MONGODB } = require("./config");

const PORT = env.PORT;

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  const app = express();
  server.applyMiddleware({ app });

  mongoose
    .connect(MONGODB, { useNewUrlParser: true })
    .then(() => {
      console.log("MongoDB connected");
      return app.listen(PORT);
    })
    .then(res => {
      console.log(
        `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
      );
    })
    .catch(err => {
      console.log(err);
    });
}

startServer();
