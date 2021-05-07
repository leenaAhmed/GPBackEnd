const router = require('express').Router()
const {
    getAllMeetings ,
    creatMeeting ,
    getSingleMeetings ,
    deleteMeeting ,
    updateMeeting ,
    expirationDate ,
} = require('../controllers/meetings')
const {protect} = require('../middleware/auth')
// get all meetings
router
    .route('/')
    .get(getAllMeetings)
    .post(protect,creatMeeting) 
    
router.get('/expiration' , expirationDate)
router
    .route('/:id')
    .get(getSingleMeetings)
    .put(protect ,updateMeeting)
    .delete(protect ,deleteMeeting)

module.exports = router ;