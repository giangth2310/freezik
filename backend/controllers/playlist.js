const { Playlist } = require('../models/playlist.js');
const { Music } = require('../models/music.js');

const getFavorite = async (req, res) => {
  try {
    var favorite = await Playlist.getFavorite(req.query.authorId);
    
    if (favorite) {
      for (var i = 0; i < favorite.musics.length; i++) {
        var music = await Music.findMusicById(favorite.musics[i].musicId).select("-comments");
        favorite.musics[i] = music;    
      }
    }
    
    res.send(favorite);
  } catch (error) {
    res.status(400).send({message: error.message});
  }
};

const getPlaylists = async (req, res) => {
  try {
    if (!req.query.playlistId) {
      var playlists = await Playlist.getAll(req.query.authorId);
      res.send(playlists);
    } else {
      var playlist = await Playlist.getPlaylist(req.query.authorId, req.query.playlistId);
      for (var i = 0; i < playlist.length; i++) {
        for (var j = 0; j < playlist[i].musics.length; j++) {
          var music = await Music.findMusicById(playlist[i].musics[j].musicId).select("-comments");
          playlist[i].musics[j] = music;    
        }
      }
      res.send(playlist);
    }
  } catch (error) {
    res.status(400).send({message: error.message});
  }
};

const addToFavorite = async (req, res) => {
  try {
    const music = req.body;
    const result = await Playlist.addToFavorite(music);
    
    res.send(result);
  } catch (error) {
    res.status(400).send({message: error.message});
  }
};

const addPlaylist = async (req, res) => {
  try {
    const playlist = req.body;
    const result = await Playlist.addPlaylist(playlist);
    
    res.send(result);
  } catch (error) {
    res.status(400).send({message: error.message});
  }
};

const deletePlaylist = async (req, res) => {
  try {
    var playlist = new Object();
    playlist._id = req.query.playlistId;
    playlist.authorId = req.query.authorId;

    if (!req.query.musicId) {
      await Playlist.deletePlaylist(playlist);
    } else {
      await Playlist.deleteMusic(playlist, req.query.musicId);
    }

    var pl = await Playlist.getPlaylist(req.query.authorId, req.query.playlistId);
    
    for (var i = 0; i < pl.length; i++) {
      for (var j = 0; j < pl[i].musics.length; j++) {
        var music = await Music.findMusicById(pl[i].musics[j].musicId).select("-comments");
        pl[i].musics[j] = music;    
      }
    }

    res.send(pl);
  } catch (error) {
    res.status(400).send({message: error.message});
  }
};

module.exports = {
  getFavorite,
  getPlaylists,
  addToFavorite,
  addPlaylist,
  deletePlaylist
};