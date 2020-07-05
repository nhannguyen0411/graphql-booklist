var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
    name: String,
    genre: String,
    authorId: String
});

module.exports = mongoose.model('Book', bookSchema, "Books");