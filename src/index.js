const { ApolloServer, gql } = require("apollo-server-express");
const express = require("express");
require("dotenv").config();
const db = require("./db");
const models = require("./models");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const port = process.env.PORT || 4000;
const app = express();

//connet to our MongoDB
const DB_HOST = process.env.DB_HOST;
db.connect(DB_HOST);

//default list of notes
let notes = [
  { id: "1", content: "Default note", author: "David Nguyen" },
  { id: "2", content: "Second default note", author: "David Nguyen" },
];

//new Apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    return { models };
  },
});
//Implement GraphQL middleware
server.start().then((res) => {
  server.applyMiddleware({ app, path: "/api" });
  app.get("/", (req, res) => res.send("Hello David Nguyen"));
  app.listen({ port }, () =>
    console.log(
      `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
    )
  );
});
