import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery, editBookMutation, getBooksQuery } from '../queries/queries';
import * as compose from 'lodash.flowright';
import './style.scss';

function BookDetails(props) {
    const [show, setShow] = useState(true);
    const [name, setName] = useState("");
    const [genre, setGenre] = useState("");

    function _handleOnSwitchFeature(e) {
        e.preventDefault();
        setShow(!show);
    }

    function _handleOnSubmit(e) {
        e.preventDefault();
        props.editBookMutation({
            variables: {
                id: props.bookId,
                name,
                genre
            },
            refetchQueries: [{ query: getBooksQuery }]
        });
    }

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
                    <button
                        onClick={_handleOnSwitchFeature}
                        className="btn-options"
                    >Edit</button>
                </div>
            )
        } else {
            return (
                <div>No book selected...</div>
            )
        }
    }

    function displayBookEdit() {
        const { book } = props.data;
        if (book) {
            return (
                <div className="form">
                    <p>Edit Book</p>
                    <div className="field">
                        <label>Name:</label>
                        <input
                            type="text"
                            value={name}
                            placeholder={book.name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="field">
                        <label>Genre:</label>
                        <input
                            type="text"
                            value={genre}
                            placeholder={book.genre}
                            onChange={(e) => setGenre(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={_handleOnSwitchFeature}
                        className="btn-options"
                    >Back</button>
                    <button
                        onClick={_handleOnSubmit}
                        className="btn-options-save"
                    >Save</button>
                </div>
            )
        }
    }
    console.log(props);
    return (
        <div className="bookDetails">
            {show ? displayBookDetails() : displayBookEdit()}
        </div>
    )
}

export default compose(
    graphql(getBookQuery, {
        options: (props) => {
            return {
                variables: {
                    id: props.bookId
                }
            }
        }
    }),
    graphql(editBookMutation, { name: "editBookMutation" })
)(BookDetails)
