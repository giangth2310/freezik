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

PlaylistSchema.statics.getFavorite = (authorId) => {
  return Playlist.findOne({name: "favorite", "authorId": authorId}).select('-__v');
};

PlaylistSchema.statics.getAll = (authorId) => {
  return Playlist.find({"authorId": authorId}).select('-__v -musics');
};

PlaylistSchema.statics.getPlaylist = (playlistId) => {
  return Playlist.findById(playlistId);
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

PlaylistSchema.statics.addPlaylist = (playlist) => {
  return new Playlist(playlist).save();
};

PlaylistSchema.statics.deletePlaylist = (playlist) => {
  return Playlist.deleteOne(playlist);
}; 

PlaylistSchema.statics.deleteMusic = (playlist, musicId) => {
  return Playlist.updateOne({"_id": playlist._id, "authorId": playlist.authorId}, {$pull: {"musics": {"musicId": musicId}}});
};

PlaylistSchema.statics.updateThumbnail = (thumbnail, playlistId) => {
  return Playlist.findOneAndUpdate({
    _id: playlistId
  }, {
    thumbnail: thumbnail
  }, {
    new: true
  })
  .select("-__v -musics")
};

PlaylistSchema.statics.addMusic = async (playlistId, musicId) => {
  const pl = await Playlist.findOne({"_id": playlistId, "musics.musicId": musicId});
  
  if (pl) {
    return pl;
  } else {
    var playlist = await Playlist.findById(playlistId)
    playlist.musics.push({"musicId": musicId});
    return new Playlist(playlist).save();
  }
};

const Playlist = mongoose.model('playlists', PlaylistSchema);

module.exports = {
  Playlist
};