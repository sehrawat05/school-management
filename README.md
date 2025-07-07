📚 MERN Student Management System
A full-stack web application for managing students, attendance, results, homework, subjects, and timetables, built using the MERN stack (MongoDB, Express, React, Node.js).

🚀 Features
✅ Add and manage student information
✅ Manage attendance with date-wise and month-wise views
✅ Manage academic results (subject-wise marks, filters, edit/delete)
✅ Manage homework and assignments with file uploads
✅ Manage subjects with syllabus completion tracking and PDF attachments
✅ View class timetables in a beautiful grid
✅ Responsive and modern UI with Tailwind CSS

💻 Technologies Used
Frontend: React.js, React Router, Axios, Tailwind CSS

Backend: Node.js, Express.js

Database: MongoDB

Styling: Tailwind CSS

📂 Project Structure
bash
Copy
Edit
/client
   /src
      /components
         Dashboard.jsx
         StudentInfoForm.jsx
         ResultForm.jsx
         ResultsTable.jsx
         HomeworkForm.jsx
         HomeworkList.jsx
         SubjectForm.jsx
         SubjectList.jsx
         TimetableForm.jsx
         TimetableGrid.jsx
      App.jsx
/server
   /routes
   /models
   server.js
⚙️ How to Run
1. Clone the repository
bash
Copy
Edit
git clone https://github.com/yourusername/mern-student-management.git
cd mern-student-management
2. Install Backend Dependencies
bash
Copy
Edit
cd server
npm install
3. Start Backend Server
bash
Copy
Edit
npm run dev
Runs on http://localhost:5000

4. Install Frontend Dependencies
Open a new terminal tab/window:

bash
Copy
Edit
cd client
npm install
5. Start Frontend Development Server
bash
Copy
Edit
npm run dev
Runs on http://localhost:5173 (or whichever port Vite uses)

🌟 Screenshots
✅ Dashboard


✅ Student Form


(Add your own screenshots for better visuals!)

✨ Future Improvements
Authentication and roles (Admin, Teacher, Student)

Charts and analytics for results

Timetable editing

Notifications

Improved file storage (e.g. AWS S3)
