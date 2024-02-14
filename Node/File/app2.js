const fs = require('fs').promises;

//여기서는 모두 프로미스이므로 순차적 실행 보장x
//순차적 실행을 원한다면 then을 사용하자.

//read a file
fs.readFile('./text.txt','utf-8')
    .then((data)=>console.log(data))
    .catch(console.error);

//write a file (덮어쓰기)
fs.writeFile('./text.txt', 'Wesh!')
    .catch(console.error);

//기존 파일에 추가 : append a file
fs.appendFile('./text.txt', 'bruuu')
    .then(()=>{
        fs.copyFile('./text.txt', './text2.txt')
        .catch(console.error);
    })
    .catch(console.error);

//copy 
//하지만 전체가 비동기적으로 처리되므로 then을 사용하는 것이 바람직.
// fs.copyFile('./text.txt', './text2.txt')
//     .catch(console.error);

//folder
fs.mkdir('sub-folder')
    .catch(console.error);

fs.readdir('./')
    .then(console.log)
    .catch(console.error);