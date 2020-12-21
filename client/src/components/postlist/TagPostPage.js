import React, { useEffect } from 'react';
import PostList from './PostList';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsAll } from './tagPostSlice';
import { useParams } from 'react-router-dom';

function TagPostPage() {
  const dispatch = useDispatch();
  const { tagName } = useParams();
  const { posts, lastPage, currentPage, prevTag } = useSelector(
    (state) => state.tagPost
  );

  useEffect(() => {
    if (prevTag !== tagName) {
      dispatch(getPostsAll({ tag: tagName }, true));
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
          dispatch(getPostsAll({ tag: tagName, page: currentPage + 1 }));
        }
      };
      window.addEventListener('scroll', infiniteScroll);

      return () => {
        window.removeEventListener('scroll', infiniteScroll);
      };
    }
  }, [currentPage, dispatch, lastPage, tagName, prevTag]);

  return <PostList posts={posts} />;
}

export default TagPostPage;
