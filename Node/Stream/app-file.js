const fs = require('fs');

//현재 메모리 상태를 저정
const beforeMem = process.memoryUsage().rss;

fs.readFile('./file.txt', (_,data)=>{
    fs.writeFile('./file2.txt', data, ()=>{});

    //calculate (읽어서 쓰고 난 후의 메모리 사용량)
    const afterMem = process.memoryUsage().rss;
    const diff = afterMem - beforeMem;
    const consumed = diff / 1024 / 1024;
    console.log(diff);
    console.log(`Consumed Memory: ${consumed}MB`)
});