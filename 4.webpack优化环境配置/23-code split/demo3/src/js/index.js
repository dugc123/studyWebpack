function sum(...args){
    return args.reduce((a,b)=>a+b,0)
}
/**
 * 通过js代码，让某个文件单独打包成一个chunk
 * import动态导入语法：能将某个文件单独打包
 */
import(/* webpackChunkName:'test'*/'./test').then(({reduce})=>{
    console.log('result :>> ', reduce(3,2));
}).catch(()=>{
    console.log('文件加载失败！');
})

console.log(sum(1,2,3,4,5))