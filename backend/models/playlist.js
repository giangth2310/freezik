const mongoose = require('mongoose');

const PlaylistSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'authors'
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

PlaylistSchema.statics.addToFavorite = async (music) => {
  var favorite = await Playlist.findOne({"authorId": music.authorId}).select("-__v");
  if (!favorite) {
    return new Playlist({
      "name": "favorite",
      "authorId": music.authorId,
      "thumbnail" : "http://localhost:5000/public/playlist_thumbnails/favorite.jpg",
      "musics": [{
        "musicId": music.musicId
      }]
    }).save();
  }

  const result = await Playlist.findOne({"authorId": music.authorId, "musics.musicId": music.musicId})
  
  if (!result) {
    favorite.musics.push({"musicId": music.musicId});
    return new Playlist(favorite).save();
  }
  
  return favorite;
};

PlaylistSchema.statics.isOfFavorite = (musicId, authorId) => {
  return Playlist.findOne({"authorId": authorId, "musics.musicId": musicId, "name": "favorite"});
};

const Playlist = mongoose.model('playlists', PlaylistSchema);

module.exports = {
  Playlist
};