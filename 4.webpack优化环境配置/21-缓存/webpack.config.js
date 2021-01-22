const {resolve} = require("path");
const miniCssExtractPlugin = require("mini-css-extract-plugin")
const optimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin")
const htmlWebpackPlugin = require("html-webpack-plugin")
//定义nodejs的环境变量，决定使用browserslist的哪个环境
process.env.NODE_ENV="development";
/**
 * 缓存：
 *     babel缓存：
        cacheDirectory:true
        ---->让第二次打包构建速度更快
 *     文件资源缓存：
            hash:每次webpack构建时会生成一个唯一的hash值。
                问题：因为js和css同时使用一个hash值；
                    如果重新打包，会导致所有缓存实效。（可能是我只改动一个文件）
            chunkhash:根据chunk生成的hash值。如果打包来源于同一个chunk，那么hash值就不一样
                问题：js和css的hash值还是一样的
                    因为css是在js中引入的，所以同属于一个chunk
            contenthash:根据文件内容生成的hash值。不同文件hash值一定不一样。
            ---->让代码上线运行缓存更好使用
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
        })
    ],
    mode:"production",
    devtool:"source-map"
}