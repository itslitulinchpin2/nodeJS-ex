import express from 'express';
import 'express-async-error';
import {body} from 'express-validator';
import {validate} from '../middleware/validator.js';
import * as authController from '../controller/auth.js'

const router = express.Router();

const validateCredential = [
    body('username')
    .trim()
    .notEmpty()
    .withMessage('username should be at least 5 characters'),
    body('password')
    .trim()
    .isLength({min:5})
    .withMessage('password should be at least 5 characters'),
    validate
]


const validateSignup = [
    ...validateCredential,
    body('name').notEmpty().withMessage('name is missing'),
    body('email').isEmail().normalizeEmail().withMessage('invalid email'),
    body('url')
        .isURL()
        .withMessage('invalid URL')
        .optional({nullable:true, checkFalsy:true}),
]

router.get('/me',(req,res,next) => {})

router.post('/signup', validateSignup, authController.signup)

router.post('/login', validateCredential, authController.login);
// router.post('/signup', (req,res,next) => {
//     const {username,password,name,eamil,url} = req.body;
//     const signupInfo = function(username,password,name,eamil,url){
//         return {username,password,name,eamil,url}
//     };

//     res.sendStatus(201).json(signupInfo);

// });



// router.post('/login', (req,res,next) => {
//     const {username, password} = req.body;
//     const user = function(username,password){
//         return {username,password}
//     }
//     res.sendStatus(201).json(user)
// })

export default router;