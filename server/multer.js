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

export const deleteUserImage = async (key) => {
  const params = {
    Bucket: 'smim-image-bucket',
    Delete: {
      Objects: [{ Key: `${key}` }],
      Quiet: false,
    },
  };

  try {
    const result = await s3.deleteObjects(params).promise();
    return result;
  } catch (err) {
    console.log(err);
  }
};

// image delete when post upload or edit

export const postImageDeleteAndUpload = (req, res, next) => {
  const {
    content: { para, img: imgArray },
  } = req.body;

  let params = {
    Bucket: 'smim-image-bucket',
    Delete: {
      Objects: [],
    },
  };

  const myRegExp1 = /https:(.*?)(png|jpg|jpeg)/gi;
  const realImg = (para.match(myRegExp1) || []).map((el) => decodeURI(el.split('com/')[1]));

  try {
    for (let el of imgArray) {
      if (!realImg.includes(el)) {
        params.Delete.Objects.push({ Key: el });
      }
    }
    s3.deleteObjects(params, function (err, data) {
      if (err) throw new Error(err);
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

// image delete when post delete

export const postImageDeleteAndDelete = (req, res, next) => {
  const {
    post: { content },
  } = req; // post id

  let params = {
    Bucket: 'smim-image-bucket',
    Delete: {
      Objects: [],
    },
  };

  const myRegExp1 = /https:(.*?)(png|jpg|jpeg)/gi;

  if (content.match(myRegExp1).length === 0) {
    // 이미지 없으면 삭제 안하고 넘어감
    next();
  }

  content.match(myRegExp1).forEach((el) => {
    const key = decodeURI(el.split('com/')[1]);
    params.Delete.Objects.push({ Key: key });
  });

  try {
    s3.deleteObjects(params, function (err, data) {
      if (err) throw new Error(err);
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

// only image upload
export const postSingleImageUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'smim-image-bucket',
    key: function (req, file, cb) {
      cb(null, `posts/${Date.now()}_${file.originalname}`);
    },
  }),
  acl: 'public-read-write',
});

// only image delete
export const PostImageDelete = (req, res) => {
  const {
    body: {
      content: { img },
    },
  } = req; // post id

  let params = {
    Bucket: 'smim-image-bucket',
    Delete: {
      Objects: [],
    },
  };

  if (img.length === 0) {
    return res.status(200).send({
      success: true,
      message: '이미지가 성공적으로 삭제되었습니다.',
    });
  }

  img.forEach((el) => {
    const key = decodeURI(el);
    params.Delete.Objects.push({ Key: key });
  });

  try {
    s3.deleteObjects(params, function (err, data) {
      if (err) throw new Error(err);
    });
    return res.status(200).send({
      success: true,
      message: '이미지가 성공적으로 삭제되었습니다.',
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: '내부 서버 오류입니다.',
    });
  }
};
