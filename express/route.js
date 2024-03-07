import express from 'express';

const app = express();
app.use(express.json())

app
    .route('/posts')
    .get((req,res,next)=>{
        res.status(201).send('GET: /posts');
    })
    .post((req,res,next)=>{
            res.status(201)/send('POST: /posts');
        }
    )
    .put((req,res,next)=>{
        res.status(201)/send('PUT: /posts');
    }
    )
    .delete((req,res,next)=>{
        res.status(201)/send('DELETE: /posts');
    }
    )

// app.get('/posts', (req,res)=>{
//     res.status(201).send('GET: /posts');
// })

// app.post('/posts', (req,res)=>{
//     res.status(201)/send('POST: /posts');
// })


app.listen(8080);