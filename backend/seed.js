var { ObjectID } = require('mongodb');

const { Author } = require('./models/author.js');
const { Music } = require('./models/music.js');

const author = [{
  _id: new ObjectID(),
  name: "Đen",
  avatar: "/author_avatar/den.jpg",
  email: "",
  password: ""
}, {
  _id: new ObjectID(),
  name: "Ngọt",
  avatar: "/author_avatar/ngot.jpg",
  email: "",
  password: ""
}, {
  _id: new ObjectID(),
  name: "Tiên Tiên",
  avatar: "/author_avatar/tientien.jpg",
  email: "",
  password: ""
}, {
  _id: new ObjectID(),
  name: "Vũ",
  avatar: "/author_avatar/vu.jpg",
  email: "",
  password: ""
}, {
  _id: new ObjectID(),
  name: "Cá Hồi Hoang",
  avatar: "/author_avatar/cahoihoang.jpg",
  email: "",
  password: ""
}, {
  _id: new ObjectID(),
  name: "JustaTee",
  avatar: "/author_avatar/justatee.jpg",
  email: "",
  password: ""
}, {
  _id: new ObjectID(),
  name: "Touliver",
  avatar: "/author_avatar/touliver.jpg",
  email: "",
  password: ""
}, {
  _id: new ObjectID(),
  name: "Hoaprox",
  avatar: "/author_avatar/hoaprox.jpg",
  email: "",
  password: ""
}, {
  _id: new ObjectID(),
  name: "Xesi",
  avatar: "/author_avatar/xesi.jpg",
  email: "",
  password: ""
}, {
  _id: new ObjectID(),
  name: "Dalab",
  avatar: "/author_avatar/dalab.jpg",
  email: "",
  password: ""
}, {
  _id: new ObjectID(),
  name: "Nguyễn Trọng Tài",
  avatar: "/author_avatar/nguyentrongtai.jpg",
  email: "",
  password: ""
}, {
  _id: new ObjectID(),
  name: "Rhymastic",
  avatar: "/author_avatar/rhymastic.jpg",
  email: "",
  password: ""
}, {
  _id: new ObjectID(),
  name: "Yun",
  avatar: "/author_avatar/yun.jpg",
  email: "",
  password: ""
}, {
  _id: new ObjectID(),
  name: "Dr A",
  avatar: "/author_avatar/dra.jpg",
  email: "",
  password: ""
}];

const music = [{
  _id: new ObjectID(),
  name: "Đố em biết anh đang nghĩ gì",
  authors: [{
    authorId: author[0]._id
  }, {
    authorId: author[5]._id
  }],
  image: "/music_image/doembietanhdangnghigi.jpg",
  views: 13410
}, {
  _id: new ObjectID(),
  name: "Em dạo này",
  authors: [{
    authorId: author[1]._id
  }],
  image: "/music_image/emdaonay.jpg",
  views: 10000
}, {
  _id: new ObjectID(),
  name: "Em không thể",
  authors: [{
    authorId: author[2]._id
  }, {
    authorId: author[6]._id
  }],
  image: "/music_image/emkhongthe.jpg",
  views: 150000
}, {
  _id: new ObjectID(),
  name: "Say you do",
  authors: [{
    authorId: author[2]._id
  }],
  image: "/music_image/sayyoudo.jpg",
  views: 1234
}, {
  _id: new ObjectID(),
  name: "Vô tình",
  authors: [{
    authorId: author[7]._id
  }, {
    authorId: author[8]._id
  }],
  image: "/music_image/votinh.jpg",
  views: 123
}, {
  _id: new ObjectID(),
  name: "Lạ lùng",
  authors: [{
    authorId: author[3]._id
  }],
  image: "/music_image/lalung.jpg",
  views: 11111
}, {
  _id: new ObjectID(),
  name: "Thanh xuân",
  authors: [{
    authorId: author[9]._id
  }],
  image: "/music_image/thanhxuan.jpg",
  views: 11233
}, {
  _id: new ObjectID(),
  name: "Từ ngày em đến",
  authors: [{
    authorId: author[9]._id
  }],
  image: "/music_image/tungayemden.jpg",
  views: 10000
}, {
  _id: new ObjectID(),
  name: "Hongkong1",
  authors: [{
    authorId: author[10]._id
  }],
  image: "/music_image/hongkong1.jpg",
  views: 12341
}, {
  _id: new ObjectID(),
  name: "Yêu 5",
  authors: [{
    authorId: author[11]._id
  }],
  image: "/music_image/yeu5.jpg",
  views: 100012
}, {
  _id: new ObjectID(),
  name: "Hồn trôi",
  authors: [{
    authorId: author[12]._id
  }, {
    authorId: author[13]._id
  }],
  image: "/music_image/hontroi.jpg"
}, {
  _id: new ObjectID(),
  name: "Có thể",
  authors: [{
    authorId: author[4]._id
  }],
  image: "/music_image/cothe.jpg",
  views: 100
}];

Author.deleteMany({}).then(() => {
  Author.insertMany(author);
});

Music.deleteMany({}).then(() => {
  Music.insertMany(music);
});