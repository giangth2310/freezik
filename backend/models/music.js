const mongoose = require('mongoose');

const { Author } = require('./author.js');

const MusicSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  authors: [{
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'authors'
    }
  }],
  image: {
    type: String,
    required: false
  }
});

const Music = mongoose.model('musics', MusicSchema);

module.exports = {
  Music
}