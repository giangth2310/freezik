const mongoose = require('mongoose');

const PlaylistSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  thumbnail: {
    type: String,
    require: false
  },
  musics: [{
    musicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'musics'
    }
  }]
});

PlaylistSchema.statics.getFavorite = () => {
  return Playlist.findOne({name: "favorite"}).select('-__v');
};

PlaylistSchema.statics.getAll = () => {
  return Playlist.find().select('-__v');
};

const Playlist = mongoose.model('playlists', PlaylistSchema);

module.exports = {
  Playlist
};