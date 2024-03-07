import express from 'express';
const app = express();

app.get('/', (req,res,next)=>{
    console.log('get');
    res.send('The great start!')
    }
);

app.listen(8080);

