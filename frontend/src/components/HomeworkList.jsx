import axios from "axios";
import { useState } from "react";
const HomeworkList = ({ homeworkData, fetchHomework }) => {
  const [isUpdating, setIsUpdating] = useState(null);

  const markCompleted = async (id, isCompleted) => {
    setIsUpdating(id);
    try {
      await axios.put(`http://localhost:5000/api/homework/${id}`, {
        isCompleted,
      });
      fetchHomework();
    } catch (error) {
      console.error("Error updating homework status:", error);
      alert("Failed to update homework status");
    } finally {
      setIsUpdating(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Homework Assignments</h3>
      
      {homeworkData.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No homework assignments yet.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Attachment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {homeworkData.map((hw) => (
                <tr key={hw._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {hw.studentId?.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {hw.studentId?.className}-{hw.studentId?.section}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {hw.subject}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                    <p className="truncate">{hw.description}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {hw.fileUrl && (
                      <a
                        href={`http://localhost:5000${hw.fileUrl}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Download
                      </a>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        hw.isCompleted
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {hw.isCompleted ? "Completed" : "Pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {isUpdating === hw._id ? (
                      <span className="text-gray-500">Updating...</span>
                    ) : (
                      <button
                        onClick={() => markCompleted(hw._id, !hw.isCompleted)}
                        className={`mr-2 ${
                          hw.isCompleted
                            ? "text-yellow-600 hover:text-yellow-900"
                            : "text-green-600 hover:text-green-900"
                        }`}
                      >
                        {hw.isCompleted ? "Mark Pending" : "Mark Completed"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HomeworkList;