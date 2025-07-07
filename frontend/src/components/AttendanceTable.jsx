import React, { useEffect, useState } from "react";
import axios from "axios";

const AttendanceTable = ({ students }) => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAttendance = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.get("http://localhost:5000/api/attendance");
      setAttendanceData(res.data);
    } catch (err) {
      console.error("Error fetching attendance", err);
      setError("Failed to fetch attendance data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const getStatus = (studentId, date) => {
    const entry = attendanceData.find(a => a.studentId._id === studentId);
    if (!entry) return "-";
    const record = entry.records.find(r => new Date(r.date).toDateString() === new Date(date).toDateString());
    return record ? record.status : "-";
  };

  const datesInMonth = () => {
    if (!selectedMonth) return [];
    const [year, month] = selectedMonth.split("-");
    const numDays = new Date(year, month, 0).getDate();
    return [...Array(numDays).keys()].map(d => new Date(year, month - 1, d + 1));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-800";
      case "absent":
        return "bg-red-100 text-red-800";
      case "late":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Attendance Records</h3>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Select Month:</label>
        <input
          type="month"
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {isLoading && <div className="text-center py-4">Loading attendance data...</div>}
      {error && <div className="text-red-500 py-4">{error}</div>}

      {selectedMonth && !isLoading && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student Name
                </th>
                {datesInMonth().map(date => (
                  <th 
                    key={date.toDateString()} 
                    className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {date.getDate()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student, index) => (
                <tr key={student._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {student.name}
                  </td>
                  {datesInMonth().map(date => (
                    <td 
                      key={date.toDateString()} 
                      className={`px-2 py-4 whitespace-nowrap text-sm text-center ${getStatusColor(getStatus(student._id, date))}`}
                    >
                      {getStatus(student._id, date)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AttendanceTable;