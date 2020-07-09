import React, { useState } from 'react';
import * as compose from 'lodash.flowright';
import { graphql } from "react-apollo";
import { getAuthorsQuery, addBookMutation, getBooksQuery } from "../queries/queries";
function AddBook(props) {
    const [name, setName] = useState("");
    const [genre, setGenre] = useState("");
    const [authorId, setAuthorId] = useState("");
    const { getAuthorsQuery, addBookMutation } = props;
    const data = getAuthorsQuery;
    function displayAuthor() {
        if (data.loading) {
            return <option disabled>Loading author...</option>
        } else {
            return data.authors.map((item, index) => {
                return <option key={index} value={item.id}>{item.name}</option>
            })
        }
    }

    function _handleOnSubmit(e) {
        e.preventDefault();
        addBookMutation({
            variables: {
                name,
                genre,
                authorId
            },
            refetchQueries: [{ query: getBooksQuery }]
        });
    }

    return (
        <form id="add-book" onSubmit={_handleOnSubmit}>
            <div className="field">
                <label>Book name:</label>
                <input
                    onChange={(event) => setName(event.target.value)}
                    type="text"
                />
            </div>
            <div className="field">
                <label>Genre:</label>
                <input
                    onChange={(event) => setGenre(event.target.value)}
                    type="text"
                />
            </div>
            <div className="field">
                <label>Author:</label>
                <select onChange={(e) => setAuthorId(e.target.value)}>
                    <option>Select author</option>
                    {displayAuthor()}
                </select>
            </div>
            <button>+</button>
        </form>
    )
}

export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook)
