import axios from 'axios'

// 自定义配置
const configs = {
    baseURL: '/api',
    headers:{ }
}

export default {
    get(url, payload={}){
        const { params={}, headers={} } = payload
        // 请求头部中加入token
        configs.headers.Authorization = localStorage?localStorage.blogToken:''
        // 自定义头加入默认头部
        Object.keys(headers).forEach(key => configs.headers[key]=headers[key])
        return axios({
            method: 'get',
            url,
            params,
            ...configs
        })
    },
    post(url, payload={}){
        const { params={}, data={}, headers={} } = payload
        // 请求头部中加入token
        configs.headers.Authorization = localStorage?localStorage.blogToken:''
        Object.keys(headers).forEach(key => configs.headers[key]=headers[key])
        return axios({
            method:'post',
            url,
            params,
            data,
            ...configs
        })
    }
}

