const { Music } = require('../models/music.js');

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
    console.log(musicId);
    
    const result = await Music.getComments(musicId);
    res.send(result);
  } catch (error) {
    res.status(400).send({message: error.message});
  }
};

module.exports = {
  getPopularSongs,
  getRecommendedSongs,
  getComments
};