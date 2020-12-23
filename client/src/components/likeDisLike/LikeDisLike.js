import React from 'react';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';

function LikeDisLike({ like, disLike, onLikeAction, onDisLikeAction, likeAction, disLikeAction }) {
  return (
    <div className="w-full flex justify-end">
      <button className="flex items-center focus:outline-none" onClick={onLikeAction}>
        <AiOutlineLike className={likeAction ? 'text-red-500' : ''} />
        <span className="ml-1">{like}</span>
      </button>
      <button className="ml-2 flex items-center focus:outline-none" onClick={onDisLikeAction}>
        <AiOutlineDislike className={disLikeAction ? 'text-red-500' : ''} />
        <span className="ml-1">{disLike}</span>
      </button>
    </div>
  );
}

export default LikeDisLike;
