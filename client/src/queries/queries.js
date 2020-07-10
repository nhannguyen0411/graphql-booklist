import { gql } from "apollo-boost";

const getBooksQuery = gql`
    {
        books {
            name
            id
        }
    }
`;

const getAuthorsQuery = gql`
    {
        authors {
            name
            id
        }
    }
`;

const addBookMutation = gql`
    mutation($name: String!, $genre: String!, $authorId: ID!) {
        addBook(name: $name, genre: $genre, authorId: $authorId) {
            name
            genre
        }
    }
`

const getBookQuery = gql`
    query($id: ID!) {
        book(id: $id) {
            name
            genre
            author {
                name
                age
                book {
                    name
                    genre
                }
            }
        }
    }
`

const editBookMutation = gql`
    mutation($id: ID!, $name: String!, $genre: String!) {
        editBook(id: $id, name: $name, genre: $genre) {
            name
            genre
        }
    }
`

export { getAuthorsQuery, getBooksQuery, addBookMutation, getBookQuery, editBookMutation }