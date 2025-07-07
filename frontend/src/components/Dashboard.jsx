import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AttendanceTable from "./AttendanceTable";
import ResultsTable from "./ResultsTable";
import HomeworkForm from "./HomeworkForm";
import HomeworkList from "./HomeworkList";
import SubjectForm from "./SubjectForm";
import SubjectList from "./SubjectList";
import TimetableForm from "./TimetableForm";
import TimetableGrid from "./TimetableGrid";

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [activeTab, setActiveTab] = useState("students");
  const [homeworkData, setHomeworkData] = useState([]);
  const [subjectData, setSubjectData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchStudents = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/students");
      setStudents(res.data);
    } catch (error) {
      console.error(error);
      alert("Error fetching students");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchHomework = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/homework");
      setHomeworkData(res.data);
    } catch (error) {
      console.error(error);
      alert("Error fetching homework");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSubjects = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/subjects");
      setSubjectData(res.data);
    } catch (error) {
      console.error(error);
      alert("Error fetching subjects");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    if (activeTab === "homework") {
      fetchHomework();
    } else if (activeTab === "subjects") {
      fetchSubjects();
    }
  }, [activeTab]);

  const tabClasses = (tabName) =>
    `px-4 py-2 rounded-t-lg font-medium text-sm transition-colors ${
      activeTab === tabName
        ? "bg-white text-blue-600 border-t border-l border-r border-gray-200"
        : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <div className="container mx-auto px-4 py-6 max-w-screen-2xl">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">School Dashboard</h2>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-1 overflow-x-auto pb-1">
            <button
              onClick={() => setActiveTab("students")}
              className={tabClasses("students")}
            >
              Students
            </button>
            <button
              onClick={() => setActiveTab("attendance")}
              className={tabClasses("attendance")}
            >
              Attendance
            </button>
            <button
              onClick={() => setActiveTab("results")}
              className={tabClasses("results")}
            >
              Results
            </button>
            <button
              onClick={() => setActiveTab("homework")}
              className={tabClasses("homework")}
            >
              Homework
            </button>
            <button
              onClick={() => setActiveTab("subjects")}
              className={tabClasses("subjects")}
            >
              Subjects
            </button>
            <button
              onClick={() => setActiveTab("timetable")}
              className={tabClasses("timetable")}
            >
              Timetable
            </button>
            <Link
              to="/add-student"
              className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Add New Student
            </Link>
          </nav>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Tab Content */}
        <div className="bg-white rounded-b-lg p-4">
          {activeTab === "students" && (
            <>
              {students.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No students added yet.
                </div>
              ) : (
                <div className="overflow-x-auto shadow-sm border border-gray-200 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Roll No
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Class
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Section
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Gender
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          DOB
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Contact
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {students.map((s) => (
                        <tr key={s._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {s.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {s.rollNumber}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {s.className}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {s.section}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {s.gender}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {s.dob ? new Date(s.dob).toLocaleDateString() : ""}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {s.contactNumber}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {s.email}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}

          {activeTab === "attendance" && <AttendanceTable students={students} />}

          {activeTab === "results" && <ResultsTable students={students} />}

          {activeTab === "homework" && (
            <div className="space-y-6">
              <HomeworkForm onSave={fetchHomework} />
              <HomeworkList homeworkData={homeworkData} fetchHomework={fetchHomework} />
            </div>
          )}

          {activeTab === "subjects" && (
            <div className="space-y-6">
              <SubjectForm onSave={fetchSubjects} />
              <SubjectList />
            </div>
          )}

          {activeTab === "timetable" && (
            <div className="space-y-6">
              <TimetableForm onSave={() => {}} />
              <TimetableGrid className="10-A" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;