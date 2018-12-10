const express = require('express');
const router = express.Router();

const storage = require('./storage.js');
const author = require('./controllers/author.js');
const music = require('./controllers/music.js');
const playlist = require('./controllers/playlist.js');

router.get('/music', music.getMusicStream);
router.get('/musicData', music.getMusic);
router.get('/home/top-authors', author.getTopAuthors);
router.get('/home/popular-songs', music.getPopularSongs);
router.get('/home/recommended-songs', music.getRecommendedSongs);
router.get('/comments', music.getComments);
router.get('/favorite', playlist.getFavorite);
router.get('/playlists', playlist.getPlaylists);
router.get('/search', music.search);
router.get('/musics', music.getUploaded);

router.post('/login', author.login);
router.post('/sign-up', author.signup);
router.post('/musics', storage.uploadMusic, music.uploadMusic);
router.post('/comments', music.addComment);
router.post('/favorite', playlist.addToFavorite);
router.post('/playlists', playlist.addPlaylist);
router.post('/playlist', playlist.addMusic);

router.put('/profile', storage.uploadAuthorAvatar, author.changeProfile);
router.put('/password', author.changePassword);
router.put('/playlists', storage.uploadPlaylistThumbnail, playlist.updatePlaylist);
router.put('/musics', storage.uploadMusicImage, music.updateMusic);

router.delete('/playlists', playlist.deletePlaylist);
router.delete('/musics', music.deleteMusic);

module.exports = router;