const mongoose = require("mongoose");
const User = require("./user");
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
  file: {
    type: Buffer,
  },
  state: {
    type: String,
    default: "Active",
  },
  isExpaired: {
    type: Boolean,
    default: false,
  },
  join_url: {
    type: String,
    default: "having to record",
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  recordUrl: {
    type: String,
  },
  participent: [String],
});
MeetingsSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model("Meetings", MeetingsSchema);
