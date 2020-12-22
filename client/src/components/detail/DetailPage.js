import React, { useEffect } from 'react';
import Detail from './Detail';
import { useDispatch, useSelector } from 'react-redux';
import { getPost, deletePost } from './detailSlice';
import { useParams, useHistory } from 'react-router-dom';
import { resetPosts as userResetPost } from '../postlist/userPostSlice';
import { resetPosts as allResetPost } from '../postlist/postSlice';
import { resetPosts as tagResetTag } from '../postlist/tagPostSlice';

function DetailPage() {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const { post, prevPostId } = useSelector((state) => state.detail);
  const { user } = useSelector((state) => state.auth);

  const onDeletePost = (postId) => {
    dispatch(deletePost(postId)).then((res) => {
      dispatch(userResetPost());
      dispatch(allResetPost());
      dispatch(tagResetTag());
      if (res) {
        history.push(`/@${user.nickname}`);
      }
    });
  };

  useEffect(() => {
    if (prevPostId !== postId) {
      dispatch(getPost(postId));
    }
  }, [dispatch, postId, prevPostId]);

  return <Detail post={post} user={user} onDeletePost={onDeletePost} />;
}

export default DetailPage;
