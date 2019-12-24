/* eslint-disable no-undef */
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// const { SkeletonPlugin } = require('page-skeleton-webpack-plugin')

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
    css: {
        loaderOptions: {
            css: {},
            less: {
                javascriptEnabled: true
            },
            postcss: {}
        }
    },
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            config.plugins.push(new BundleAnalyzerPlugin());
        }
        // config.plugins.push(
        //     new SkeletonPlugin({
        //         pathname: path.resolve(__dirname, './shell'), // 用来存储 shell 文件的地址
        //         staticDir: path.resolve(__dirname, './dist'), // 最好和 `output.path` 相同
        //         routes: ['/admin',], // 将需要生成骨架屏的路由添加到数组中
        //     })
        // )
    },
    chainWebpack: config => {
        config.plugin('html')
            .tap(options => {
                options[0].title = 'Rare Ant Technology Co., Ltd'
                return options
            })
    }
}