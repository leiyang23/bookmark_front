import axios from 'axios'
import qs from 'qs'

//  常规设置
const http = axios.create({
  // baseURL:'http://localhost:10086',
  baseURL:'http://bookmark-backend.freaks.group',
  // withCredentials: true,
  headers:{
    // 'content-type':'application/json'
  }
});
//  请求拦截器：将post参数编码
http.interceptors.request.use((req) => {
  if (req.method === 'post') {
    req.data = qs.stringify(req.data);
  }
  return req;
}, (error) => Promise.reject(error));
// 响应拦截器
http.interceptors.response.use(
    response => {
      if (response.data.errcode == -66){
        console.error("need login!")
      }
      return response
    },
    error => {
      return Promise.reject(error)
    }
);

export default {
  http:http
}