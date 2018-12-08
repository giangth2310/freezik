const express = require('express');
const router = express.Router();
const fs = require('fs');

const { Music } = require('./models/music.js')

const storage = require('./storage.js');
const author = require('./controllers/author.js');
const music = require('./controllers/music.js');
const playlist = require('./controllers/playlist.js');

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

router.get('/musicData', music.getMusic);
router.get('/home/top-authors', author.getTopAuthors);
router.get('/home/popular-songs', music.getPopularSongs);
router.get('/home/recommended-songs', music.getRecommendedSongs);
router.get('/comments', music.getComments);
router.get('/favorite', playlist.getFavorite);
router.get('/playlists', playlist.getPlaylists);

router.post('/login', author.login);
router.post('/sign-up', author.signup);
router.post('/musics', storage.uploadMusic, music.uploadMusic);
router.post('/comments', music.addComment);
router.post('/favorite', playlist.addToFavorite);
router.post('/playlists', playlist.addPlaylist);

router.put('/profile', storage.uploadAuthorAvatar, author.changeProfile);
router.put('/password', author.changePassword);

router.delete('/playlists', playlist.deletePlaylist);

module.exports = router;