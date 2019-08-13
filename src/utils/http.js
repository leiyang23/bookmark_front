import axios from 'axios'
import qs from 'qs'

//  常规设置
const http = axios.create({
  baseURL:'http://localhost:10086',
  headers:{
    // 'content-type':'application/json'
  }
});
//  post请求拦截器：将post参数编码
http.interceptors.request.use((req) => {
  if (req.method === 'post') {
    req.data = qs.stringify(req.data);
  }
  return req;
}, (error) => Promise.reject(error));

export default {
  http:http
}