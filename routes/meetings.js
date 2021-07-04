const router = require("express").Router();
const Meetings = require("../models/Meetings");
const {
  getMeetings,
  creatMeeting,
  getJoinUrl,
  deleteMeeting,
  updateMeeting,
  creatMeetingNow,
  uploadHandler,
  addUsers,
  UpdateStatus,
} = require("../controllers/meetings");
const { protect } = require("../middleware/auth");
const results = require("../middleware/results");
// get all meetings
router
  .route("/")
  .get(results(Meetings), getMeetings)
  .post(protect, uploadHandler, creatMeeting);

router.route("/meetingNow").post(creatMeetingNow);

router
  .route("/:id")
  .get(getJoinUrl)
  .put(protect, updateMeeting)
  .delete(protect, deleteMeeting);

router.route("/:id/status").put(UpdateStatus);

router.route("/:id/addusers").put(addUsers);

module.exports = router;
