import React from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery } from '../queries/queries';

function BookDetails(props) {

    function displayBookDetails() {
        const { book } = props.data;
        if (book) {
            return (
                <div>
                    <h2>{book.name}</h2>
                    <p>{book.genre}</p>
                    <p>{book.author.name}</p>
                    <p>All books by this author</p>
                    <ul>
                        {
                            book.author.book.map((item, index) => {
                                return <li key={index}>{item.name}</li>
                            })
                        }
                    </ul>
                </div>
            )
        } else {
            return (
                <div>No book selected...</div>
            )
        }
    }

    return (
        <div className="bookDetails">
            {/* <p>Output book details here</p> */}
            {displayBookDetails()}
        </div>
    )
}

export default graphql(getBookQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.bookId
            }
        }
    }
})(BookDetails)
