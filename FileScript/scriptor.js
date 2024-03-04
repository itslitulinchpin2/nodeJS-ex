//계획
//1. 사용자가 원하는 폴더의 이름을 받아온다


const path = require('path');
const os = require('os');
const fs = require('fs');

const folder = process.argv[2]; //result 폴더
const basePath = '/Users/seungmin/Desktop';


const workingDir= path.join(basePath,'nodeJS-ex',folder)

console.log(workingDir);

if(!folder || !fs.existsSync(workingDir)){
    console.error('폴더명을 제대로 입력하세요');
}


//2. 그 폴더안에 원하는 폴더를 만든다.
const videoDir = path.join(workingDir,'video');
const capturedDir = path.join(workingDir,'captured');
const duplicatedDir = path.join(workingDir,'duplicated');


!fs.existsSync(videoDir) && fs.mkdirSync(videoDir);
!fs.existsSync(capturedDir) && fs.mkdirSync(capturedDir);
!fs.existsSync(duplicatedDir) && fs.mkdirSync(duplicatedDir);

//3. 폴더 안에 있는 파일들을 돌면서 해당되는 확장자에 맞게 이동

fs.promises.readdir(workingDir)
    .then(files=>processFiles(files)) // 괄호 속은 그냥 processFiles로도 코딩 수 있음
    .catch(console.log);

function processFiles(files){
    console.log(files);
    console.log('______________________')
    files.forEach(file => {
        if( isVideoFile(file)){
            move(file,videoDir)
        } else if (isCapturedFile(file)){
            move(file,capturedDir)
        } else if (isDuplicatedFile(files,file)){
            move(file,duplicatedDir)
        }
    })
}

function isVideoFile(file){
    const regExp =/(mp4|mov)$/gm
    const match = file.match(regExp);
    return !!match

}

function isCapturedFile(file){
    const regExp =/(png|aae)$/gm
    const match = file.match(regExp);
    return !!match
}

function isDuplicatedFile(files,file){
    //IMG_XXXX -> IMG_EXXX 두 개 확인

    if(!file.startsWith('IMG_') || file.startsWith('IMG_E')){
        return false;
    }
    const edited = `IMG_E${file.split('_')[1]}`;

    const found = files.includes(edited); 

    return !!found;
}

function move(file,targetDir){
    console.info(`move ${file} to ${targetDir}`);

    const oldPath = path.join(workingDir,file);
    const newPath = path.join(targetDir,file);

    fs.promises
    .rename(oldPath,newPath)
    .catch(console.error);

}