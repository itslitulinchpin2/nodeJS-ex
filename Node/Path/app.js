//운영체제별로(맥, 윈도우) path 표기법이 다르니 유의하자!

const path = require('path')

console.log(__dirname);
console.log(__filename);

//basename

console.log(path.basename(__filename));
console.log(path.basename(__filename,'.js'));

//dirname
console.log(path.dirname(__filename));

//extension
console.log(path.extname(__filename));

//parse
const parsed = path.parse(__filename);
console.log(parsed);

const str = path.format(parsed);
console.log(str);

//isAbsolute
console.log('isAbsolute?', path.isAbsolute(__dirname));
console.log('isAbsolute?', path.isAbsolute('../'));

//normalize, 경로를 알아서 고쳐줌
console.log(path.normalize('./folder/////sub'));

//join
console.log(__dirname + path.sep + 'image');
console.log(path.join(__dirname, 'image'));