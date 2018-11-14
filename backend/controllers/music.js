const { Music } = require('../models/music.js');

const getPopularSongs = async (req, res) => {
  try {
    const result = await Music.getPopularSongs();
    res.send(result);
  } catch (error) {
    res.status(400).send({message: error.message});
  }
}

module.exports = {
  getPopularSongs
}