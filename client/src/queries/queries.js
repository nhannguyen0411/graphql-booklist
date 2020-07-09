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

export { getAuthorsQuery, getBooksQuery, addBookMutation, getBookQuery }