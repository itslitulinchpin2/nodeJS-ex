import express from 'express';
import 'express-async-error';
import * as tweetRepository from '../data/tweet.js'
import * as tweetController from '../controller/tweet.js'
//GET /tweets
//GET /tweets?username=:username
//GET /tweets/:id
//POST /tweets
//PUT /tweets/:id
//DELETE /tweets/:id

const router = express.Router();

//주의! 라우터의 두번째 인자에서 함수를 호출하는 것이 아니라,
//그냥 함수명을 전달해야 함.
//;를 붙이면 안된다!

router.get('/', tweetController.getTweets);

router.get(`/:id`, tweetController.getTweet);

router.post('/', tweetController.createTweet)

router.put(`/:id`, tweetController.updateTweet)

router.delete(`/:id`, tweetController.deleteTweet)

export default router;