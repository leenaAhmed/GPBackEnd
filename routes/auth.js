const router = require('express').Router()
const {protect} = require('../middleware/auth')
const {
register ,
login ,
getMe ,
forgotpassword} 
= require('../controllers/auth')

// get
router.post('/register' ,register)
router.post('/login' ,login)
router.get('/me' , protect,getMe)
router.post('/forgotpassword' , forgotpassword)


module.exports = router ;
