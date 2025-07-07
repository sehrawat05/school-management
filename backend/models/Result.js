const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  results: [
    {
      date: { type: Date, default: Date.now },
      term: String,
      subjects: [
        {
          subject: String,
          marks: Number,
        }
      ]
    }
  ]
});

module.exports = mongoose.model("Result", resultSchema);
