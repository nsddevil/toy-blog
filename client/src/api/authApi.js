import client from './client';

export const singupApi = (form) => {
  return client.post(`/api/user/signup`, form);
};

export const singinApi = (form) => {
  return client.post(`/api/user/signin`, form);
};
