import AWS from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export const userUpload = multer({
  storage: multerS3({
    s3,
    bucket: 'smim-image-bucket',
    key: function (req, file, cb) {
      cb(null, `users/${Date.now()}_${file.originalname}`)
    }
  })
});

// 임시로 만들어둔 이미지 삭제

export const deleteUserImage = async (key) => {
  const params = {
    Bucket: "smim-image-bucket",
    Key: `${key}`,
  };

  try {
    const result = await s3.deleteObjects(params).promise();
    return result;
  } catch (err) {
    console.log(err);
  }
}

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
