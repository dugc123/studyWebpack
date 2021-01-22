const {resolve} = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin")

module.exports={
    entry:"./src/js/index.js",
    output:{
        //[name]：取文件名
        filename:"js/[name].js",
        path:resolve(__dirname,"build")
    },
    module:{
        rules:[
                {
                    test:/\.js$/,
                    exclude:/node_modules/,
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
    },
    plugins:[
        new htmlWebpackPlugin({
            template:"./src/index.html",
            minify:{
                collapseWhitespace:true,
                removeComments:true
            }
        })
    ],
    mode:"production",
    /**
     * 1、可以将node_modules中代码单独打包一个chunk最终输出
     * 2、自动分析多入口chunk中，有没有公共的文件。如果有会打包成单独一个chunk
     */
    optimization:{
        splitChunks:{
            chunks:'all'
        }
    }
}