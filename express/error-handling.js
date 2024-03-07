import express from 'express';
import fs from 'fs';
import fsAsync from 'fs/promises';

const app = express();


//모든 경로에 대해 express의 json을 사용한다.
app.use(express.json());

app.get('/file', (req,res)=>{
    fs.readFile('/file1.txt', (err,data)=>{
        if(err){
            
            res.sendStatus(404);
        }
    });
})

app.get('/file1',(req,res)=>{
    try{
    const data = fs.readFileSync('/file1.txt');
    res.send(data);
    } catch (error){
        res.sendStatus(404)
    }
})

app.get('/file2', (req,res)=>{
    fsAsync
        .readFile('/file2.txt')
        .then((data) => res.send(data))
        .catch((error)=> res.sendStatus(404));
    
});

app.get('/file3', async (req,res)=>{

    try {
    const data = await fsAsync.readFile('/file2.txt');
    res.send(data);
    } catch (error){
        res.sendStatus(404);
    }
})

app.use((error,req,res,next)=>{
    console.error(error);
    res.status(500).json({message: 'Something went wrong'});
})

app.listen(8080);

