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
    console.log('url: ', url);
    const method = req.method; //action?
    console.log('method: ', method);

    if (url==='/courses'){

        if(method==='GET'){
            res.writeHead(200, {'Content-Type':'application/json'})
            res.end(JSON.stringify(courses)); //객체를 JSON으로
        }
        else if (method ==='POST'){

            const body = [];

            req.on('data', (chunk) => {
                console.log(chunk);
                body.push(chunk);
            })

            req.on('end', ()=>{

                const bodyStr = Buffer.concat(body).toString()
                const course = JSON.parse(bodyStr); // JSON을 객체로
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