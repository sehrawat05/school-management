import React, { useEffect, useState } from "react";
import axios from "axios";

const SubjectList = () => {
  const [subjects, setSubjects] = useState([]);

  const fetchSubjects = async () => {
    const res = await axios.get("http://localhost:5000/api/subjects");
    setSubjects(res.data);
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Subject List</h3>

      {subjects.length === 0 && (
        <p className="text-gray-600">No subjects yet.</p>
      )}

      <div className="space-y-6">
        {subjects.map((subject) => (
          <div
            key={subject._id}
            className="border border-gray-200 rounded-lg p-6 shadow-sm bg-white"
          >
            <h4 className="text-lg font-semibold text-gray-700 mb-2">
              {subject.name}
            </h4>
            <p className="text-gray-600 mb-4">{subject.description}</p>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Syllabus Completion:
              </label>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="h-4 rounded-full bg-green-500 text-white text-xs flex items-center justify-center"
                  style={{ width: `${subject.syllabusCompletion}%` }}
                >
                  {subject.syllabusCompletion}%
                </div>
              </div>
            </div>

            <div>
              <p className="text-gray-700 font-medium mb-2">Attachments:</p>
              <ul className="list-disc list-inside space-y-1">
                {subject.attachments.map((file, idx) => (
                  <li key={idx}>
                    <a
                      href={`http://localhost:5000${file.fileUrl}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {file.filename}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectList;
