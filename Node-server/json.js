const http = require('http');
const fs = require('fs');

const name = 'lee';
const courses = [
    {name: 'HTML'},
    {name: 'CSS'},
    {name: 'JS' }
];

const server = http.createServer((req,res)=>{
    console.log('incoming...');

    const url = req.url; //what?
    const method = req.method; //action?

    if (url==='/courses'){
        if(method==='GET'){
            res.writeHead(200, {'Content-Type':'application/json'})
            res.end(JSON.stringify(courses)); //converts JavaScript objects into strings.
        } else if (method ==='POST'){
            const body = [];
            req.on('data', (chunk) => {
                console.log(chunk);
                body.push(chunk);
            })

            req.on('end', ()=>{
                const bodyStr = Buffer.concat(body).toString()
                const course = JSON.parse(bodyStr);
                courses.push(course);
                console.log(course);

                res.writeHead(201);
                res.end();
            })
        
        }
    }

 
    }
)

server.listen(8080);