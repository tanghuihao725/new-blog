// vue.config.js
const webpack = require("webpack");

module.exports = {
    // 修改的配置
    // 将baseUrl: '/api',改为baseUrl: '/',
    // baseUrl: '/',
    devServer: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:5000/',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    configureWebpack: {
        externals: {
            'vue': 'Vue',
            'vue-router': 'VueRouter',
            'vuex': 'Vuex',
            'axios': 'axios',
            'element-ui': 'ELEMENT',
            'less':'less'
        },
    }
}