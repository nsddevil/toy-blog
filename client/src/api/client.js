import axios from 'axios';

const getToken = () => {
  const storage = JSON.parse(localStorage.getItem('toy-blog'));

  return storage && storage.token ? storage.token : '';
};

const client = axios.create();

client.interceptors.request.use((config) => {
  config.headers.authorization = getToken();
  return config;
});

export default client;
