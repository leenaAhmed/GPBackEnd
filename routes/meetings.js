const router = require('express').Router()
const Meetings = require('../models/Meetings')
const {
    getSechdule ,
    creatMeeting ,
    getSingleMeetings ,
    deleteMeeting ,
    updateMeeting ,
    expirationDate ,
} = require('../controllers/meetings')
const {protect} = require('../middleware/auth')
const results =require('../middleware/results')
// get all meetings
router
    .route('/')
    .get(results(Meetings),getSechdule)
    .post(protect,creatMeeting) 
    
router.get('/expiration' , expirationDate)
router
    .route('/:id')
    .get(getSingleMeetings)
    .put(protect ,updateMeeting)
    .delete(protect ,deleteMeeting)

module.exports = router ;