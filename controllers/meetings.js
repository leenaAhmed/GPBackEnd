const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Meeting = require("../models/Meetings");
const User = require("../models/user");
const multer = require("multer");

exports.getMeetings = asyncHandler(async (req, res, next) => {
  query = Meeting.find({ createdBy: req.user._id, isExpaired: false })
    .select("-participent")
    .sort({ startDateTime: -1 });
  await Meeting.updateMany(
    { startDateTime: { $lt: new Date(Date.now()) } },
    { isExpaired: true }
  );

  const meetings = await query;
  res.status(200).json({
    success: true,
    count: meetings.length,
    data: meetings,
  });
});

exports.pastmeetings = asyncHandler(async (req, res, next) => {
  query = Meeting.find({ createdBy: req.user._id, isExpaired: true }).sort({
    startDateTime: -1,
  });

  await Meeting.updateMany(
    { startDateTime: { $lt: new Date(Date.now()) } },
    { isExpaired: true }
  );
  const meetings = await query;

  res.status(200).json({
    success: true,

    count: meetings.length,
    data: meetings,
  });
});
exports.getSingleUser = asyncHandler(async (req, res, next) => {
  const meeting = await Meeting.findById(req.params.id);
  if (!meeting) {
    return next(
      new ErrorResponse(`this meeting not found with id ${req.params.id}`, 404)
    );
  }
  console.log(req.body);
  res.status(200).json({
    success: true,
    data: meeting,
  });
});
const filestorageEngine = multer.memoryStorage();
const upload = multer({ storage: filestorageEngine });

exports.uploadHandler = upload.single("file");

exports.creatMeeting = asyncHandler(async (req, res, next) => {
  const meeting = await Meeting.create({
    ...req.body,
    createdBy: req.user._id,
  });

  if (req.file) {
    const encoded = req.file.buffer.toString("base64");
    await Meeting.updateMany({ _id: meeting._id }, { file: encoded });
  }
  const { startDateTime } = req.body;
  await Meeting.updateMany(
    { startDateTime: { $lt: new Date(Date.now()) } },
    { isExpaired: true }
  );

  const expairedDate = Date.parse(startDateTime);
  if (expairedDate < Date.now() + 60 * 60 * 10000) {
    return next(
      new ErrorResponse(`This is expaired date Please Inter inavlid date`, 400)
    );
  }

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
  const meeting = await Meeting.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
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
    createdBy: req.user._id,
  });

  res.status(200).json({
    success: true,
    msg: "creat meetings now",
    data: meeting,
  });
});

exports.addUsers = asyncHandler(async (req, res, next) => {
  const { participent } = req.body;

  const meeting = await Meeting.findByIdAndUpdate(
    req.params.id,
    { $push: { participent } },
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
exports.UpdateStatus = asyncHandler(async (req, res, next) => {
  const { status } = req.body;
  const statusMettiong = await Meeting.findByIdAndUpdate(
    req.params.id,
    req.body.status,
    {
      new: true,
    }
  );
  res.status(200).json({
    success: true,
    data: statusMettiong,
  });
});
exports.UpdateRcordUrl = asyncHandler(async (req, res, next) => {
  const { recordUrl } = req.body;
  const RecordURL = await Meeting.findByIdAndUpdate(
    req.params.id,
    { $set: { recordUrl } },
    {
      new: true,
    }
  );
  res.status(200).json({
    success: true,
    data: RecordURL,
  });
});
