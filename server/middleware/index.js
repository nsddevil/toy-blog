const jwt = require('jsonwebtoken');

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
};
