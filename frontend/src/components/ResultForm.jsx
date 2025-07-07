import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ResultForm = ({ editData, onSave, onCancel }) => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    studentId: "",
    date: "",
    term: "",
    subjects: [{ subject: "", marks: "" }],
    resultId: null,
  });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/students");
        setStudents(res.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, []);

  useEffect(() => {
    if (editData) {
      setFormData({
        studentId: editData.studentId,
        date: editData.record.date.slice(0, 10),
        term: editData.record.term,
        subjects: editData.record.subjects,
        resultId: editData.record.resultId,
      });
    }
  }, [editData]);

  const handleChange = (e, index) => {
    if (e.target.name === "subject" || e.target.name === "marks") {
      const updatedSubjects = [...formData.subjects];
      updatedSubjects[index][e.target.name] = e.target.value;
      setFormData({ ...formData, subjects: updatedSubjects });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const addSubject = () => {
    setFormData({
      ...formData,
      subjects: [...formData.subjects, { subject: "", marks: "" }],
    });
  };

  const removeSubject = (index) => {
    const updatedSubjects = formData.subjects.filter((_, i) => i !== index);
    setFormData({ ...formData, subjects: updatedSubjects });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (editData) {
        await onSave(formData);
      } else {
        await axios.put(
          `http://localhost:5000/api/results/${formData.studentId}`,
          {
            date: formData.date,
            term: formData.term,
            subjects: formData.subjects,
          }
        );
        alert("Result saved successfully!");
        navigate("/");
      }
    } catch (error) {
      console.error("Error saving result:", error);
      alert("Failed to save result. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {editData ? "Edit Result" : "Add New Result"}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Student Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Student
          </label>
          <select
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            required
            disabled={!!editData}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
          >
            <option value="">Select Student</option>
            {students.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name} (Class: {s.className}-{s.section})
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Date Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Term Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Term
            </label>
            <select
              name="term"
              value={formData.term}
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Term</option>
              <option value="Term 1">Term 1</option>
              <option value="Term 2">Term 2</option>
              <option value="Term 3">Term 3</option>
            </select>
          </div>
        </div>

        {/* Subjects & Marks Section */}
        <div className="pt-4">
          <h4 className="text-lg font-medium text-gray-800 mb-3">
            Subjects & Marks
          </h4>
          
          {formData.subjects.map((sub, index) => (
            <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3 items-end">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject Name
                </label>
                <input
                  type="text"
                  name="subject"
                  placeholder="e.g. Mathematics"
                  value={sub.subject}
                  onChange={(e) => handleChange(e, index)}
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Marks
                </label>
                <input
                  type="number"
                  name="marks"
                  placeholder="0-100"
                  value={sub.marks}
                  onChange={(e) => handleChange(e, index)}
                  required
                  min="0"
                  max="100"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <button
                  type="button"
                  onClick={() => removeSubject(index)}
                  disabled={formData.subjects.length === 1}
                  className={`px-3 py-2 border border-red-300 rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
                    formData.subjects.length === 1 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          
          <button
            type="button"
            onClick={addSubject}
            className="mt-2 px-3 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            + Add Subject
          </button>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-3 pt-6">
          {editData && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
          )}
          
          <button
            type="submit"
            disabled={isLoading}
            className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              isLoading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {editData ? 'Updating...' : 'Saving...'}
              </>
            ) : (
              editData ? 'Update Result' : 'Save Result'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResultForm;