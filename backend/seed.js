var { ObjectID } = require('mongodb');

const { Author } = require('./models/author.js');
const { Music } = require('./models/music.js');

const author = [{
  _id: new ObjectID(),
  name: "Đen",
  avatar: "http://localhost:5000/public/author_avatar/den.jpg",
  email: "",
  password: ""
}, {
  _id: new ObjectID(),
  name: "Ngọt",
  avatar: "ttp://localhost:5000/public/author_avatar/ngot.jpg",
  email: "",
  password: ""
}, {
  _id: new ObjectID(),
  name: "Tiên Tiên",
  avatar: "http://localhost:5000/public/author_avatar/tientien.jpg",
  email: "",
  password: ""
}, {
  _id: new ObjectID(),
  name: "Vũ",
  avatar: "http://localhost:5000/public/author_avatar/vu.jpg",
  email: "",
  password: ""
}, {
  _id: new ObjectID(),
  name: "Cá Hồi Hoang",
  avatar: "http://localhost:5000/public/author_avatar/cahoihoang.jpg",
  email: "",
  password: ""
}, {
  _id: new ObjectID(),
  name: "JustaTee",
  avatar: "http://localhost:5000/public/author_avatar/justatee.jpg",
  email: "",
  password: ""
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
  artist: "Đen x JustaTee"
}, {
  _id: new ObjectID(),
  name: "Em dạo này",
  authorId: author[1]._id,
  image: "http://localhost:5000/public/music_image/emdaonay.jpg",
  views: 10000,
  artist: "Ngọt"
}, {
  _id: new ObjectID(),
  name: "Em không thể",
  authorId: author[2]._id,
  image: "http://localhost:5000/public/music_image/emkhongthe.jpg",
  views: 150000,
  artist: "Tiên Tiên x Touliver"
}, {
  _id: new ObjectID(),
  name: "Say you do",
  authorId: author[2]._id,
  image: "http://localhost:5000/public/music_image/sayyoudo.jpg",
  views: 1234,
  artist: "Tiên Tiên"
}, {
  _id: new ObjectID(),
  name: "Vô tình",
  authorId: author[7]._id,
  image: "http://localhost:5000/public/music_image/votinh.jpg",
  views: 123,
  artist: "Hoaprox x Xesi"
}, {
  _id: new ObjectID(),
  name: "Lạ lùng",
  authorId: author[3]._id,
  image: "http://localhost:5000/public/music_image/lalung.jpg",
  views: 11111,
  artist: "Vũ"
}, {
  _id: new ObjectID(),
  name: "Thanh xuân",
  authorId: author[9]._id,
  image: "http://localhost:5000/public/music_image/thanhxuan.jpg",
  views: 11233,
  artist: "Dalab"
}, {
  _id: new ObjectID(),
  name: "Từ ngày em đến",
  authorId: author[9]._id,
  image: "http://localhost:5000/public/music_image/tungayemden.jpg",
  views: 10000,
  artist: "Dalab"
}, {
  _id: new ObjectID(),
  name: "Hongkong1",
  authorId: author[10]._id,
  image: "http://localhost:5000/public/music_image/hongkong1.jpg",
  views: 12341,
  artist: "Nguyễn Trọng Tài"
}, {
  _id: new ObjectID(),
  name: "Yêu 5",
  authorId: author[11]._id,
  image: "http://localhost:5000/public/music_image/yeu5.jpg",
  views: 100012,
  artist: "Rhymastic"
}, {
  _id: new ObjectID(),
  name: "Hồn trôi",
  authorId: author[12]._id,
  image: "http://localhost:5000/public/music_image/hontroi.jpg",
  artist: "Yun x Dr A"
}, {
  _id: new ObjectID(),
  name: "Có thể",
  authorId: author[4]._id,
  image: "http://localhost:5000/public/music_image/cothe.jpg",
  views: 100,
  artist: "Cá Hồi Hoang"
}];

Author.deleteMany({}).then(() => {
  Author.insertMany(author);
});

Music.deleteMany({}).then(() => {
  Music.insertMany(music);
});