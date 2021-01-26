import count from "./count";

console.log('index.js加载了~ ');
import('./add.js').then(({ default: add }) => {
    console.log('add(1,2) :>> ', add(1, 2));
})

console.log('count(6,1) :>> ', count(6, 1));