/*
 * @Autor: 杜庚辰
 * @Desc: 
 * @Date: 2021-01-11 20:01:49
 */
const {resolve} = require("path");
const miniCssExtractPlugin = require("mini-css-extract-plugin")
const optimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin")

//定义nodejs的环境变量，决定使用browserslist的哪个环境
process.env.NODE_ENV="development";

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
            }
        ]
    },
    plugins:[
        new miniCssExtractPlugin({
            filename:'css/built.css'
        }),
        new optimizeCssAssetsWebpackPlugin(),
        
    ],
    mode:"production"
}