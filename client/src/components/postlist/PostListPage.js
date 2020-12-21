import React, { useEffect } from 'react';
import PostList from './PostList';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsAll } from './postSlice';

function PostListPage() {
  const dispatch = useDispatch();
  const { posts, lastPage, currentPage } = useSelector(
    (state) => state.postList
  );

  useEffect(() => {
    if (currentPage === 0) {
      dispatch(getPostsAll());
    } else {
      const infiniteScroll = () => {
        const { documentElement, body } = document;
        const scrollHeight = Math.max(
          documentElement.scrollHeight,
          body.scrollHeight
        );
        const scrollTop = Math.max(documentElement.scrollTop, body.scrollTop);
        const clientHeight = documentElement.clientHeight;

        if (
          scrollTop + clientHeight >= scrollHeight &&
          lastPage !== currentPage
        ) {
          dispatch(getPostsAll({ page: currentPage + 1 }));
        }
      };
      window.addEventListener('scroll', infiniteScroll);

      return () => {
        window.removeEventListener('scroll', infiniteScroll);
      };
    }
  }, [currentPage, dispatch, lastPage]);

  return <PostList posts={posts} />;
}

export default PostListPage;
