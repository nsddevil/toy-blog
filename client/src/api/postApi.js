import client from './client';

export const uploadImgApi = (form) => {
  return client.post(`/api/upload`, form);
};

export const addPostApi = (form) => {
  return client.post(`/api/post`, form);
};

export const deleteImgApi = (imgName) => {
  return client.delete(`/api/upload/${imgName}`);
};
