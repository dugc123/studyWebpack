const {resolve} = require("path")
const htmlWebpackPlugin = require("html-webpack-plugin")

module.exports={
    entry:"./src/js/index.js",
    output:{
        filename:"js/[name].js",
        path:resolve(__dirname,'build')
    },
    module:{
        rules:[
            {   
                test:/\.css$/,
                use:['style-loader','css-loader']
            }
        ]
    },
    plugins:[
        new htmlWebpackPlugin()
    ],
    mode:"development",
    resolve:{
        //配置解析模块路径别名：有点简写路径
        alias:{
            "@css":resolve(__dirname,"src/css")
        },
        //配置省略文件路径的后缀名
        extensions:['.js','.json','.css'],
        modules:[resolve(__dirname,"../../node_modules"),"node_modules"]
    }
}