const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Attendance = require("./models/Attendance");
const app = express();
app.use(cors());
app.use(express.json());
const Result = require("./models/Result");
const multer = require("multer");
const path = require("path");
const Homework = require("./models/Homework");
const Subject = require("./models/Subject");
const Timetable = require("./models/Timetable");
// Connect MongoDB
mongoose
  .connect("mongodb://localhost:27017/school_management", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Import Model
const Student = require("./models/Student");
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });
// POST route
app.post("/api/students", async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    const savedStudent = await newStudent.save();

    // Create attendance
    const attendance = new Attendance({
      studentId: savedStudent._id,
      records: [],
    });
    await attendance.save();

    // ✅ Create result entry
    const result = new Result({
      studentId: savedStudent._id,
      results: [], // Empty initially
    });
    await result.save();

    res.status(201).json({ message: "Student, attendance, and result created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ NEW: GET all students
app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/attendance", async (req, res) => {
  try {
    const data = await Attendance.find().populate("studentId");
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching attendance" });
  }
});
app.put("/api/attendance/:studentId", async (req, res) => {
  const { date, status } = req.body;
  try {
    const attendance = await Attendance.findOne({ studentId: req.params.studentId });
    const existingRecord = attendance.records.find(r => new Date(r.date).toDateString() === new Date(date).toDateString());

    if (existingRecord) {
      existingRecord.status = status;
    } else {
      attendance.records.push({ date, status });
    }

    await attendance.save();
    res.json({ message: "Attendance updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Update failed" });
  }
});
app.get("/api/results", async (req, res) => {
  try {
    const data = await Result.find().populate("studentId");
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching results" });
  }
});
app.put("/api/results/:studentId", async (req, res) => {
  const { date, term, subjects } = req.body;

  try {
    const result = await Result.findOne({ studentId: req.params.studentId });

    result.results.push({
      date,
      term,
      subjects,
    });

    await result.save();
    res.json({ message: "Result added." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating results" });
  }
});
app.delete("/api/results/:studentId/:resultId", async (req, res) => {
  try {
    const result = await Result.findOne({ studentId: req.params.studentId });

    if (!result) {
      return res.status(404).json({ message: "Result not found" });
    }

    result.results = result.results.filter(
      (r) => r._id.toString() !== req.params.resultId
    );

    await result.save();
    res.json({ message: "Result deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting result" });
  }
});
app.put("/api/results/:studentId/:resultId", async (req, res) => {
  const { date, term, subjects } = req.body;

  try {
    const result = await Result.findOne({ studentId: req.params.studentId });

    if (!result) {
      return res.status(404).json({ message: "Result not found" });
    }

    const record = result.results.find(
      (r) => r._id.toString() === req.params.resultId
    );

    if (!record) {
      return res.status(404).json({ message: "Result record not found" });
    }

    record.date = date;
    record.term = term;
    record.subjects = subjects;

    await result.save();
    res.json({ message: "Result updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating result" });
  }
});
app.post(
  "/api/homework",
  upload.single("file"),
  async (req, res) => {
    try {
      const newHomework = new Homework({
        studentId: req.body.studentId,
        subject: req.body.subject,
        description: req.body.description,
        fileUrl: req.file ? `/uploads/${req.file.filename}` : "",
      });

      await newHomework.save();
      res.status(201).json({ message: "Homework saved" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error saving homework" });
    }
  }
);

app.get("/api/homework", async (req, res) => {
  try {
    const data = await Homework.find().populate("studentId");
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching homework" });
  }
});
app.put("/api/homework/:id", async (req, res) => {
  try {
    const hw = await Homework.findById(req.params.id);
    hw.isCompleted = req.body.isCompleted;
    await hw.save();
    res.json({ message: "Homework updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating homework" });
  }
});
app.post(
  "/api/subjects",
  upload.array("attachments"),
  async (req, res) => {
    try {
      const files = req.files || [];
      const attachments = files.map((f) => ({
        filename: f.originalname,
        fileUrl: `/uploads/${f.filename}`,
      }));

      const newSubject = new Subject({
        name: req.body.name,
        description: req.body.description,
        syllabusCompletion: req.body.syllabusCompletion,
        attachments,
      });

      await newSubject.save();
      res.status(201).json({ message: "Subject saved" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error saving subject" });
    }
  }
);

app.get("/api/subjects", async (req, res) => {
  try {
    const data = await Subject.find();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching subjects" });
  }
});

app.post("/api/timetable", async (req, res) => {
  try {
    const newEntry = new Timetable({
      className: req.body.className,
      day: req.body.day,
      slots: req.body.slots,
    });

    await newEntry.save();
    res.status(201).json({ message: "Timetable saved" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving timetable" });
  }
});
app.get("/api/timetable/:className", async (req, res) => {
  try {
    const timetable = await Timetable.find({
      className: req.params.className,
    });

    res.json(timetable);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching timetable" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
