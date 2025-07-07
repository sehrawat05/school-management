import React, { useEffect, useState } from "react";
import axios from "axios";
import ResultForm from "./ResultForm";

const ResultsTable = ({ students }) => {
  const [resultsData, setResultsData] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);

  const fetchResults = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/results");
      setResultsData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const handleDelete = async (studentId, resultId) => {
    if (!window.confirm("Delete this result?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/results/${studentId}/${resultId}`
      );
      alert("Deleted!");
      fetchResults();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  const handleEdit = (studentId, record) => {
    setEditingRecord({
      studentId,
      record,
    });
  };

  const handleEditSubmit = async (formData) => {
    try {
      await axios.put(
        `http://localhost:5000/api/results/${formData.studentId}/${formData.resultId}`,
        {
          date: formData.date,
          term: formData.term,
          subjects: formData.subjects,
        }
      );

      alert("Updated!");
      setEditingRecord(null);
      fetchResults();
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <div className="p-6">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800">Results</h3>

      {editingRecord && (
        <div className="mb-6">
          <ResultForm
            editData={editingRecord}
            onSave={handleEditSubmit}
            onCancel={() => setEditingRecord(null)}
          />
        </div>
      )}

      {resultsData.length === 0 && (
        <p className="text-gray-500">No results recorded yet.</p>
      )}

      {resultsData.map((entry) => (
        <div
          key={entry._id}
          className="mb-8 p-4 border border-gray-200 rounded-lg shadow-sm bg-white"
        >
          <h4 className="text-lg font-bold text-gray-700 mb-4">
            Student: {entry.studentId?.name}
          </h4>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left font-medium">Date</th>
                  <th className="px-4 py-2 text-left font-medium">Term</th>
                  <th className="px-4 py-2 text-left font-medium">Subjects</th>
                  <th className="px-4 py-2 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {entry.results.map((r) => (
                  <tr key={r._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      {new Date(r.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">{r.term}</td>
                    <td className="px-4 py-3">
                      <ul className="list-disc list-inside">
                        {r.subjects.map((s, idx) => (
                          <li key={idx}>
                            <span className="font-medium">{s.subject}:</span>{" "}
                            {s.marks}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1 rounded mr-2"
                        onClick={() =>
                          handleEdit(entry.studentId._id, {
                            ...r,
                            resultId: r._id,
                          })
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="inline-block bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded"
                        onClick={() =>
                          handleDelete(entry.studentId._id, r._id)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResultsTable;
