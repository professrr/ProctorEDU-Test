import axios from 'axios';
import store from '@/store'
import router from '@/router'

const api = axios.create({
  'baseURL': process.env.VUE_APP_BASE_URL + process.env.VUE_APP_API_PATH,
});

api.interceptors.request.use( config => {
  const token = store.getters['Auth/getToken']
  token ? config.headers['Authorization'] = 'Bearer ' + token : {}
  return config;
},  error => {
  // Do something with request error
  return Promise.reject(error);
});

api.interceptors.response.use(response => {
  if(response.config.url == '/sign') {
    response.status == 200 ? router.push('/test') : {}
  }
  return response;
}, error => {
  if(error.config.url == '/sign') {
    window.alert(error.response.data.error.statusCode + "; " + error.response.data.message)
  }
  return Promise.reject(error);
});

export default api;