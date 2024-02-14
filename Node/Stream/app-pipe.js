const fs = require('fs');
//압축모듈
const zlib = require('zlib');

const readStream = fs.createReadStream('./file.txt');
const zlibStream = zlib.createGzip();
const writeStream = fs.createWriteStream('./file3.txt');

//파이핑 두번, zlib을 통해 압축된 버전이 writeStream에 써짐
const piping = readStream.pipe(zlibStream).pipe(writeStream);

piping.on('finish', ()=>{
    console.log('done!');
})
