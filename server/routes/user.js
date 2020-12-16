const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { isNotLogged } = require('../middleware');

router.post('/signup', isNotLogged, async (req, res, next) => {
  const { email, nickname, password } = req.body;
  const schema = Joi.object({
    email: Joi.string().email().required(),
    nickname: Joi.string().required(),
    password: Joi.string().required(),
  });

  const result = schema.validate(req.body);

  if (result.error) {
    return res.status(400).json({
      error: result.error.message,
    });
  }

  try {
    const hash = await bcrypt.hash(password, 12);
    const user = new User({
      email,
      nickname,
      password: hash,
    });

    await user.save();
    res.status(200).json({
      success: true,
      message: '회원가입을 축하합니다. 로그인 해주세요.',
    });
  } catch (error) {
    next(error);
  }
});

router.post('/signin', isNotLogged, (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const result = schema.validate(req.body);

  if (result.error) {
    return res.status(400).json({
      error: result.error.message,
    });
  }
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) return next(error);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: info.message,
      });
    }
    req.login(user, { session: false }, (err) => {
      if (err) return next(err);
      try {
        const token = jwt.sign(user, process.env.JWT_SECRET);
        res.status(200).json({
          token,
          user,
        });
      } catch (error) {
        return next(error);
      }
    });
  })(req, res, next);
});

module.exports = router;
