const router = require('express').Router()
const Meetings = require('../models/Meetings')
const {
    getMeetings ,
    creatMeeting ,
    getSingleMeetings ,
    deleteMeeting ,
    updateMeeting ,
    creatMeetingNow ,
    uploadHandler ,
    afterUploadFile
} = require('../controllers/meetings')
const {protect} = require('../middleware/auth')
const results =require('../middleware/results')
// get all meetings
router
    .route('/')
    .get(results(Meetings),getMeetings)
    .post(protect ,creatMeeting ) 
 
router.route('/meetingNow').post(creatMeetingNow)

console.log(uploadHandler)
router
    .route('/:id')
    .get(getSingleMeetings)
    .put(protect ,updateMeeting)
    .delete(protect ,deleteMeeting)

module.exports = router ;