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
    joinMeeting ,
    GenerateInvetion
} = require('../controllers/meetings')
const {protect} = require('../middleware/auth')
const results =require('../middleware/results')
// get all meetings
router
    .route('/')
    .get(results(Meetings),getMeetings)
    .post(protect , uploadHandler,creatMeeting ) 
 
router.route('/meetingNow').post(creatMeetingNow)

router.route('/:id').get(joinMeeting)

router
    .route('/:id')
    .get(getSingleMeetings)
    .put(protect ,updateMeeting)
    .delete(protect ,deleteMeeting)

module.exports = router ;