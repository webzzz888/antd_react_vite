import axios from 'axios'
import {message} from 'antd'

// create an axios instance
const service = axios.create({
  baseURL: 'http://192.168.3.70:8080/', // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('token')
    if (token) {
      config.headers['Token'] = token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    console.log(response,'axios')
    const res = response.data
    

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 0) {
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if(res.code === 401){
        return message.error('token过期，请重新登录')
      }

      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    
    return Promise.reject(error)
  }
)

export default service

