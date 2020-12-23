const mongoose = require('mongoose');

const disLikeSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Types.ObjectId,
  },
  commentId: {
    type: mongoose.Types.ObjectId,
  },
  author: {
    _id: {
      type: mongoose.Types.ObjectId,
    },
    nickname: {
      type: String,
    },
  },
});

const DisLike = mongoose.model('DisLike', disLikeSchema);

module.exports = DisLike;
