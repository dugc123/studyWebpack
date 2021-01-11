/*
 * @Autor: 杜庚辰
 * @Desc: 
 * @Date: 2021-01-11 16:12:57
 */
const add=(x, y)=> {
    return x + y;
}

console.log('add(2,3) :>> ', add(2, 3));

const promise = new Promise((resolve)=>{
    setTimeout(() => {
        console.log('定时器执行完了~');
        resolve()
    }, 1000);
})
console.log('promise :>> ', promise);