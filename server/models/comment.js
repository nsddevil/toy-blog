const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    author: {
      _id: {
        type: mongoose.Types.ObjectId,
      },
      nickname: {
        type: String,
      },
    },
    postId: {
      type: mongoose.Types.ObjectId,
      index: true,
    },
    replyTo: {
      type: mongoose.Types.ObjectId,
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
