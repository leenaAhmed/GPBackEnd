const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Meeting = require("../models/Meetings");
const User = require("../models/user");
const multer = require("multer");

exports.getMeetings = asyncHandler(async (req, res, next) => {
  let query;
  const reqQuery = { ...req.query };
  const removeFields = ["select", "sort"];
  removeFields.forEach((param) => delete reqQuery[param]);
  console.log(reqQuery);
  let querystr = JSON.stringify(reqQuery);
  querystr = querystr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );
  // Finding resource

  query = Meeting.find(JSON.parse(querystr), { createdBy: req.user._id }).sort({
    createdAt: -1,
  });

  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  const meetings = await query;

  await Meeting.updateMany(
    { startDateTime: { $lt: new Date(Date.now()) } },
    { isExpaired: true }
  );

  res.status(200).json({
    success: true,
    count: meetings.length,
    data: meetings,
  });
});

exports.getJoinUrl = asyncHandler(async (req, res, next) => {
  const meeting = await Meeting.findById(req.params.id);
  if (!meeting) {
    return next(
      new ErrorResponse(`this meeting not found with id ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    doctorId: " https://elqa3a.eduedges.com/room/" + req.params.id + "/true",
    studentId: " https://elqa3a.eduedges.com/room/" + req.params.id,
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
    await Meeting.updateMany({ _id: meeting._id }, { file: req.file.buffer });
  }
  const { startDateTime } = req.body;

  const expairedDate = Date.parse(startDateTime);
  if (expairedDate < Date.now()) {
    return next(
      new ErrorResponse(`this is expaired date inter inavlid date`, 400)
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
  if (startDateTime < Date.now()) {
    status = "start";
  }
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
