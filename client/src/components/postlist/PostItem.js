import React from 'react';
import formatDate from '../../util/formatDate';
import { Link } from 'react-router-dom';

function PostItem({ post }) {
  return (
    <article className="border rounded">
      <Link to={`/@${post.author.nickname}/${post._id}`}>
        <div>{post.imgs && <img src={post.imgs[0]} alt={post.imgs[0]} />}</div>
        <div className="p-2">
          <div>
            <p>{post.body}</p>
          </div>
          <div>
            <span className="text-sm text-gray-400">
              {formatDate(post.createdAt)}
            </span>
          </div>
        </div>
      </Link>
      <div className="p-2 border-t border-gray-100">
        <Link to={`/@${post.author.nickname}`}>
          <p className="font-bold text-blue-400 cursor-pointer">
            {post.author.nickname}
          </p>
        </Link>
      </div>
    </article>
  );
}

export default PostItem;
