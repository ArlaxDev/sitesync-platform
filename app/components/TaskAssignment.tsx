import React, { useState } from "react";

const TaskAssignment = ({ featureId }: { featureId: string }) => {
  const [assignedTo, setAssignedTo] = useState("");
  const [status, setStatus] = useState("Pending");

  return (
    <div className="mt-4">
      <h4 className="text-lg font-semibold text-gray-800 mb-2">Task Assignment</h4>

      {/* Assigned To Field */}
      <div className="mb-4">
        <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-600 mb-1">
          Assigned To
        </label>
        <select
          id="assignedTo"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          className="w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="" disabled>Select a person</option>
          <option value="User A">User A</option>
          <option value="User B">User B</option>
          <option value="User C">User C</option>
        </select>
      </div>

      {/* Status Field */}
      <div className="mb-4">
        <label htmlFor="status" className="block text-sm font-medium text-gray-600 mb-1">
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Save Button */}
      <button
        onClick={() => console.log(`Task assigned to ${assignedTo} with status ${status}`)}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition font-medium"
      >
        Save Assignment
      </button>
    </div>
  );
};

export default TaskAssignment;
