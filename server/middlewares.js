import multer from 'multer';
import path from 'path';

export const userImgUpload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/users/');
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
    limits: {
      fileSize: 5 * 1024 * 1024
    },
  })
});