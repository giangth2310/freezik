const mongoose = require('mongoose');

const AuthorSchema = mongoose.Schema({
  // _id: {
  //   type: mongoose.Schema.Types.ObjectId,
  // },
  name: {
    type: String,
    required: false
  },
  avatar: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: false
  }
});

AuthorSchema.statics.getTopAuthors = () => {
  return Author.aggregate([
    {
      $lookup: {
        from: 'musics',
        localField: '_id',
        foreignField: 'authorId',
        as: 'musics'
      }
    }, {
      $unwind: "$musics"
    }, {
      $group: {
        _id: "$_id",
        name: { $first: "$name" },
        avatar: { $first: "$avatar" },
        email: { $first: "$email" },
        totalViews: { $sum: '$musics.views' }
      }
    }, {
      $sort: { totalViews: -1 }
    }, {
      $limit: 5
    }
  ]);
}

AuthorSchema.statics.findAuthor = (email, password) => {
  return Author.findOne({ 'email': email, 'password': password}).select("-__v -password");
};

AuthorSchema.statics.addAuthor = (author) => {
  return new Author(author).save();
};

AuthorSchema.statics.changeProfile = (author) => {
  console.log(author);
  if (!author.avatar) {
    console.log("sdfa");
    return Author.updateOne({
      _id: author._id
    }, {
      email: author.email,
      name: author.name,
    })
  }
  return Author.updateOne({
    _id: author._id
  }, {
    email: author.email,
    name: author.name,
    avatar: author.avatar
  })
};

AuthorSchema.statics.changePassword = (author) => {
  return Author.updateOne({
    _id: author._id
  }, {
    password: author.password
  })
};

const Author = mongoose.model('authors', AuthorSchema);

module.exports = {
  Author
};