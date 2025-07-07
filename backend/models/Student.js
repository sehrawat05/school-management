const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNumber: { type: String, required: true },
  className: { type: String, required: true },
  section: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  guardianName: { type: String },
  contactNumber: { type: String, required: true },
  email: { type: String },
  currentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
});

module.exports = mongoose.model("Student", studentSchema);
