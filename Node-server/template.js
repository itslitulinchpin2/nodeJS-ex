const http = require('http');
const fs = require('fs');
const ejs = require('ejs');

const name = 'lee';
const courses = [
    {name: 'HTML'},
    {name: 'CSS'},
    {name: 'JS' }
];


const server = http.createServer((req,res)=>{
    console.log('incoming...');


    const url = req.url;

    if(url==='/'){
        
       ejs.renderFile('./template/welcome.ejs', {name})
       .then(data => res.end(data))

    } else if (url==='/courses') {
        ejs.renderFile('./template/courses.ejs', {courses})
        .then(data => res.end(data))
    } else {
        ejs.renderFile('./template/not-found.ejs', {name})
        .then(data => res.end(data))
    }
}
)

server.listen(8080);