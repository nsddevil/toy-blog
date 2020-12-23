import React from 'react';
import Slide from '../slide/Slide';
import formatDate from '../../util/formatDate';
import { Link } from 'react-router-dom';
import CommentPage from '../comment/CommentPage';
import LikeDisLikePage from '../likeDisLike/LikeDisLikePage';

function Detail({ post, user, onDeletePost }) {
  return (
    <div className="container mx-auto">
      {post ? (
        <div className="mt-4">
          <div className="flex max-w-screen-sm">
            <h1 className="text-xl font-bold text-blue-600">
              <Link to={`/@${post.author.nickname}`}>{post.author.nickname}</Link>
              <span className="pl-4 text-sm text-gray-400">{formatDate(post.createdAt)}</span>
            </h1>
            {user && post.author._id === user._id && (
              <button
                className="px-4 ml-auto bg-red-500 focus:outline-none text-white rounded"
                onClick={() => onDeletePost(post._id)}
              >
                삭제
              </button>
            )}
          </div>
          {post.imgs && (
            <div className="mt-4">
              <Slide imgs={post.imgs} />
            </div>
          )}
          <div className="flex max-w-screen-sm">
            <LikeDisLikePage />
          </div>
          <div className="mt-4">
            <p>{post.body}</p>
          </div>
          <div className="mt-4">
            {post.tags.map((tag, i) => (
              <span key={tag + i} className="mr-2 text-blue-400">
                <Link to={`/tag/${tag}`}>#{tag}</Link>
              </span>
            ))}
          </div>
          <div className="mt-4 max-w-screen-sm">
            <CommentPage />
          </div>
        </div>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
}

export default Detail;
