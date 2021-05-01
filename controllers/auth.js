const ErrorResponse = require('../utils/errorResponse')
const asyncHandler =require('../middleware/async')
const User = require('../models/user');

// @desc      register
// @route     GET /api/v1/auth/register
// @access    puplic
exports.register = asyncHandler(async (req ,res , next) =>{
    const { name, email, password, phone } = req.body;

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      phone
    });
   // creat token
   const token = user.getSignJwtToken()

    res.status(200).json({
        sucsees: true ,
        token
    })
});


// @desc      log in 
// @route     GET /api/v1/auth/login 
// @access    puplic
exports.login = asyncHandler(async (req ,res , next) =>{
    const { email, password } = req.body;

    // valide the user and passwords 
     if(!email || !password){
        return  next(new ErrorResponse('please provide email & password' , 400));
    }
    const user =  await User.findOne({email}).select('+password')

    if(!user){
        return  next(new ErrorResponse('Invalid user', 401));
    }
    // check if password matches 
    const isMatch = await user.matchPassword(password);
    if(!isMatch){
        return  next(new ErrorResponse('Invalid user', 401));
    }

    
    const token = user.getSignJwtToken()
    res.status(200).json({
        sucsees: true ,
        token
    })
});