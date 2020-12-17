const jwt = require('jsonwebtoken');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter(req, file, cb) {
    if (file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
      cb(new Error('Plase upload only images'), false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

const resizeImage = async (req, res, next) => {
  if (!req.files) return next();
  const imgs = [];
  await Promise.all(
    req.files.map(async (file) => {
      const extname = path.extname(file.originalname);
      const basename = path.basename(file.originalname, extname);
      const newFilename = basename + Date.now() + extname;

      await sharp(file.buffer)
        .resize(640, 480, { fit: 'contain' })
        .toFormat('jpeg')
        .jpeg({ quality: 100 })
        .toFile(path.join(__dirname, '..', 'uploads', newFilename));

      imgs.push(`/image/${newFilename}`);
    })
  );
  return res.status(200).json({
    imgs,
  });
};

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) return next();

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};

const isLogged = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      error: '로그인이 필요합니다.',
    });
  }
  next();
};

const isNotLogged = (req, res, next) => {
  if (req.user) {
    return res.status(403).json({
      error: '이미 로그인 중입니다.',
    });
  }
  next();
};

module.exports = {
  verifyToken,
  isLogged,
  isNotLogged,
  upload,
  resizeImage,
};
