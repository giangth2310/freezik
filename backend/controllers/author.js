const { Author } = require('../models/author.js');
const domain = "http://localhost:5000/";

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
    author.avatar = "http://localhost:5000/public/author_avatar/default_avatar.jpg";
    author.name = req.body.email.split("@gmail.com")[0];

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

const changeProfile = async (req, res) => {
  try {
    const author = req.body;
    if (author.file) {
      author.avatar = domain + req.file.path;
    }
    const result = await Author.changeProfile(author);
    
    if (!result.nModified) {
      throw new Error("can not find this author")
    }
    res.send({message: "updated"});
  } catch (error) {
    res.status(400).send({message: error.message});
  }
};

const changePassword = async (req, res) => {
  try {
    const author = req.body;
    const result = await Author.changePassword(author);
    
    if (!result.nModified) {
      throw new Error("can not find this author")
    }
    res.send({message: "updated"});
  } catch (error) {
    res.status(400).send({message: error.message});
  }
}

module.exports = {
  getTopAuthors,
  login,
  signup,
  changeProfile,
  changePassword
};