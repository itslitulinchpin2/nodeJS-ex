const fs = require('fs');

//이름 변경시 3가지 방식이 존재.
//rename(...,callback(error,data))
//try {renameSync(....)} catch(e){} ->안쓰는게 좋음
//promises.rename().then().catch(0)


//동기적 실행, 가급적 쓰지 말자.
try {
    fs.renameSync('./text.txt', './text-new.txt');    
} catch(error) {
    console.error(error);
}
console.log('에러처리 후 출력 가능!');


//비동기적 방식으로 

fs.rename('./text-new.txt', './text.txt', (error)=>{
        console.log(error);
})
console.log('hello!');

//프로미스를 사용하는 방식
fs.promises.rename('./text-new.txt', './text.txt')
    .then(()=>{
        console.log('Done!');
    })
    .catch(console.error)