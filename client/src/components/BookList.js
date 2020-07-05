import React from 'react';
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

const getBooksQuery = gql`
    {
        books {
            name
            id
        }
    }
`;

function BookList(props) {
    const { data } = props;

    function displayBooks() {
        if (data.loading) {
            return <div>Pending...</div>
        } else {
            return data.books.map((item, index) => {
                return <li key={index}>{item.name}</li>
            })
        }
    }

    return (
        <div>
            <ul className="book-list">
                {displayBooks()}
            </ul>
        </div>
    )
}

export default graphql(getBooksQuery)(BookList);
