const mongoose = require('mongoose');


const MusicSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'authors'
  },
  image: {
    type: String,
    required: false
  },
  views: {
    type: Number,
    default: 0
  },
  artist: {
    type: String,
    require: false
  },
  fileName: {
    type: String
  },
  comments: [{
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'authors'
    },
    content: {
      type: String,
    }
  }]
});

MusicSchema.statics.getPopularSongs = () => {
  return Music.aggregate([
  {
    $sort: { views: -1 }
  }, {
    $limit: 10
  }, {
    $project: {
      name: 1,
      authorId: 1,
      image: 1,
      views: 1,
      artist: 1,
      fileName: 1
    }
  }]);
};

MusicSchema.statics.findMusicById = (musicId) => {
  return Music.findById(musicId).select('-__v');
};

MusicSchema.statics.getRecommendedSongs = () => {
  return Music.find().limit(8).select("-comments -__v");
};

MusicSchema.statics.getRecommendedSongsById = (musicId) => {
  return Music.find({_id : { $ne: musicId }}).limit(8).select("-comments -__v");
};

MusicSchema.statics.getComments = (musicId) => {
  return Music.findById(musicId);
};

MusicSchema.statics.upload = (music) => {
  return new Music(music).save();
};

MusicSchema.statics.addComment = async (comment) => {
  var music = await Music.findById(comment.musicId);
  music.comments.push({"authorId": comment.authorId, "content": comment.content});
  return new Music(music).save();
}

const Music = mongoose.model('musics', MusicSchema);

module.exports = {
  Music
};