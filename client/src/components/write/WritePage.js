import React, { useEffect } from 'react';
import Write from './Write';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImg, deleteImg, resetImgs } from './writeSlice';
import { addPost, resetPosts } from '../postlist/postSlice';
import { resetPosts as userResetPost } from '../postlist/userPostSlice';
import { resetPosts as tagResetPost } from '../postlist/tagPostSlice';
import { useHistory } from 'react-router-dom';

function WritePage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { imgs } = useSelector((state) => state.write);

  const onUploadImg = (form) => {
    dispatch(uploadImg(form));
  };
  const onDeleteImg = (img) => {
    dispatch(deleteImg(img));
  };

  const onAddPost = (form) => {
    dispatch(addPost(form)).then((res) => {
      dispatch(resetPosts());
      dispatch(userResetPost());
      dispatch(tagResetPost());
      if (res && res.post) {
        history.push(`/@${res.post.author.nickname}`);
      }
    });
  };

  useEffect(() => {
    return () => {
      dispatch(resetImgs());
    };
  }, [dispatch]);

  return <Write onUploadImg={onUploadImg} onDeleteImg={onDeleteImg} onAddPost={onAddPost} imgs={imgs} />;
}

export default WritePage;
