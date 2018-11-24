const moment = require('moment')

const { Music } = require('../models/music.js');
const { Author } = require('../models/author.js');

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
      music.comments[i].date = moment().format();
    }

    res.send(music);
  } catch (error) {
    res.status(400).send({message: error.message});
  }
};

module.exports = {
  getPopularSongs,
  getRecommendedSongs,
  getComments
};