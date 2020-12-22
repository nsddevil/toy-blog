import React, { useState } from 'react';
import ReplyToComment from './ReplyToComment';
import SingleComment from './SingleComment';

function CommentList({ onWriteComment, comments, onDeleteComment, user }) {
  const [text, setText] = useState();
  const onChange = (e) => {
    const { value } = e.target;
    setText(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const form = {
      comment: text,
    };
    onWriteComment(form);
    setText('');
  };

  return (
    <div>
      {user && (
        <div>
          <form className="mt-2" onSubmit={onSubmit}>
            <textarea
              className="p-2 w-full focus:outline-none focus:ring-2 border rounded"
              onChange={onChange}
              value={text}
              placeholder="댓글 작성하기"
            />
            <div className="mt-2 text-right">
              <button
                type="submit"
                className="bg-blue-600 py-1 px-3 text-white focus:outline-none border rounded "
                onClick={onSubmit}
              >
                등록
              </button>
            </div>
          </form>
        </div>
      )}
      <div>
        {comments &&
          comments.map(
            (comment) =>
              !comment.replyTo && (
                <div key={comment._id}>
                  <SingleComment
                    comment={comment}
                    onWriteComment={onWriteComment}
                    user={user}
                    onDeleteComment={onDeleteComment}
                  />
                  <ReplyToComment
                    comments={comments}
                    onWriteComment={onWriteComment}
                    user={user}
                    parentId={comment._id}
                    onDeleteComment={onDeleteComment}
                  />
                </div>
              )
          )}
      </div>
    </div>
  );
}

export default CommentList;
