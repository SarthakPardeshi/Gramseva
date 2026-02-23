import React, { useState } from "react";
import { motion } from "framer-motion";

const ComplaintsPage = () => {
  const [complaints, setComplaints] = useState([
    {
      _id: "1",
      category: "road",
      description: "Big pothole near school",
      status: "pending",
    },
    {
      _id: "2",
      category: "water",
      description: "Water leakage in street",
      status: "pending",
    },
    {
      _id: "3",
      category: "light",
      description: "Street light not working",
      status: "resolved",
    },
  ]);

  const handleStatusChange = (id, newStatus) => {
    const updated = complaints.map((c) =>
      c._id === id ? { ...c, status: newStatus } : c
    );
    setComplaints(updated);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <h2 className="text-2xl font-bold p-6">
        Manage Complaints
      </h2>

      <div className="grid grid-cols-4 bg-gray-200 p-4 font-semibold">
        <span>Category</span>
        <span>Description</span>
        <span>Status</span>
        <span>Action</span>
      </div>

      {complaints.map((complaint) => (
        <motion.div
          key={complaint._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ backgroundColor: "#f9fafb" }}
          className="grid grid-cols-4 p-4 border-b items-center"
        >
          <span className="capitalize">{complaint.category}</span>

          <span className="text-gray-600">
            {complaint.description}
          </span>

          <span
            className={`font-medium ${
              complaint.status === "pending"
                ? "text-yellow-500"
                : "text-green-600"
            }`}
          >
            {complaint.status}
          </span>

          <select
            value={complaint.status}
            onChange={(e) =>
              handleStatusChange(complaint._id, e.target.value)
            }
            className="border px-3 py-1 rounded-md cursor-pointer"
          >
            <option value="pending">pending</option>
            <option value="resolved">resolved</option>
          </select>
        </motion.div>
      ))}
    </div>
  );
};

export default ComplaintsPage;
