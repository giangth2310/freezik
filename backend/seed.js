var { ObjectID } = require('mongodb');

const { Author } = require('./models/author.js');
const { Music } = require('./models/music.js');
const { Playlist } = require('./models/playlist.js');

const author = [{
  _id: new ObjectID(),
  name: "Đen",
  avatar: "http://localhost:5000/public/author_avatar/den.jpg",
  email: "den@gmail.com",
  password: "den"
}, {
  _id: new ObjectID(),
  name: "Ngọt",
  avatar: "http://localhost:5000/public/author_avatar/ngot.jpg",
  email: "ngot@gmail.com",
  password: "ngot"
}, {
  _id: new ObjectID(),
  name: "Tiên Tiên",
  avatar: "http://localhost:5000/public/author_avatar/tientien.jpg",
  email: "tientien@gmail.com",
  password: "tientien"
}, {
  _id: new ObjectID(),
  name: "Vũ",
  avatar: "http://localhost:5000/public/author_avatar/vu.jpg",
  email: "vu@gmail.com",
  password: "vu"
}, {
  _id: new ObjectID(),
  name: "Cá Hồi Hoang",
  avatar: "http://localhost:5000/public/author_avatar/cahoihoang.jpg",
  email: "cahoihoang@gmail.com",
  password: "cahoihoang"
}, {
  _id: new ObjectID(),
  name: "JustaTee",
  avatar: "http://localhost:5000/public/author_avatar/justatee.jpg",
  email: "justatee@gmail.com",
  password: "justatee"
}, {
  _id: new ObjectID(),
  name: "Touliver",
  avatar: "http://localhost:5000/public/author_avatar/touliver.jpg",
  email: "",
  password: ""
}, {
  _id: new ObjectID(),
  name: "Hoaprox",
  avatar: "http://localhost:5000/public/author_avatar/hoaprox.jpg",
  email: "",
  password: ""
}, {
  _id: new ObjectID(),
  name: "Xesi",
  avatar: "http://localhost:5000/public/author_avatar/xesi.jpg",
  email: "",
  password: ""
}, {
  _id: new ObjectID(),
  name: "Dalab",
  avatar: "http://localhost:5000/public/author_avatar/dalab.jpg",
  email: "",
  password: ""
}, {
  _id: new ObjectID(),
  name: "Nguyễn Trọng Tài",
  avatar: "http://localhost:5000/public/author_avatar/nguyentrongtai.jpg",
  email: "",
  password: ""
}, {
  _id: new ObjectID(),
  name: "Rhymastic",
  avatar: "http://localhost:5000/public/author_avatar/rhymastic.jpg",
  email: "",
  password: ""
}, {
  _id: new ObjectID(),
  name: "Yun",
  avatar: "http://localhost:5000/public/author_avatar/yun.jpg",
  email: "",
  password: ""
}, {
  _id: new ObjectID(),
  name: "Dr A",
  avatar: "http://localhost:5000/public/author_avatar/dra.jpg",
  email: "",
  password: ""
}];

const music = [{
  _id: new ObjectID(),
  name: "Đố em biết anh đang nghĩ gì",
  authorId: author[0]._id,
  image: "http://localhost:5000/public/music_image/doembietanhdangnghigi.jpg",
  views: 13410,
  artist: "Đen x JustaTee",
  fileName: "doembietanhdangnghigi.mp3",
  comments: [{
    authorId: author[1]._id,
    content: "hat rat hay"
  }, {
    authorId: author[4]._id,
    content: "ahihi"
  }, {
    authorId: author[4]._id,
    content: "cung binh thuong"
  }, {
    authorId: author[7]._id,
    content: "hay"
  }, {
    authorId: author[8]._id,
    content: "tuyet cmn voi"
  }]
}, {
  _id: new ObjectID(),
  name: "Em dạo này",
  authorId: author[1]._id,
  image: "http://localhost:5000/public/music_image/emdaonay.jpg",
  views: 10000,
  artist: "Ngọt",
  fileName: "emdaonay.mp3",
  comments: [{
    authorId: author[3]._id,
    content: "hat hay"
  }, {
    authorId: author[2]._id,
    content: "ahihi"
  }, {
    authorId: author[1]._id,
    content: "cung binh thuong"
  }, {
    authorId: author[7]._id,
    content: "hay"
  }, {
    authorId: author[8]._id,
    content: "hat ra chi la hay"
  }]
}, {
  _id: new ObjectID(),
  name: "Em không thể",
  authorId: author[2]._id,
  image: "http://localhost:5000/public/music_image/emkhongthe.jpg",
  views: 150000,
  artist: "Tiên Tiên x Touliver",
  fileName: "emkhongthe.mp3",
  comments: [{
    authorId: author[3]._id,
    content: "nghe mai ko chan"
  }, {
    authorId: author[9]._id,
    content: "ahihi"
  }, {
    authorId: author[10]._id,
    content: "cung binh thuong"
  }, {
    authorId: author[1]._id,
    content: "hay"
  }, {
    authorId: author[10]._id,
    content: "tuyet cmn voi"
  }]
}, {
  _id: new ObjectID(),
  name: "Vô tình",
  authorId: author[7]._id,
  image: "http://localhost:5000/public/music_image/votinh.jpg",
  views: 123,
  artist: "Hoaprox x Xesi",
  fileName: "votinh.mp3"
}, {
  _id: new ObjectID(),
  name: "Lạ lùng",
  authorId: author[3]._id,
  image: "http://localhost:5000/public/music_image/lalung.jpg",
  views: 11111,
  artist: "Vũ",
  fileName: "lalung.mp3"
}, {
  _id: new ObjectID(),
  name: "Thanh xuân",
  authorId: author[9]._id,
  image: "http://localhost:5000/public/music_image/thanhxuan.jpg",
  views: 11233,
  artist: "Dalab",
  fileName: "thanhxuan.mp3"
}, {
  _id: new ObjectID(),
  name: "Từ ngày em đến",
  authorId: author[9]._id,
  image: "http://localhost:5000/public/music_image/tungayemden.jpg",
  views: 10000,
  artist: "Dalab",
  fileName: "tungayemden.mp3"
}, {
  _id: new ObjectID(),
  name: "Hongkong1",
  authorId: author[10]._id,
  image: "http://localhost:5000/public/music_image/hongkong1.jpg",
  views: 10,
  artist: "Nguyễn Trọng Tài",
  fileName: "hongkong1.mp3"
}, {
  _id: new ObjectID(),
  name: "Yêu 5",
  authorId: author[11]._id,
  image: "http://localhost:5000/public/music_image/yeu5.jpg",
  views: 100012,
  artist: "Rhymastic",
  fileName: "yeu5.mp3",
  comments: [{
    authorId: author[11]._id,
    content: "yeu"
  }, {
    authorId: author[10]._id,
    content: "hihi"
  }]
}, {
  _id: new ObjectID(),
  name: "Hồn trôi",
  authorId: author[12]._id,
  image: "http://localhost:5000/public/music_image/hontroi.jpg",
  artist: "Yun x Dr A",
  fileName: "hontroi.mp3"
}, {
  _id: new ObjectID(),
  name: "My everything",
  authorId: author[2]._id,
  image: "http://localhost:5000/public/music_image/myeverything.jpg",
  views: 1234,
  artist: "Tiên Tiên",
  fileName: "myeverything.mp3"
}, {
  _id: new ObjectID(),
  name: "Có thể",
  authorId: author[4]._id,
  image: "http://localhost:5000/public/music_image/cothe.jpg",
  views: 100,
  artist: "Cá Hồi Hoang",
  fileName: "cothe.mp3"
}];

const playlist = [{
  name: "favorite",
  authorId: author[2]._id,
  thumbnail: "http://localhost:5000/public/playlist_thumbnails/favorite.jpg",
  musics: [{
    musicId: music[0]._id
  }, {
    musicId: music[2]._id
  }, {
    musicId: music[4]._id
  }, {
    musicId: music[6]._id
  }, {
    musicId: music[8]._id
  }]
}, {
  name: "favorite",
  authorId: author[0]._id,
  thumbnail: "http://localhost:5000/public/playlist_thumbnails/favorite.jpg",
  musics: [{
    musicId: music[0]._id
  }, {
    musicId: music[2]._id
  }]
}, {
  name: "my music",
  authorId: author[2]._id,
  thumbnail: "http://localhost:5000/public/playlist_thumbnails/mymusic.jpg",
  musics: [{
    musicId: music[10]._id
  }]
}]

Author.deleteMany({}).then(() => {
  Author.insertMany(author);
});

Music.deleteMany({}).then(() => {
  Music.insertMany(music);
});

Playlist.deleteMany({}).then(() => {
  Playlist.insertMany(playlist);
});