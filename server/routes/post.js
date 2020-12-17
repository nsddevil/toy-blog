const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const { isLogged } = require('../middleware');
const Joi = require('joi');

router.post('/', isLogged, async (req, res, next) => {
  const { body, imgs } = req.body;
  const schema = Joi.object({
    body: Joi.string().required(),
  });
  const result = schema.validate({ body });
  if (result.error) {
    return res.status(400).json({
      error: result.error.message,
    });
  }

  try {
    const newPost = new Post({
      body: body.replace(/#[^\s#]+/g, '').trim(),
      imgs,
      author: {
        _id: req.user._id,
        nickname: req.user.nickname,
      },
      tags: body.match(/#[^\s#]+/g) || [],
    });
    await newPost.save();
    res.status(200).json({
      postId: newPost._id,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
