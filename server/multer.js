import s3 from './s3.js';
import multer from 'multer';
import multerS3 from 'multer-s3';

export const postImageUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'smim-image-bucket',
    key: function (req, file, cb) {
      let ext = file.mimetype.split('/')[1];
      if (!['png', 'jpg', 'jpeg', 'gif'].includes(ext)) {
        return cb(new Error('Only images are allowed'));
      }
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  }),
  acl: 'public-read-write',
});
