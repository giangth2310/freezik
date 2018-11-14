const mongoose = require('mongoose');

const AuthorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: false
  }
});

const Author = mongoose.model('authors', AuthorSchema);

module.exports = {
  Author
}