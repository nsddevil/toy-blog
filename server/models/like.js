const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
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

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;
