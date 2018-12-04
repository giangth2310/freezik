const multer = require('multer');
const path = require('path');
const maxFileSize = 5 * 1024 * 1024;

const uploadAuthorAvatar = (req, res, next) => {
  const upload = multer({
    storage: multer.diskStorage({
      destination: 'public/author_avatar',
      filename: (req, file, callback) => {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
      }
    }),
    fileFilter: (req, file, callback) => {
      const allowFileTypes = /jpg|jpeg|png|gif/;
      const extname = path.extname(file.originalname).toLowerCase();
      if (!allowFileTypes.test(extname) || !allowFileTypes.test(file.mimetype)) {
        callback('Only allows image files');
      } else {
        callback(null, true);
      }
    },
    limits: {fileSize: maxFileSize}
  })
  .single('avatar');

  upload(req, res, function(err) {
    if (err) {
      res.status(400).send({
        message: "Unable to upload files",
        error: err
      });
    } else {
      next();
    }
  })
};

const uploadMusic = (req, res, next) => {
  const upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        const extname = path.extname(file.originalname).toLowerCase();
        const extMusic = [".mp3"];
        const extImage = [".jpg", ".jpeg", ".png", ".gif"];

        if(extMusic.includes(extname)) {
          cb(null, 'public/musics');
          
        } else if (extImage.includes(extname)) {
          cb(null, 'public/music_image');

        }
      },
      filename: (req, file, callback) => {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
      }
    }),
    limits: {fileSize: maxFileSize}
  })
  .fields([{name: "music"}, {name: "image"}]);

  upload(req, res, function(err) {
    if (err) {
      res.status(400).send({
        message: "Unable to upload files",
        error: err
      });
    } else {
      next();
    }
  })
};

module.exports = {
  uploadAuthorAvatar,
  uploadMusic
}