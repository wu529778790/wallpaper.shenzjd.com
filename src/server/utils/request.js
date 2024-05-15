import axios from "axios";

const request = axios.create({
    baseURL: '/',
})

// 添加请求拦截器
request.interceptors.request.use((config) => {
    return config;
}, (error) => {
    return Promise.reject(error);
})

// 添加响应拦截器
request.interceptors.response.use((response) => {
    if (response.status === 200) {
        if (response.config.allResponse) {
            return response
        }
        return response.data
    }
    return response;
}, (error) => {
    console.error(error)
    return Promise.reject(error);
})

export default request