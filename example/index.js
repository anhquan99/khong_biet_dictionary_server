const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const GraphQLUpload = require("graphql-upload/GraphQLUpload.js");
const graphqlUploadExpress = require("graphql-upload/graphqlUploadExpress.js");
const { finished } = require("stream");
const {
  ApolloServerPluginLandingPageLocalDefault
} = require("apollo-server-core");
const cors = require("cors");
const { MongoClient, GridFSBucket } = require("mongodb");

const typeDefs = gql`
  # The implementation for this scalar is provided by the
  # 'GraphQLUpload' export from the 'graphql-upload' package
  # in the resolver map below.
  scalar Upload

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type Query {
    # This is only here to satisfy the requirement that at least one
    # field be present within the 'Query' type.  This example does not
    # demonstrate how to fetch uploads back.
    otherFields: Boolean!
  }

  type Mutation {
    # Multiple uploads are supported. See graphql-upload docs for details.
    singleUpload(file: Upload!): File!
  }
`;

const resolvers = {
  // This maps the `Upload` scalar to the implementation provided
  // by the `graphql-upload` package.
  Upload: GraphQLUpload,

  Mutation: {
    singleUpload: async (parent, { file }) => {
      console.log("File uploaded");
      try {
        var client = new MongoClient("mongodb://localhost:27017");
        const db = client.db("khong_biet");
        console.log("db connected");
        const bucket = new GridFSBucket(db);
        const { createReadStream, filename, mimetype, encoding } = await file;

        // Invoking the `createReadStream` will return a Readable Stream.
        // See https://nodejs.org/api/stream.html#stream_readable_streams
        const stream = createReadStream();
        console.log(filename, mimetype, encoding);
        // This is purely for demonstration purposes and will overwrite the
        // local-file-output.txt in the current working directory on EACH upload.
        // const out = require("fs").createWriteStream("local-file-output.txt");
        stream
          .pipe(
            bucket.openUploadStream(filename, {
              chunkSizeBytes: 1048576,
              metadata: { mimetype: mimetype, encoding: encoding }
            })
          )
          .on("error", err => {
            client.close();
            console.log(err);
          })
          .on("finish", () => {
            client.close();
            console.log("stream is done");
          });
        // client.close();
        return { filename, mimetype, encoding };
      } catch (error) {
        console.log(error);
        throw new Error("stream is failed");
      }
    }
  }
};

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // Using graphql-upload without CSRF prevention is very insecure.
    csrfPrevention: true, // see below for more about this
    cors: {
      origin: ["http://localhost:3000/", "https://studio.apollographql.com"]
    },
    cache: "bounded",
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })]
  });

  await server.start();

  const app = express();

  // This middleware should be added before calling `applyMiddleware`.
  app.use(graphqlUploadExpress());
  app.use(
    cors({
      origin: "http://localhost:3000/"
    })
  );

  server.applyMiddleware({ app, path: "/graphql" });

  await new Promise(r => app.listen({ port: 4000 }, r));

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startServer();
