import React, { useMemo, useState } from 'react';
import SingleComment from './SingleComment';

function replyCount(commentList = [], parentId) {
  return commentList.filter((c) => c.replyTo === parentId).length;
}

function ReplyToComment({
  comments,
  onWriteComment,
  onDeleteComment,
  user,
  parentId,
}) {
  const [open, setOpen] = useState(false);
  const onOpen = () => {
    setOpen((prev) => !prev);
  };

  const counts = useMemo(() => replyCount(comments, parentId), [
    comments,
    parentId,
  ]);

  return (
    <>
      {counts !== 0 && (
        <div className="ml-6">
          <span className="text-blue-400 cursor-pointer" onClick={onOpen}>
            {counts} comments..
          </span>
        </div>
      )}

      {comments &&
        open &&
        comments.map(
          (comment) =>
            comment.replyTo === parentId && (
              <div className="ml-6" key={comment._id}>
                <SingleComment
                  comment={comment}
                  user={user}
                  onWriteComment={onWriteComment}
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
    </>
  );
}

export default ReplyToComment;
