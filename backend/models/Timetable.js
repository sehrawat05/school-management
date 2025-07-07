const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
  period: String,          // e.g. "Period 1", "Period 2"
  subject: String,
  teacher: String,
});

const timetableSchema = new mongoose.Schema({
  className: String,        // e.g. "10-A"
  day: String,              // e.g. "Monday"
  slots: [slotSchema],
});

module.exports = mongoose.model("Timetable", timetableSchema);
