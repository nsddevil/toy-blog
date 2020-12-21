import React, { useEffect } from 'react';
import Detail from './Detail';
import { useDispatch, useSelector } from 'react-redux';
import { getPost } from './detailSlice';
import { useParams } from 'react-router-dom';

function DetailPage() {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { post, prevPostId } = useSelector((state) => state.detail);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (prevPostId !== postId) {
      dispatch(getPost(postId));
    }
  }, [dispatch, postId, prevPostId]);

  return <Detail post={post} user={user} />;
}

export default DetailPage;
