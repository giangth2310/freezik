var ObjectId = require('mongodb').ObjectID;

const { Music } = require('../models/music.js');
const { Author } = require('../models/author.js');
const { Playlist } = require('../models/playlist.js');

const domain = "http://localhost:5000/";

const getPopularSongs = async (req, res) => {
  try {
    const result = await Music.getPopularSongs();
    res.send(result);
  } catch (error) {
    res.status(400).send({message: error.message});
  }
};

const getRecommendedSongs = async (req, res) => {
  try {
    if (req.query._id) {
      var result = await Music.getRecommendedSongsById(req.query._id);
    } else {
      var result = await Music.getRecommendedSongs();
    }

    res.send(result);
  } catch (error) {
    res.status(400).send({message: error.message});
  }
};

const getComments = async (req, res) => {
  try {
    const musicId = req.query.musicId;
    let music = await Music.getComments(musicId);
    music = music.toJSON();
    
    for (var i = 0; i < music.comments.length; i++) {
      const author = await Author.findAuthorById(music.comments[i].authorId);
      music.comments[i].name = author.name;
      music.comments[i].avatar = author.avatar;
      music.comments[i].date = ObjectId(music.comments[i]._id).getTimestamp();
    }
    
    music.comments.sort((a, b) => {
      return b.date - a.date;
    });

    const result = music.comments;

    res.send(result);
  } catch (error) {
    res.status(400).send({message: error.message});
  }
};

const uploadMusic = async (req, res) => {
  try {
    var music = req.body;
    music.views = 0;
  
    if (req.files) {
      music.image = domain + req.files.image[0].path;
      music.fileName = domain + req.files.music[0].path;
      music.image = music.image.replace(/\\/g, "/");
      music.fileName = music.fileName.replace(/\\/g, "/");
    }
    
    const result = await Music.upload(music);

    res.send(result);
  } catch (error) {
    res.status(400).send({message: error.message});
  }
};

const getMusic = async (req, res) => {
  try {
    var music = await Music.findMusicById(req.query.musicId);
    
    const pl = await Playlist.isOfFavorite(req.query.musicId, req.query.authorId);
    
    if (!pl) {
      music = {
        ...music._doc,
        favorite: "false"
      }
    } else {
      music = {
        ...music._doc,
        favorite: "true"
      }
    }

    res.send(music);
  } catch (error) {
    res.status(400).send({message: error.message});
  }
};

const addComment = async (req, res) => {
  try {
    const comment = req.body;
    await Music.addComment(comment);

    let music = await Music.getComments(req.body.musicId);
    music = music.toJSON();
    
    for (var i = 0; i < music.comments.length; i++) {
      const author = await Author.findAuthorById(music.comments[i].authorId);
      music.comments[i].name = author.name;
      music.comments[i].avatar = author.avatar;
      music.comments[i].date = ObjectId(music.comments[i]._id).getTimestamp();
    }
    
    music.comments.sort((a, b) => {
      return b.date - a.date;
    });

    const result = music.comments;

    res.send(result);
    
  } catch (error) {
    res.status(400).send({message: error.message});
  }
};

const search  = async (req, res) => {
  try {
    const query = req.query.q;
    if (query.includes("author")) {
      const result  = await Author.searchByName(query);
      res.send(result);
    } else {
      const result  = await Music.searchByName(query);
      res.send(result);
    }
  } catch (error) {
    res.status(400).send({message: error.message});
  }
};

module.exports = {
  getPopularSongs,
  getRecommendedSongs,
  getComments,
  uploadMusic,
  getMusic,
  addComment,
  search
};