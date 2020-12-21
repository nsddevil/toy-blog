import React, { useEffect } from 'react';
import Write from './Write';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImg, deleteImg, addPost, resetImgs } from './writeSlice';
import { resetPosts } from '../postlist/postSlice';
import { useHistory } from 'react-router-dom';

function WritePage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { imgs } = useSelector((state) => state.write);
  const { user } = useSelector((state) => state.auth);

  const onUploadImg = (form) => {
    dispatch(uploadImg(form));
  };
  const onDeleteImg = (img) => {
    dispatch(deleteImg(img));
  };

  const onAddPost = (form) => {
    dispatch(addPost(form)).then((res) => {
      if (res && res.post) {
        dispatch(resetPosts());
        history.push(`/@${user.nickname}/${res.post._id}`);
      }
    });
  };

  useEffect(() => {
    return () => {
      dispatch(resetImgs());
    };
  }, [dispatch]);

  return (
    <Write
      onUploadImg={onUploadImg}
      onDeleteImg={onDeleteImg}
      onAddPost={onAddPost}
      imgs={imgs}
    />
  );
}

export default WritePage;
