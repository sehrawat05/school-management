const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  records: [
    {
      date: { type: Date },
      status: { type: String, enum: ["Present", "Absent"], default: "Absent" },
    },
  ],
});

module.exports = mongoose.model("Attendance", attendanceSchema);
