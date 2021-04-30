const router = require('express').Router()
const {
    getAllMeetings ,
    creatMeeting ,
    getSingleMeetings ,
    deleteMeeting ,
    updateMeeting ,
} = require('../controllers/meetings')
// get all meetings
router
    .route('/')
    .get(getAllMeetings)
    .post(creatMeeting) 

router
    .route('/:id')
    .get(getSingleMeetings)
    .put(updateMeeting)
    .delete(deleteMeeting)

module.exports = router ;