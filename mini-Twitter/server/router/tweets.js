import express from 'express';
import 'express-async-error';
import { body, param, validationResult } from 'express-validator';
import * as tweetRepository from '../data/tweet.js'
import * as tweetController from '../controller/tweet.js'
import {validate} from '../middleware/validator.js';
//GET /tweets
//GET /tweets?username=:username
//GET /tweets/:id
//POST /tweets
//PUT /tweets/:id
//DELETE /tweets/:id

const router = express.Router();
const validateTweet = [
    body('text')
        .trim()
        .isLength({min:3})
        .withMessage('text should be at least 3 characters')
    ,validate
    ]

//주의! 라우터의 두번째 인자에서 함수를 호출하는 것이 아니라,
//그냥 함수명을 전달해야 함.
//;를 붙이면 안된다!

router.get('/', tweetController.getTweets);

router.get(`/:id`, tweetController.getTweet);

router.post('/', validateTweet,tweetController.createTweet)

router.put(`/:id`, validateTweet, tweetController.updateTweet)

router.delete(`/:id`, tweetController.deleteTweet)

export default router;