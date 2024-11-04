const webpack = require('webpack');
const {defineConfig} = require('@vue/cli-service');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
module.exports = defineConfig({
    productionSourceMap: false,
    transpileDependencies: true,
    publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
    configureWebpack: {
        plugins: [
            new NodePolyfillPlugin(),
            new webpack.ProvidePlugin({
                process: 'process/browser',
            }),
        ],
        resolve: {
            fallback: {
                "fs": false,
                "net": false,
                "dns": false,
                "tls": false,
                "os": false,
                "dgram": false,
                "stream": false,
            }
        },
        performance: {
            hints: 'warning',
            //入口起点的最大体积 整数类型（以字节为单位）
            maxEntrypointSize: 50000000,
            //生成文件的最大体积 整数类型（以字节为单位 300k）
            maxAssetSize: 500000000
        },
        optimization: {
            splitChunks: {
                cacheGroups: process.env.NODE_ENV !== "production" ? {} : {
                    common: {//commons 一般是是个人定义的
                        name: 'chunk-common', // 打包后的文件名
                        chunks: 'initial',
                        minChunks: 1,
                        maxInitialRequests: 5,
                        minSize: 0,
                        priority: 1,
                        reuseExistingChunk: true
                    },
                    vendors: {//vendor 是导入的 npm 包
                        name: 'chunk-vendors',
                        test: /[\\/]node_modules[\\/]/,
                        chunks: 'initial',
                        maxSize: 600000,
                        maxInitialRequests: 20,
                        priority: 2,
                        reuseExistingChunk: true,
                        enforce: true
                    },
                    elementUI: {//把elementUI从chunk-vendors.js提取出来。当然我们也可以把mixins，vue.min.js等等也按照类似配置提取出来
                        name: 'chunk-element-ui',
                        test: /[\\/]node_modules[\\/]element-ui[\\/]/,
                        chunks: 'initial',
                        priority: 3,
                        maxSize: 600000,
                        reuseExistingChunk: true,
                        enforce: true
                    },
                    mavonEditor: {
                        name: 'chunk-mavon-editor',
                        test: /[\\/]node_modules[\\/]mavon-editor[\\/]/,
                        chunks: 'initial',
                        priority: 3,
                        maxSize: 600000,
                        reuseExistingChunk: true,
                        enforce: true
                    },
                    aceEditor: {
                        name: 'chunk-ace-editor',
                        test: /[\\/]node_modules[\\/]ace-builds[\\/]/,
                        chunks: 'initial',
                        priority: 3,
                        maxSize: 600000,
                        reuseExistingChunk: true,
                        enforce: true
                    },
                    dplayer: {
                        name: 'chunk-dplayer',
                        test: /[\\/]node_modules[\\/]dplayer[\\/]/,
                        chunks: 'initial',
                        priority: 3,
                        maxSize: 600000,
                        reuseExistingChunk: true,
                        enforce: true
                    },
                    vuePDF: {
                        name: 'chunk-vue-pdf',
                        test: /[\\/]node_modules[\\/]vue-pdf-embed[\\/]/,
                        chunks: 'initial',
                        priority: 3,
                        maxSize: 600000,
                        reuseExistingChunk: true,
                        enforce: true
                    },
                    vditor: {
                        name: 'chunk-vditor',
                        test: /[\\/]node_modules[\\/]vditor[\\/]/,
                        chunks: 'initial',
                        priority: 3,
                        maxSize: 600000,
                        reuseExistingChunk: true,
                        enforce: true
                    },
                    wangeditor: {
                        name: 'chunk-wangeditor',
                        test: /[\\/]node_modules[\\/]@wangeditor[\\/]/,
                        chunks: 'initial',
                        priority: 3,
                        maxSize: 600000,
                        reuseExistingChunk: true,
                        enforce: true
                    },
                    quill: {
                        name: 'chunk-wangeditor',
                        test: /[\\/]node_modules[\\/]quill[\\/]/,
                        chunks: 'initial',
                        priority: 3,
                        maxSize: 600000,
                        reuseExistingChunk: true,
                        enforce: true
                    }
                }
            }
        },
    }
})
