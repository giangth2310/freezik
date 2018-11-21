const mongoose = require('mongoose');

const PlaylistSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  thumbnail: {
    type: String,
    require: false
  }
});

const Playlist = mongoose.model('playlists', PlaylistSchema);

module.exports = {
  Playlist
};