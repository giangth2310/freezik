const mongoose = require('mongoose');

const { Author } = require('./author.js');

const MusicSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'authors'
  },
  image: {
    type: String,
    required: false
  },
  views: {
    type: Number,
    default: 0
  },
  artist: {
    type: String,
    require: false
  }
});

MusicSchema.statics.getPopularSongs = () => {
  return Music.aggregate([
  {
    $sort: { views: -1 }
  }, {
    $limit: 10
  }])
};

MusicSchema.statics.getRecommendedSongs = () => {
  return Music.find().limit(8);
};

const Music = mongoose.model('musics', MusicSchema);

module.exports = {
  Music
};