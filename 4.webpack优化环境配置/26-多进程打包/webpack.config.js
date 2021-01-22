const {resolve} = require("path");
const miniCssExtractPlugin = require("mini-css-extract-plugin")
const optimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin")
const htmlWebpackPlugin = require("html-webpack-plugin");
const workboxWebpackPlugin = require("workbox-webpack-plugin");

//定义nodejs的环境变量，决定使用browserslist的哪个环境
process.env.NODE_ENV="development";
/**
 * PWA：渐进式网络开发应用程序（离线可访问）
 *  workbox --> workbox-webpack-plugin
 */
const commonCssLoader = [
    miniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        //还需要在package.json中定义browserslist
                        loader:"postcss-loader",
                        options:{
                            ident:'postcss',
                            plugins:()=>{
                                require('postcss-preset-env')()
                            }
                        }
                    }
]
module.exports={
    entry:"./src/js/index.js",
    output:{
        filename:"js/built.[contenthash:10].js",
        path:resolve(__dirname,"build")
    },
    module:{
        rules:[
                {
                    test:/\.css$/,
                    use:[
                        ...commonCssLoader
                    ]
                },{
                    test:/\.less$/,
                    use:[
                        ...commonCssLoader,
                        'less-loader'
                    ]
                },{
                    test:/\.js$/,
                    exclude:/node_modules/,
                    use:[
                        /**
                         * 开启多进程打包
                         * 进程启动大概为600ms，进程通信也有开销。
                         * 只有工作消耗时间比较成，才需要多进程打包
                         */
                        {
                            loader:"thread-loader",
                            options:{
                                workers:2//进程2个
                            }
                        },
                        {
                            loader:'babel-loader',
                            options:{
                                presets:[
                                    [
                                        "@babel/preset-env",
                                        {
                                            useBuiltIns:'usage',
                                            corejs:{
                                                version:3
                                            },
                                            targets:{
                                                chrome:'60',
                                                firefox:'50',
                                                ie:'7',
                                                safari:'8'
                                            }
                                        }
                                    ]
                                ],
                                //开启babel缓存
                                //第二次构建，会读取之前的缓存
                                cacheDirectory:true
                            }
                        }
                    ]
                },{
                    test:/\.(jpg|png|gif)/,
                    loader:'url-loader',
                    options:{
                        limit:20 * 1024,
                        name:"[hash:10].[ext]",
                        outputPath:"imgs"
                    }
                },{
                    test:/\.html$/,
                    loader:'html-loader'
                },{
                    exclude:/\.(js|css|less|jpg|png|html|gif)/,
                    loader:'file-loader',
                    options:{
                        outputPath:"media"
                    }
                }
            ]
    },
    plugins:[
        new miniCssExtractPlugin({
            filename:'css/built.[contenthash:10].css'
        }),
        new optimizeCssAssetsWebpackPlugin(),
        new htmlWebpackPlugin({
            template:"./src/index.html",
            minify:{
                collapseWhitespace:true,
                removeComments:true
            }
        }),
        new workboxWebpackPlugin.GenerateSW({
            clientsClaim:true,
            skipWaiting:true
        })
    ],
    mode:"production",
    devtool:"source-map"
}