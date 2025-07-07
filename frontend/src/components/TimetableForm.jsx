import React, { useState } from "react";
import axios from "axios";

const TimetableForm = ({ onSave }) => {
  const [formData, setFormData] = useState({
    className: "",
    day: "",
    slots: [{ period: "", subject: "", teacher: "" }],
  });

  const handleSlotChange = (index, e) => {
    const newSlots = [...formData.slots];
    newSlots[index][e.target.name] = e.target.value;
    setFormData({ ...formData, slots: newSlots });
  };

  const addSlot = () => {
    setFormData({
      ...formData,
      slots: [...formData.slots, { period: "", subject: "", teacher: "" }],
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/api/timetable", formData);
    alert("Timetable saved!");
    onSave();
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">
        Add Timetable Entry
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Class Name
          </label>
          <input
            type="text"
            name="className"
            value={formData.className}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Day</label>
          <select
            name="day"
            value={formData.day}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Day</option>
            <option>Monday</option>
            <option>Tuesday</option>
            <option>Wednesday</option>
            <option>Thursday</option>
            <option>Friday</option>
            <option>Saturday</option>
          </select>
        </div>

        <h4 className="text-lg font-semibold text-gray-700 mt-6">
          Period Slots
        </h4>

        {formData.slots.map((slot, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded p-4 mb-4 bg-gray-50"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700 text-sm mb-1">
                  Period
                </label>
                <input
                  type="text"
                  name="period"
                  value={slot.period}
                  onChange={(e) => handleSlotChange(index, e)}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={slot.subject}
                  onChange={(e) => handleSlotChange(index, e)}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm mb-1">
                  Teacher
                </label>
                <input
                  type="text"
                  name="teacher"
                  value={slot.teacher}
                  onChange={(e) => handleSlotChange(index, e)}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addSlot}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow"
        >
          + Add Another Slot
        </button>

        <button
          type="submit"
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded shadow"
        >
          Save Timetable
        </button>
      </form>
    </div>
  );
};

export default TimetableForm;
