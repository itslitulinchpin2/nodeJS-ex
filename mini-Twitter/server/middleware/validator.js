import { body, param, validationResult } from 'express-validator';

export const validate = (req,res,next)=>{
    //valdationResult 또한 express-validator 라이브러리
    
    const errors = validationResult(req);
    
    if(errors.isEmpty()){
        console.log('no errors!')
        next();
    }
    else {
    console.log('errors: ',errors)
    return res.status(400).json({message: errors.array()[0].message});
    }
}