module.exports = {
    publicPath: './',
    productionSourceMap: false,
    devServer: {
        proxy: 'http://localhost:9000',
    }
}