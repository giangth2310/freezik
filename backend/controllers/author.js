const { Author } = require('../models/author.js');

const getTopAuthors = async (req, res) => {
  try {
    const result = await Author.getAll();
    res.send(result);
  } catch (error) {
    res.status(400).send({message: error.message});
  }
};



module.exports = {
  getTopAuthors
}