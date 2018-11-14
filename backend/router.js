const express = require('express');
const router = express.Router();
const fs = require('fs');

const author = require('./controllers/author.js');
const music = require('./controllers/music.js');

router.get('/music', (req, res) => {
  res.set('content-type', 'audio/mp3');
  res.set('accept-ranges', 'bytes');

  var fileName = req.query.name; 
  var file = __dirname + '/public/musics/' + fileName + ".mp3";
  
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
router.get('/home/recommended-songs', music.getRecommendedSongs);

router.get('my-favorite', (req, res) => {
  res.send();
});

router.post('/login', author.login);
router.post('/sign-up', author.signup);

module.exports = router;