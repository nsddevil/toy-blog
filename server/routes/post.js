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

  let hashtags = body.match(/#[^\s#]+/g);
  if (hashtags) {
    hashtags = hashtags.map((t) => t.split('#')[1]);
  }
  try {
    const post = new Post({
      body: body.replace(/#[^\s#]+/g, '').trim(),
      imgs,
      author: {
        _id: req.user._id,
        nickname: req.user.nickname,
      },
      tags: hashtags || [],
    });
    await post.save();
    res.status(200).json({
      post,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  const page = parseInt(req.query.page || '1', 10);
  const { nickname, tag } = req.query;
  const query = {
    ...(nickname ? { 'author.nickname': nickname } : {}),
    ...(tag ? { tags: tag } : {}),
  };

  try {
    const posts = await Post.find(query)
      .sort({ _id: -1 })
      .limit(10)
      .skip((page - 1) * 10)
      .exec();

    const postCount = await Post.countDocuments(query).exec();
    res.status(200).json({
      posts,
      lastPage: Math.ceil(postCount / 10),
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:postId', async (req, res, next) => {
  const { postId } = req.params;
  try {
    const post = await Post.findOne({ _id: postId }).exec();
    if (!post) {
      return res.status(404).json({
        error: '포스트가 없습니다.',
      });
    }
    res.status(200).json({
      post,
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:postId', isLogged, async (req, res, next) => {
  const { postId } = req.params;
  try {
    const post = await Post.findOne({ _id: postId }).exec();
    if (!post) {
      return res.status(404).json({
        error: '포스트가 없습니다.',
      });
    }
    if (post.author._id.toString() !== req.user._id) {
      return res.status(403).json({
        error: '삭제권한이 없습니다.',
      });
    }
    await post.delete();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
