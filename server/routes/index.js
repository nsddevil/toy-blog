const express = require('express');
const router = express.Router();
const userRouter = require('./user');
const uploadRouter = require('./upload');
const postRouter = require('./post');

router.use('/user', userRouter);
router.use('/upload', uploadRouter);
router.use('/post', postRouter);

module.exports = router;
