const express = require('express');
const router = express.Router();
const fs = require('fs');

const { Music } = require('./models/music.js')

const storage = require('./storage.js');
const author = require('./controllers/author.js');
const music = require('./controllers/music.js');

router.get('/music', async (req, res) => {
	try {
		res.set('content-type', 'audio/mp3');
		res.set('accept-ranges', 'bytes');
	
		var musicId = req.query._id;
		var music = await Music.findMusicById(musicId);
		
		var file = __dirname + '/public/musics/' + music.fileName;
		
		fs.exists(file,function(exists){
			if(exists) {
				var rstream = fs.createReadStream(file);
				rstream.pipe(res);
			} else {
				res.send("can not find this music");
				res.end();
			}
		});
	} catch (error) {
		res.status(400).send({message: error.message});
	}
});

router.get('/home/top-authors', author.getTopAuthors);
router.get('/home/popular-songs', music.getPopularSongs);
router.get('/home/recommended-songs', music.getRecommendedSongs);
router.get('/comments', music.getComments);

router.get('my-favorite', (req, res) => {
  res.send();
});

router.post('/login', author.login);
router.post('/sign-up', author.signup);

router.put('/profile', storage.uploadAuthorAvatar, author.changeProfile);
router.put('/change-password', author.changePassword);

module.exports = router;