const ErrorResponse = require('../utils/errorResponse')
const errorHandler = (err , req ,res ,next)=>{
    let error = {...err} ;
    error.message = err.message ;
    console.log(err)

    // mongoose bad error handeling 
     if(err.name === 'CastError'){
         const message = `this meeting not found with id ${err.value}` ;
         error = new ErrorResponse(message , 404) ;
     }
    // mongoose duplicate key error 
     if(err.code === 11000){
         const message = `duplicate field value entered` ;
         error = new ErrorResponse(message , 400) ;
     }
     // mongoose validation Error 
      if(err.name === 'ValidatorError'){
          const message = Object.values(err.errors).map(val => val.message);
          error = new ErrorResponse(message , 400) ;
      }
     
    res.status(error.statusCode || 500).json({
        sucsees: false ,
        error: error.message || 'server error'
    }) 
}
module.exports = errorHandler