const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    body: {
      type: String,
    },
    imgs: {
      type: Array,
    },
    author: {
      _id: mongoose.Types.ObjectId,
      nickname: String,
    },
    tags: {
      type: Array,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
