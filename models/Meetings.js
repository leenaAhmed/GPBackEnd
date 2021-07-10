const mongoose = require("mongoose");
// const date = require("date-and-time");
const slugify = require("slugify");

const MeetingsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    maxlength: [50, "Name can not be more than 50 characters"],
  },
  slug: String,
  startDateTime: {
    type: Date,
    default: Date.now(),
  },
  duration: {
    type: Date,
  },
  file: {
    type: Buffer,
  },
  status: {
    type: String,
    default: "Pending",
  },
  isExpaired: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  JoinURL: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
  recordUrl: {
    type: String,
    default: "having no record",
  },
  participent: [String],
});
MeetingsSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });

  next();
});
// MeetingsSchema.pre("save", function (next) {
//   this.startDateTime = date.format(startDateTime, "ddd, MMM DD YYYY");

//   next();
// });

module.exports = mongoose.model("Meetings", MeetingsSchema);
