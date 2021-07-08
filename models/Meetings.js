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
  duration: {
    type: Object,
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

module.exports = mongoose.model("Meetings", MeetingsSchema);
