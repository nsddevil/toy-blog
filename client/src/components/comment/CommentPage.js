import React, { useEffect } from 'react';
import CommentList from './CommentList';
import { useDispatch, useSelector } from 'react-redux';
import { writeComment, getComments, deleteComment } from './commentSlice';
import { useParams } from 'react-router-dom';

function CommentPage() {
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.commentList);
  const { user } = useSelector((state) => state.auth);
  const { postId } = useParams();

  const onWriteComment = (form) => {
    dispatch(writeComment({ postId, ...form }));
  };
  const onDeleteComment = (commentId) => {
    dispatch(deleteComment(commentId));
  };

  useEffect(() => {
    dispatch(getComments(postId));
  }, [dispatch, postId]);

  return (
    <CommentList
      onWriteComment={onWriteComment}
      comments={comments}
      user={user}
      onDeleteComment={onDeleteComment}
    />
  );
}

export default CommentPage;
