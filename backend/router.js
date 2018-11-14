const express = require('express');
const router = express.Router();
const fs = require('fs');

const author = require('./controllers/author.js');
const music = require('./controllers/music.js');

router.get('/music', (req, res) => {
  console.log(req.query.id);
  res.set('content-type', 'audio/mp3');
  res.set('accept-ranges', 'bytes');

  var fileId = req.query.id; 
  var file = __dirname + '/public/musics/' + fileId + ".mp3";
  
  console.log(file);
	fs.exists(file,function(exists){
		if(exists) {
			var rstream = fs.createReadStream(file);
			rstream.pipe(res);
		} else {
			res.send("404");
			res.end();
		}
	});
});

router.get('/home/top-authors', author.getTopAuthors);

router.get('/home/popular-songs', music.getPopularSongs);

router.get('/home/recommended-songs', (req, res) => {
  res.send([
    {
      "music_name": "Đố em biết anh đang nghĩ gì",
      "music_image": "/public/doembietanhdangnghigi_image.png",
      "music_artist": "Đen x JustaTee"
    }, {
      "music_name": "Em dạo này",
      "music_image": "/public/emdaonay_image.png",
      "music_artist": "Ngọt"
    }, {
      "music_name": "Say you do",
      "music_image": "/public/sayyoudo_image.png",
      "music_artist": "Tiên Tiên"
    }, {
      "music_name": "Vô tình",
      "music_image": "/public/votinh_image.png",
      "music_artist": "Hoaprox x Xesi"
    }, {
      "music_name": "Thanh xuân",
      "music_image": "/public/thanhxuan_image.png",
      "music_artist": "Dalab"
    }, {
      "music_name": "Lạ lùng",
      "music_image": "/public/lalung_image.png",
      "music_artist": "Vũ"
    }, {
      "music_name": "Hồn trôi",
      "music_image": "/public/hontroi_image.png",
      "music_artist": "Yun x Dr A"
    }, {
      "music_name": "Có thể",
      "music_image": "/public/cothe_image.png",
      "music_artist": "Cá hồi hoang"
    }
  ]);
});

router.get('my-favorite', (req, res) => {
  res.send();
});

module.exports = router;