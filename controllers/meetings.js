const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Meeting = require("../models/Meetings");
const User = require("../models/user");
const multer = require("multer");

exports.getMeetings = asyncHandler(async (req, res, next) => {
  await Meeting.updateMany(
    { startDateTime: { $lt: new Date(Date.now()) } },
    { isExpaired: true }
  ).sort({ createdAt: -1 });

  res.status(200).json(res.results);
});
//
exports.UpdateMeetingData = asyncHandler(async (req, res, next) => {
  const users = await Meeting.findOneAndUpdate(
    { _id: req.body.id },
    {
      $push: { participent: userName },
    }
  );
  res.status(200).json({
    success: true,
    data: users,
  });
});

exports.getSingleMeetings = asyncHandler(async (req, res, next) => {
  const meeting = await Meeting.findById(req.params.id);
  console.log(req.body.createdBy);

  if (!meeting) {
    return next(
      new ErrorResponse(`this meeting not found with id ${req.params.id}`, 404)
    );
  }
  console.log(req.body.createdBy);

  res.status(200).json({
    success: true,
    data: meeting,
  });
});
const filestorageEngine = multer.memoryStorage();
const upload = multer({ storage: filestorageEngine });

exports.uploadHandler = upload.single("file");

exports.creatMeeting = asyncHandler(async (req, res, next) => {
  const meeting = await Meeting.create(req.body);

  if (req.file) {
    await Meeting.updateMany({ _id: meeting._id }, { file: req.file.buffer });
  }
  const { startDateTime } = req.body;

  const expairedDate = Date.parse(startDateTime);
  if (expairedDate < Date.now()) {
    return next(
      new ErrorResponse(`this is expaired date inter inavlid date`, 400)
    );
  }
  console.log(req.body.createdBy);

  res.status(200).json({
    success: true,
    msg: "creat meetings",
    data: meeting,
  });
});

exports.deleteMeeting = asyncHandler(async (req, res, next) => {
  const meeting = await Meeting.findByIdAndDelete(req.params.id);
  if (!meeting) {
    return next(
      new ErrorResponse(`this meeting not found with id ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: {},
  });
});

exports.updateMeeting = asyncHandler(async (req, res, next) => {
  const meeting = await Meeting.findByIdAndUpdate(
    req.params.id,
    { $push: { participent: userName } },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!meeting) {
    return next(
      new ErrorResponse(`this meeting not found with id ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: meeting,
  });
});

exports.creatMeetingNow = asyncHandler(async (req, res, next) => {
  const meeting = await Meeting.create({
    name: req.body.name,
  });

  res.status(200).json({
    success: true,
    msg: "creat meetings now",
    data: meeting,
  });
});
