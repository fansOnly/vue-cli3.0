/* eslint-disable no-undef */
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
    publicPath: './',
    productionSourceMap: process.env.NODE_ENV === 'development' ? true : false,
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:9000',
                ws: false,
                chainOrigin: true, // 跨域
                pathRewrite: {
                    '^api': '/'
                }
            }
        }
    },
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            config.plugins.push(new BundleAnalyzerPlugin());
        }
    },
    chainWebpack: config => {
        config.plugin('html')
            .tap(options => {
                options[0].title = 'Rare Ant Technology Co., Ltd'
                return options
            })
    }
}