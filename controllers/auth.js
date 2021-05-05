const ErrorResponse = require('../utils/errorResponse')
const asyncHandler =require('../middleware/async')
const sendEmail = require('../utils/sendEmail')
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
    sendTokenResponse(user , 200 , res);

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

    sendTokenResponse(user , 200 , res);
   
});
// @desc      Get current logged in user
// @route     POST /api/v1/auth/me
// @access    Private
exports.getMe = asyncHandler(async(req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc      forgotpassword
// @route     POST /api/v1/auth/forgotpassword
// @access    Private
exports.forgotpassword = asyncHandler(async(req, res, next) => {
  const user = await User.findOne({email:req.body.email})

  if(!user){
    return  next(new ErrorResponse('there is no user with that email', 404));

  }
  // get rest token 
  const resetPassword = user.getResetPasswordToken();
  await user.save({validateBeforeSave: false })
  console.log(resetPassword)
  // Create reset url
  const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/resetpassword/${resetPassword}`;

  const message = `You are receiving this email because you (or someone else)
   has requested the reset of a password: \n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password reset ',
      message
    });
    res.status(200).json({ success: true, data: 'Email sent' });
  } catch (err) {
    console.log(err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorResponse('Email could not be sent', 500));
  }
  res.status(200).json({
    success: true,
    data: user
  });
});
// get token from a user and creat cookies
const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = user.getSignJwtToken();
  
    const options = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true
    };
  
    if (process.env.NODE_ENV === 'production') {
      options.secure = true;
    }
    console.log(token)
    res
      .status(statusCode)
      .cookie('token', token, options)
      .json({
        success: true,
        token
      });
  };