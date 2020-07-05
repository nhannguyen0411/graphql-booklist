import React from 'react';
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

const getAuthorsQuery = gql`
    {
        authors {
            name
            id
        }
    }
`;
function AddBook(props) {
    const { data } = props;
    function displayAuthor() {
        if (data.loading) {
            return <option disabled>Loading author...</option>
        } else {
            return data.authors.map((item, index) => {
                return <option key={index} value={item.id}>{item.name}</option>
            })
        }
    }
    console.log(data);
    return (
        <form id="add-book">
            <div className="field">
                <label>Book name:</label>
                <input type="text" />
            </div>
            <div className="field">
                <label>Genre:</label>
                <input type="text" />
            </div>
            <div className="field">
                <label>Author:</label>
                <select>
                    <option>Select author</option>
                    {displayAuthor()}
                </select>
            </div>
            <button>+</button>
        </form>
    )
}

export default graphql(getAuthorsQuery)(AddBook)
