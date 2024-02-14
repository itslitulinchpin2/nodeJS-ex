let count=0;

function increase(){
    count++;
}

function getCount(){
    return count;
}

//module.exports.뒤에 오는 것이 다른 파일에서 사용할 이름.
module.exports.getCount = getCount;
module.exports.increase = increase;