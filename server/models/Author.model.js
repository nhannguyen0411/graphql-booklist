var mongoose = require('mongoose');

var authorSchema = new mongoose.Schema({
    name: String,
    age: Number
});

module.exports = mongoose.model('Author', authorSchema, "Authors");