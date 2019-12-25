/* eslint-disable no-undef */
const path = require("path")

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: './',
    outputDir: 'dist',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        overlay: {
            warnings: false,
            errors: true
        },
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
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(options => {
                options[0].title = 'Rare Ant Technology Co., Ltd'
                return options
            })
        config
            .when(process.env.NODE_ENV === 'development',
                config => config.devtool('cheap-source-map')
            )
        config
            .when(process.env.NODE_ENV === 'production',
                config => {
                    config
                        .plugin('BundleAnalyzerPlugin')
                        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
                        .end()
                    // config
                    //     .plugin('SkeletonPlugin')
                    //     .use('page-skeleton-webpack-plugin', [{
                    //         pathname: path.resolve(__dirname, './shell'), // 用来存储 shell 文件的地址
                    //         staticDir: path.resolve(__dirname, './dist'), // 最好和 `output.path` 相同
                    //         routes: ['/admin',], // 将需要生成骨架屏的路由添加到数组中
                    //     }])
                    //     .end()
                }
            )
    }
}