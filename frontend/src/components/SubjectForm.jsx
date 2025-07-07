import React, { useState } from "react";
import axios from "axios";

const SubjectForm = ({ onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    syllabusCompletion: 0,
    attachments: [],
  });

  const handleChange = (e) => {
    if (e.target.name === "attachments") {
      setFormData({
        ...formData,
        attachments: e.target.files,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("syllabusCompletion", formData.syllabusCompletion);

    for (let i = 0; i < formData.attachments.length; i++) {
      data.append("attachments", formData.attachments[i]);
    }

    await axios.post("http://localhost:5000/api/subjects", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    alert("Subject saved!");
    onSave();
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">Add Subject</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Subject Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Syllabus Completion (%)
          </label>
          <input
            type="number"
            name="syllabusCompletion"
            value={formData.syllabusCompletion}
            onChange={handleChange}
            min="0"
            max="100"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Attachments (PDFs)
          </label>
          <input
            type="file"
            name="attachments"
            multiple
            onChange={handleChange}
            accept=".pdf"
            className="block w-full text-sm text-gray-700 border border-gray-300 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded shadow"
        >
          Save Subject
        </button>
      </form>
    </div>
  );
};

export default SubjectForm;
