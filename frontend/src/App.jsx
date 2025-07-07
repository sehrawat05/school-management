import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import StudentInfoForm from "./components/StudentInfoForm";
import ResultForm from "./components/ResultForm";

function App() {
  return (
    <Router>
      <nav className="bg-gray-100 py-4 px-8 flex items-center space-x-6 shadow">
        <Link
          to="/"
          className="text-gray-800 hover:text-blue-600 font-semibold"
        >
          Home
        </Link>
        <Link
          to="/add-student"
          className="text-gray-800 hover:text-blue-600 font-semibold"
        >
          Add New Student
        </Link>
        <Link to="/add-result">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow">
            Add New Result
          </button>
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-student" element={<StudentInfoForm />} />
        <Route path="/add-result" element={<ResultForm />} />
      </Routes>
    </Router>
  );
}

export default App;
