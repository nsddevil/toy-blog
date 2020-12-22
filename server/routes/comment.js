const express = require('express');
const Comment = require('../models/comment');
const { isLogged } = require('../middleware');
const router = express.Router();
const Joi = require('joi');

router.post('/', isLogged, async (req, res, next) => {
  const { comment, postId, replyTo } = req.body;

  const schema = Joi.object({
    comment: Joi.string().required(),
    postId: Joi.string().required(),
    replyTo: Joi.string(),
  });

  const result = schema.validate(req.body);

  if (result.error) {
    return res.status(400).json({
      error: result.error.message,
    });
  }

  try {
    const newComment = new Comment({
      comment,
      postId,
      replyTo,
      author: {
        _id: req.user._id,
        nickname: req.user.nickname,
      },
    });

    await newComment.save();

    res.status(200).json({
      comment: newComment,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:postId', async (req, res, next) => {
  const { postId } = req.params;
  try {
    const comments = await Comment.find({ postId }).sort({ _id: -1 }).exec();
    res.status(200).json({ comments });
  } catch (error) {
    next(error);
  }
});

router.delete('/:commentId', isLogged, async (req, res, next) => {
  const { commentId } = req.params;
  try {
    const comment = await Comment.findOne({ _id: commentId }).exec();
    if (!comment) {
      return res.status(400).json({
        error: '코멘트 정보가 없습니다.',
      });
    }
    if (comment.author._id.toString() !== req.user._id) {
      return res.status(403).json({
        error: '삭제 권한이 없습니다.',
      });
    }
    await comment.delete();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
