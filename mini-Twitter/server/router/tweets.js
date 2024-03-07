import express from 'express';
import 'express-async-error';

//GET /tweets
//GET /tweets?username=:username
//GET /tweets/:id
//POST /tweets
//PUT /tweets/:id
//DELETE /tweets/:id

const router = express.Router();

let tweets = [
    {
        id:'1',
        text:"아 백엔드도 매우 어렵구나",
        createdAt: Date.now().toString(),
        name:'Lee',
        username:'lee',
        url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png'
    },
    {
        id:'2',
        text:"아 프론트엔드도 매우 어렵구나",
        createdAt: Date.now().toString(),
        name:'Kim',
        username:'kim',
        url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png'
    }
]

router.get('/',(req,res,next)=>{
    
    const username = req.query.username;
    const data = username 
    ? tweets.filter(t => t.username===username) 
    : tweets;
     
    res.status(200).json(data)
}
)

router.get(`/:id`, (req,res,next) => {
    const id = req.params.id;
    const data = tweets.find(t=>t.id===id);
    if(data){
        res.status(200).json(data);
    } else{
        res.status(404).json({message: `Tweet id: ${id} not found`});
    }
    
    
})

router.post('/', (req,res,next) => {
    const {text, name, username} = req.body;
    const tweet={
        id:Date.now().toString(),
        text,
        createdAt: new Date(),
        name,
        username
    }
    tweets=[tweet, ...tweets];
    res.status(201).json(tweet)
})

router.put(`/:id`, (req,res,next) => {
    const id = req.params.id;
    const text = req.body.text;
    const tweet = tweets.find((t)=>t.id===id);
    if(tweet){
        tweet.text=text;
        res.status(200).json(tweet);
    } else{
        res.status(404).json({message: `Tweet id: ${id} not found`});
    }

    
})

router.delete(`/:id`, (req,res,next) => {
    const id = req.params.id;
    const data = tweets.filter(t=>t.id!==id);
    res.sendStatus(204);

    
})

export default router;