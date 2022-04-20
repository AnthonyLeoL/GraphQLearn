const express = require("express");
const cors = require("cors");
const { ApolloServer, gql } = require("apollo-server-express");
fs = require("fs");
const { Users } = require("./data");
const schemaString = fs.readFileSync("./schema.graphql", "utf8");

const startServer = async () => {
  // Construct a schema, using GraphQL schema language
  const typeDefs = gql`
    ${schemaString}
  `;

  // Provide resolver functions for your schema fields
  const resolvers = {
    Query: {
      //TODO goal(2) add resolver for getting user by marriage status
      getAllUsers() {
        console.log(
          "🚀 ~ file: index.js ~ line 21 ~ getAllUsers ~ data",
          Users
        );

        return Users;
      },
      hello() {
        console.log("returning hello world");
        return "Hello World";
      },
    },
    // TODO(goal3) add resolver for creating a user
  };

  const server = new ApolloServer({ typeDefs, resolvers });

  const app = express();
  app.use(cors({ origin: "*" }));
  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();
