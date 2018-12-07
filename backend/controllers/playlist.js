const { Playlist } = require('../models/playlist.js');
const { Music } = require('../models/music.js');

const getFavorite = async (req, res) => {
  try {
    var favorite = await Playlist.getFavorite();
    
    for (var i = 0; i < favorite.musics.length; i++) {
      var music = await Music.findMusicById(favorite.musics[i].musicId).select("-comments");
      favorite.musics[i] = music;    
    }
    res.send(favorite);
  } catch (error) {
    res.status(400).send({message: error.message});
  }
};

const getAll = async (req, res) => {
  try {
    var playlists = await Playlist.getAll();
    for (var i = 0; i < playlists.length; i++) {
      for (var j = 0; j < playlists[i].musics.length; j++) {
        
        var music = await Music.findMusicById(playlists[i].musics[j].musicId).select("-comments");
        playlists[i].musics[j] = music;    
      }
    }
    res.send(playlists);
  } catch (error) {
    res.status(400).send({message: error.message});
  }
};

module.exports = {
  getFavorite,
  getAll
};