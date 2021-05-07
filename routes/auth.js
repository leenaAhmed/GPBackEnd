const router = require('express').Router()
const {protect} = require('../middleware/auth')
const {
register ,
login ,
getMe ,
forgotpassword ,
resetPassword ,
updateDetails ,
updatePassword
} 
= require('../controllers/auth')

// get
router.post('/register' ,register)
router.post('/login' ,login)
router.get('/me' , protect,getMe)
router.put('/updateDetails' , protect,updateDetails)
router.put('/updatePassword' , protect,updatePassword)
router.post('/forgotpassword' , forgotpassword)
router.put('/resetpassword/:resettoken' , resetPassword)



module.exports = router ;
