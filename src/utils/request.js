import axios from 'axios';

const instance = axios.create({
  timeout: 5000 // 超时时间 5s
});

// 增加请求拦截器
instance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 增加响应拦截器
instance.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    console.log(error.response);
    return Promise.reject(error);
  }
);

function request(url, config = {}) {
  return instance(url, config);
}

export default request;
