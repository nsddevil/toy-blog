import React, { useState } from 'react';
import { MdDelete } from 'react-icons/md';

function SingleComment({ comment, onWriteComment, onDeleteComment, user }) {
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);

  const onOpenReply = (e) => {
    e.preventDefault();
    setOpen((prev) => {
      setText('');
      return !prev;
    });
  };
  const onChange = (e) => {
    const { value } = e.target;
    setText(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const form = {
      comment: text,
      replyTo: comment._id,
    };
    onWriteComment(form);
    setText('');
  };
  return (
    <div className="py-2 flex">
      <div>
        <h4 className="font-bold">{comment.author.nickname}</h4>
      </div>
      <div className="ml-2 flex-1">
        <p>{comment.comment}</p>
        {user && (
          <div>
            <span
              className="cursor-pointer text-gray-500 text-sm"
              onClick={onOpenReply}
            >
              댓글쓰기
            </span>
          </div>
        )}
        {open && (
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
                  className="bg-gray-400 py-1 px-3 text-white focus:outline-none border rounded"
                  onClick={onOpenReply}
                >
                  취소
                </button>
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
      </div>
      {user && comment.author._id === user._id && (
        <div className="w-6 h-6 text-red-600 text-2xl cursor-pointer hover:text-red-400">
          <MdDelete onClick={() => onDeleteComment(comment._id)} />
        </div>
      )}
    </div>
  );
}

export default SingleComment;
