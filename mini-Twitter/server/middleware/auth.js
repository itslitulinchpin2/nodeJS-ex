import jwt from 'jsonwebtoken';
import * as userRepository from '../data/auth.js';

const AUTH_ERR = {message: 'Authentication Error'};

export const isAuth = async (req,res,next) => {
    const authHeader = req.get('Authorization'); //Authorization은 key로 명시돼있음
    if(!(authHeader && authHeader.startswith('Bearer '))){
        return res.status(401).json(AUTH_ERR);
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        'F2dN7x8HVzBWaQuEEDnhsvHXRWqAR63z',
        async (error, decoded)=>{
        if(error){
            return res.status(401).json(AUTH_ERR);
        }
        const user = await userRepository.findById(decoded.id);
        if(!user){
            return res.status(401).json(AUTH_ERR);
        }
        req.userId = user.id; //req.cusomData를 등록
        next();
        })
};