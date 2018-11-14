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
  },
  views: {
    type: Number,
    default: 0
  }
});

MusicSchema.statics.getPopularSongs = () => {
  return Music.find().sort('views');
}

const Music = mongoose.model('musics', MusicSchema);

module.exports = {
  Music
}