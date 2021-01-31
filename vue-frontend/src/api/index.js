import axios from 'axios';

const api = axios.create({
  'baseURL': process.env.VUE_APP_BASE_URL + process.env.VUE_APP_API_PATH,
});

export default api;