const express = require('express');
const router = express.Router();
const Like = require('../models/like');
const DisLike = require('../models/disLike');
const { isLogged } = require('../middleware');

router.get('/', async (req, res, next) => {
  const { postId, commentId } = req.query;
  const query = {
    ...(postId ? { postId } : {}),
    ...(commentId ? { commentId } : {}),
  };

  try {
    const likes = await Like.find(query).exec();
    res.status(200).json({ likes });
  } catch (error) {
    next(error);
  }
});

router.get('/disLike', async (req, res, next) => {
  const { postId, commentId } = req.query;
  const query = {
    ...(postId ? { postId } : {}),
    ...(commentId ? { commentId } : {}),
  };

  try {
    const disLikes = await DisLike.find(query).exec();

    res.status(200).json({ disLikes });
  } catch (error) {
    next(error);
  }
});

router.post('/', isLogged, async (req, res, next) => {
  const { postId, commentId } = req.body;
  const query = {
    ...(postId ? { postId } : {}),
    ...(commentId ? { commentId } : {}),
  };

  try {
    const like = new Like({
      ...query,
      author: {
        _id: req.user._id,
        nickname: req.user.nickname,
      },
    });
    await like.save();

    const disLike = await DisLike.findOne({ ...query, 'author._id': req.user._id }).exec();
    if (!disLike) {
      return res.sendStatus(204);
    }

    if (disLike.author._id.toString() !== req.user._id) {
      return res.status(403).json({
        error: '삭제 권한이 없습니다.',
      });
    }
    await disLike.delete();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

router.post('/disLike', isLogged, async (req, res, next) => {
  const { postId, commentId } = req.body;
  const query = {
    ...(postId ? { postId } : {}),
    ...(commentId ? { commentId } : {}),
  };

  try {
    const disLike = new DisLike({
      ...query,
      author: {
        _id: req.user._id,
        nickname: req.user.nickname,
      },
    });
    await disLike.save();
    const like = await Like.findOne({ ...query, 'author._id': req.user._id }).exec();

    if (!like) {
      return res.sendStatus(204);
    }
    if (like.author._id.toString() !== req.user._id) {
      return res.status(403).json({
        error: '삭제 권한이 없습니다.',
      });
    }
    await like.delete();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

router.post('/unLike', isLogged, async (req, res, next) => {
  const { postId, commentId } = req.body;
  const query = {
    ...(postId ? { postId } : {}),
    ...(commentId ? { commentId } : {}),
  };

  try {
    const like = await Like.findOne({ ...query, 'author._id': req.user._id }).exec();

    if (!like) {
      return res.sendStatus(204);
    }
    if (like.author._id.toString() !== req.user._id) {
      return res.status(403).json({
        error: '삭제 권한이 없습니다.',
      });
    }
    await like.delete();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

router.post('/unDisLike', isLogged, async (req, res, next) => {
  const { postId, commentId } = req.body;
  const query = {
    ...(postId ? { postId } : {}),
    ...(commentId ? { commentId } : {}),
  };

  try {
    const disLike = await DisLike.findOne({ ...query, 'author._id': req.user._id }).exec();

    if (!disLike) {
      return res.sendStatus(204);
    }

    if (disLike.author._id.toString() !== req.user._id) {
      return res.status(403).json({
        error: '삭제 권한이 없습니다.',
      });
    }
    await disLike.delete();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
