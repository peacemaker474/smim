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
      cb(null, `users/${Date.now()}_${file.originalname}`);
    },
  }),
});

// 임시로 만들어둔 이미지 삭제

export const deleteUserImage = async (key) => {
  const params = {
    Bucket: 'smim-image-bucket',
    Key: `${key}`,
  };

  try {
    const result = await s3.deleteObjects(params).promise();
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const postImageDelete = (req, res, next) => {
  const {
    content: { para, img: imgArray },
  } = req.body;

  let params = {
    Bucket: 'smim-image-bucket',
    Delete: {
      Objects: [],
    },
  };

  const myRegExp1 = /https:(.*?)(PNG|jpg|jpeg)/g;
  const realImg = para.match(myRegExp1).map((el) => el.split('com/')[1]);

  try {
    for (let el of imgArray) {
      if (!realImg.includes(el)) {
        console.log(el);
        params.Delete.Objects.push({ Key: el });
      }
    }
    s3.deleteObjects(params, function (err, data) {
      if (err) console.log(err);
      // an error occurred
      else console.log(data); // successful response
    });
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: '내부 서버 오류입니다.',
    });
  }
};

export const postImageUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'smim-image-bucket',
    key: function (req, file, cb) {
      let ext = file.mimetype.split('/')[1];
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  }),
  acl: 'public-read-write',
});
