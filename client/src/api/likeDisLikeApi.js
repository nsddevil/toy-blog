import client from './client';
import qs from 'qs';

export const getLikesApi = (query) => {
  return client.get(`/api/like?${qs.stringify(query)}`);
};

export const getDisLikesApi = (query) => {
  return client.get(`/api/like/disLike?${qs.stringify(query)}`);
};

export const setLikeApi = (form) => {
  return client.post(`/api/like`, form);
};

export const setDisLikeApi = (form) => {
  return client.post(`/api/like/disLike`, form);
};

export const unLikeApi = (form) => {
  return client.post(`/api/like/unLike`, form);
};

export const unDisLikeApi = (form) => {
  return client.post(`/api/like/unDisLike`, form);
};
