const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: String,
  description: String,
  syllabusCompletion: { type: Number, default: 0 }, // e.g. 75
  attachments: [
    {
      filename: String,
      fileUrl: String,
    }
  ],
});

module.exports = mongoose.model("Subject", subjectSchema);
