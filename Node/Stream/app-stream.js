const fs = require('fs');


const readStream = fs.createReadStream('./file.txt', {
    //스트림이 한 번에 처리할 수 있는 버퍼 사이즈 결정
    highWaterMark: 8,
    encoding:'utf-8',
});

readStream.on('data', (chunk)=>{
    console.log(chunk)
})

readStream.on('error', console.error);

//체이닝으로 .on으로 계속해서 이어 처리도 가능하다.