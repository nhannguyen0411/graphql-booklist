const graphql = require("graphql");
const Author = require("../models/Author.model");
const Book = require("../models/Book.model");
const _ = require("lodash");
const {
    GraphQLString,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                console.log("book type parent: ", parent);
                return Author.findById({ _id: parent.authorId })
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        book: {
            type: GraphQLList(BookType),
            resolve(parent, args) {
                console.log("author type parent: ", parent);
                return Book.find({ authorId: parent.id })
            }
        }
    })
})

const GenreType = new GraphQLObjectType({
    name: 'Genre',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        book: {
            type: GraphQLList(BookType),
            resolve(parent, args) {
                console.log(parent);
                //return _.filter(books, { genre: parent.name })
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                console.log("Book query parent: ", parent);
                return Book.findById({ _id: args.id })
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                console.log("author query Parent: ", parent);
                //return _.find(author, { id: args.id });
                return Author.findById({ _id: args.id })
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                console.log("Books query parent: ", parent);
                //return books;
                return Book.find({})
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                //return author;
                return Author.find({})
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: GraphQLString },
                age: { type: GraphQLInt }
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: GraphQLString },
                genre: { type: GraphQLString },
                authorId: { type: GraphQLID }
            },
            resolve(parent, args) {
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                })
                return book.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});