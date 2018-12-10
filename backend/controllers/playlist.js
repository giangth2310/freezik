const { Playlist } = require('../models/playlist.js');
const { Music } = require('../models/music.js');

const domain = "http://localhost:5000/";

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
      var playlist = await Playlist.getPlaylist(req.query.playlistId);
      for (var j = 0; j < playlist.musics.length; j++) {
        var music = await Music.findMusicById(playlist.musics[j].musicId).select("-comments");
        playlist.musics[j] = music;    
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
    var playlist = req.body;
    playlist.thumbnail = "http://localhost:5000/public/playlist_thumbnails/mymusic.jpg";
    
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

    
    if (!req.query.musicId) {
      var pl = await Playlist.getPlaylist(req.query.playlistId);
      await Playlist.deletePlaylist(playlist);
      
      var playlists = await Playlist.getAll(pl.authorId);
      res.send(playlists);
    } else {
      await Playlist.deleteMusic(playlist, req.query.musicId);
      var pl = await Playlist.getPlaylist(req.query.playlistId);

      for (var j = 0; j < pl.musics.length; j++) {
        pl.musics[j] = await Music.findMusicById(pl.musics[j].musicId).select("-comments");
      }
      res.send(pl);
    }
  } catch (error) {
    res.status(400).send({message: error.message});
  }
};

const updatePlaylist = async (req, res) => {
  try {
    var thumbnail = null;
    if (req.file) {
      thumbnail = domain + req.file.path;
      thumbnail = thumbnail.replace(/\\/g, "/");
    }

    const result = await Playlist.updatePlaylist(thumbnail, req.body.playlistId, req.body.name);
    
    res.send(result);
  } catch (error) {
    res.status(400).send({message: error.message});
  }
};

const addMusic = async (req, res) => {
  try {
    const result = await Playlist.addMusic(req.body.playlistId, req.body.musicId);
    res.send(result);
  } catch (error) {
    res.status(400).send({message: error.message});
  }
};

module.exports = {
  getFavorite,
  getPlaylists,
  addToFavorite,
  addPlaylist,
  deletePlaylist,
  updatePlaylist,
  addMusic
};