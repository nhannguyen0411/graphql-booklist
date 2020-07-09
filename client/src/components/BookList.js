import React, { useState } from 'react';
import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries/queries";

import BookDetails from "../components/BookDetails";

function BookList(props) {
    const [selectId, setSelectId] = useState(null);
    const { data } = props;

    function displayBooks() {
        if (data.loading) {
            return <div>Pending...</div>
        } else {
            return data.books.map((item, index) => {
                return <li
                    key={index}
                    onClick={(e) => setSelectId(item.id)}
                >{item.name}</li>
            })
        }
    }

    return (
        <div>
            <ul className="book-list">
                {displayBooks()}
            </ul>
            <BookDetails bookId={selectId} />
        </div>
    )
}

export default graphql(getBooksQuery)(BookList);
