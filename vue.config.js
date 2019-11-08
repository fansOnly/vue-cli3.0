/* eslint-disable no-undef */
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
    publicPath: './',
    productionSourceMap: process.env.NODE_ENV === 'development' ? true : false,
    devServer: {
        // proxy: 'http://localhost:9000',
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
    configureWebpack: {
        plugins: [
            new BundleAnalyzerPlugin(),
        ]
    }
}