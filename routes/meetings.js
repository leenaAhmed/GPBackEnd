const router = require("express").Router();
const Meetings = require("../models/Meetings");
const {
  getMeetings,
  creatMeeting,
  getSingleUser,
  deleteMeeting,
  updateMeeting,
  creatMeetingNow,
  uploadHandler,
  addUsers,
  UpdateStatus,
  UpdateRcordUrl,
} = require("../controllers/meetings");
const { protect } = require("../middleware/auth");
const results = require("../middleware/results");
// get all meetings

router
  .route("/")
  .get(protect, getMeetings)
  .post(protect, uploadHandler, creatMeeting);

router.route("/meetingNow").post(protect, creatMeetingNow);

router
  .route("/:id")
  .get(getSingleUser)
  .put(protect, updateMeeting)
  .delete(protect, deleteMeeting);

router.route("/:id/status").put(UpdateStatus);

router.route("/:id/addusers").put(addUsers);

router.route("/:id/addusers").put(UpdateRcordUrl);

module.exports = router;
