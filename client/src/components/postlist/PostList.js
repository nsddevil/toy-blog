import React from 'react';
import PostItem from './PostItem';

function PostList({ posts }) {
  return (
    <section className="container mx-auto">
      <div className="mt-4 grid grid-cols-3 gap-4">
        {posts && posts.map((post) => <PostItem key={post._id} post={post} />)}
      </div>
    </section>
  );
}

export default PostList;
