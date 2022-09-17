const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const env = require("./config");
const resolvers = require("./graphql/resolver");
const typeDefs = require("./graphql/typeDef");
const mongoose = require("mongoose");
const { MONGODB, CLIENT } = require("./config");
const graphqlUploadExpress = require("graphql-upload/graphqlUploadExpress.js");
const cors = require("cors");

const PORT = env.PORT;

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true, // see below for more about this
    cors: {
      origin: CLIENT
    },
    cache: "bounded"
  });
  await server.start();
  const app = express();
  app.use(graphqlUploadExpress());
  app.use(
    cors({
      origin: CLIENT
    })
  );

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
