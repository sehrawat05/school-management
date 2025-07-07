const mongoose = require("mongoose");

const homeworkSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  subject: String,
  description: String,
  fileUrl: String,
  isCompleted: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Homework", homeworkSchema);
