const {resolve} = require("path");
const miniCssExtractPlugin = require("mini-css-extract-plugin")
const optimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin")
const htmlWebpackPlugin = require("html-webpack-plugin")
//定义nodejs的环境变量，决定使用browserslist的哪个环境
process.env.NODE_ENV="development";
/**
 * 正常来讲，一个文件只能被一个loader处理；
 * 当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序；
 *  先执行eslint再执行babel
 *       enfore:"pre" 优先执行
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
        filename:"js/built.js",
        path:resolve(__dirname,"build")
    },
    module:{
        rules:[
            //同一类型的文件放在这里
            //...
            {
                //以下loader只会匹配一个
                //注意：不能有两个配置处理同一类型的文件
                oneOf:[
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
                            ]
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
            }
        ]
    },
    plugins:[
        new miniCssExtractPlugin({
            filename:'css/built.css'
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
    mode:"production"
}