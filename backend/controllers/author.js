const { Author } = require('../models/author.js');

const getTopAuthors = async (req, res) => {
  try {
    const result = await Author.getTopAuthors();
    res.send(result);
  } catch (error) {
    res.status(400).send({message: error.message});
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await Author.findAuthor(email, password);
    if (!result) {
      res.status(401).send({message: "Unauthorize failed"})
    } else {
      res.send(result);
    }
  } catch (error) {
    res.status(400).send({message: error.message});
  }
};

const signup = async (req, res) => {
  try {
    const author = req.body;
    const result = await Author.addAuthor(author);
    if (!result) {
      throw new Error("Signup failed")
    } else {
      res.send(result);
    }
  } catch (error) {
    res.status(400).send({message: error.message});
  }
};

module.exports = {
  getTopAuthors,
  login,
  signup
}