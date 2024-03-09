import { body, param, validationResult } from 'express-validator';

export const validate = (req,res,next)=>{
    //valdationResult 또한 express-validator 라이브러리
    
    const errors = validationResult(req);
    
    if(errors.isEmpty()){
        next();
    }

    return res.status(400).json({message: errors.array()[0].msg});
    
}