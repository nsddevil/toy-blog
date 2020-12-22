import React, { useEffect } from 'react';
import PostList from './PostList';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsAll } from './userPostSlice';
import { useParams } from 'react-router-dom';

function UserListPage() {
  const dispatch = useDispatch();
  const { nickname } = useParams();
  const { posts, lastPage, currentPage, prevNickname } = useSelector((state) => state.userPost);

  useEffect(() => {
    if (prevNickname !== nickname) {
      dispatch(getPostsAll({ nickname }));
    } else {
      const infiniteScroll = () => {
        const { documentElement, body } = document;
        const scrollHeight = Math.max(documentElement.scrollHeight, body.scrollHeight);
        const scrollTop = Math.max(documentElement.scrollTop, body.scrollTop);
        const clientHeight = documentElement.clientHeight;

        if (scrollTop + clientHeight >= scrollHeight && lastPage !== currentPage) {
          dispatch(getPostsAll({ nickname, page: currentPage + 1 }, true));
        }
      };
      window.addEventListener('scroll', infiniteScroll);

      return () => {
        window.removeEventListener('scroll', infiniteScroll);
      };
    }
  }, [currentPage, dispatch, lastPage, nickname, prevNickname]);

  return <PostList posts={posts} />;
}

export default UserListPage;
