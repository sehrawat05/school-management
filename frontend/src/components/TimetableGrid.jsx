import React, { useEffect, useState } from "react";
import axios from "axios";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const TimetableGrid = ({ className }) => {
  const [timetable, setTimetable] = useState([]);

  const fetchTimetable = async () => {
    const res = await axios.get(`http://localhost:5000/api/timetable/${className}`);
    setTimetable(res.data);
  };

  useEffect(() => {
    fetchTimetable();
  }, [className]);

  // Find all unique periods across all days
  const allPeriods = [...new Set(
    timetable.flatMap((day) => day.slots.map((slot) => slot.period))
  )];

  return (
    <div className="max-w-full overflow-x-auto mt-10">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">
        {className} Timetable
      </h3>

      <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">
              Day
            </th>
            {allPeriods.map((period) => (
              <th
                key={period}
                className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider"
              >
                {period}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {days.map((day) => {
            const dayData = timetable.find((d) => d.day === day);
            return (
              <tr key={day} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-700 whitespace-nowrap">
                  {day}
                </td>
                {allPeriods.map((period) => {
                  const slot = dayData?.slots.find((s) => s.period === period);
                  return (
                    <td
                      key={period}
                      className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap text-center"
                    >
                      {slot ? (
                        <div>
                          <span className="font-semibold text-gray-900">
                            {slot.subject}
                          </span>
                          <br />
                          <span className="text-gray-500 text-xs">
                            {slot.teacher}
                          </span>
                        </div>
                      ) : (
                        "-"
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      {timetable.length === 0 && (
        <p className="mt-4 text-gray-600">No timetable data available.</p>
      )}
    </div>
  );
};

export default TimetableGrid;
