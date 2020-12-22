import client from './client';

export const writeCommentApi = (form) => {
  return client.post('/api/comment', form);
};

export const getCommentsApi = (postId) => {
  return client.get(`/api/comment/${postId}`);
};

export const deleteCommentApi = (commentId) => {
  return client.delete(`/api/comment/${commentId}`);
};
