import client from './client';
import qs from 'qs';

export const uploadImgApi = (form) => {
  return client.post(`/api/upload`, form);
};

export const addPostApi = (form) => {
  return client.post(`/api/post`, form);
};

export const deleteImgApi = (imgName) => {
  return client.delete(`/api/upload/${imgName}`);
};

export const getPostApi = (postId) => {
  return client.get(`/api/post/${postId}`);
};

export const getPostsApi = (query) => {
  return client.get(`/api/post?${qs.stringify(query)}`);
};

export const deletePostApi = (postId) => {
  return client.delete(`/api/post/${postId}`);
};
