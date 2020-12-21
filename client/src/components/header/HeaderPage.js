import React from 'react';
import Header from './Header';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../auth/authSlice';
import { resetPosts } from '../postlist/tagPostSlice';

function HeaderPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
  };
  const onFindTag = (tagName) => {
    dispatch(resetPosts());
    history.push(`/tag/${tagName}`);
  };
  return <Header user={user} onLogout={onLogout} onFindTag={onFindTag} />;
}

export default HeaderPage;
