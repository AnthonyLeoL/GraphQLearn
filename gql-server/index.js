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
      getAllUsers() {
        console.log(
          "🚀 ~ file: index.js ~ line 21 ~ getAllUsers ~ data",
          Users
        );

        return Users;
      },
      getUsersByStatus(root, args) {
        console.log(
          "🚀 ~ file: index.js ~ line 26 ~ getUsersByStatus ~ args",
          args
        );

        return Users.filter((user) => user.married === args.status);
      },
      hello() {
        console.log("returning hello world");
        return "Hello World";
      },
    },
    Mutation: {
      createUser(root, args) {
        console.log("🚀 ~ file: index.js ~ line 40 ~ createUser ~ arg", args);
        const newUser = {
          name: args.name,
          age: args.age,
          married: args.married,
        };
        Users.push(newUser);
        return newUser;
      },
    },
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
