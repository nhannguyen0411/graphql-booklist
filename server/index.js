var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var _ = require("lodash");

var bookList = [
  { id: 1, name: "The Winter Season", genre: "Fantasy", authorId: 2 },
  { id: 2, name: "The Spring Season", genre: "Sci-Fi", authorId: 1 },
  { id: 3, name: "The Summer Season", genre: "Adventure", authorId: 3 }
]

var authorList = [
  { id: 1, name: "Steven Jobs", age: 33 },
  { id: 2, name: "Michael Jackson", age: 45 },
  { id: 3, name: "The Rock", age: 36 }
]

var schema = buildSchema(`
  type Query {
    book(id: Int!): Book
    books: [Book]
    author(id: Int!): Author 
    authors: [Author]
  }

  type Book {
    id: Int
    name: String
    genre: String
    author: Author
  }

  type Author {
    id: Int
    name: String
    age: Int
    books: [Book]
  }
`);

var root = {
  book: (args) => {
    console.log(args);
    return _.find(bookList, { id: args.id })
  },
  books: (args) => {
    return bookList;
  },
  author: (args) => {
    return _.find(authorList, { id: args.id })
  },
  authors: (args) => {
    return authorList;
  }
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));