/*
 * @Autor: 杜庚辰
 * @Desc: 
 * @Date: 2021-01-08 15:23:44
 */

import "../css/iconfont.css"
import "../css/index.less"
import print from "./print";


console.log('indxex.js文件加载了 :>> ');
function add (x,y){
    return x+y;
}

if (module.hot) {
    //一旦module.hot为true,说明开启了HMR功能。-->让HMR功能代码生效
    module.hot.accept("./print.js",function(){
        //方法会监听print.js文件的变化，一旦发生变化，其他模块不会重新打包构建
        //会执行后面的回调函数
        print()
    })
}
console.log('add(1,5) :>> ', add(1,5));