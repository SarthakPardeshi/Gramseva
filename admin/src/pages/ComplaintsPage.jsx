import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import api from "../api/axios";

const ComplaintsPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const { data } = await api.get("/complaints");
      setComplaints(data);
    } catch (error) {
      console.error("Failed to fetch complaints:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    // Optimistic UI update
    const previous = [...complaints];
    setComplaints((prev) =>
      prev.map((c) => (c._id === id ? { ...c, status: newStatus } : c))
    );

    try {
      await api.patch(`/complaints/${id}/status`, { status: newStatus });
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Failed to update status. Reverting...");
      setComplaints(previous); // Revert on failure
    }
  };

  if (loading) return <div className="p-10 text-center font-bold text-gray-400">Loading live complaints...</div>;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <h2 className="text-2xl font-bold p-6">
        Manage Technical Complaints
      </h2>

      <div className="grid grid-cols-5 bg-gray-200 p-4 font-semibold text-sm text-gray-700 uppercase tracking-wider">
        <span>Citizen</span>
        <span>Category</span>
        <span>Issue Details</span>
        <span>Current Status</span>
        <span>Action</span>
      </div>

      {complaints.length === 0 ? (
        <div className="p-8 text-center text-gray-500 italic">No complaints found.</div>
      ) : (
        complaints.map((complaint) => (
          <motion.div
            key={complaint._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ backgroundColor: "#f9fafb" }}
            className="grid grid-cols-5 p-4 border-b items-center gap-4 text-sm"
          >
            <div className="flex flex-col">
              <span className="font-bold text-gray-800">{complaint.user?.name || "Unknown"}</span>
              <span className="text-xs text-gray-500">{complaint.user?.mobile || "No Contact"}</span>
            </div>

            <span className="capitalize font-medium text-blue-700">{complaint.category}</span>

            <div className="flex flex-col">
              <span className="text-gray-600 line-clamp-2" title={complaint.description}>
                {complaint.description}
              </span>
              {complaint.imageUrl && (
                <a href={complaint.imageUrl} target="_blank" rel="noreferrer" className="text-xs text-orange-500 hover:underline mt-1 font-semibold block">
                  View Attached Poof ↗
                </a>
              )}
            </div>

            <span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${complaint.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                  }`}
              >
                {complaint.status}
              </span>
            </span>

            <select
              value={complaint.status}
              onChange={(e) => handleStatusChange(complaint._id, e.target.value)}
              className="border px-3 py-2 bg-gray-50 hover:bg-white rounded-lg cursor-pointer outline-none focus:ring-2 focus:ring-blue-500 transition-all font-semibold"
            >
              <option value="pending">Mark Pending</option>
              <option value="resolved">Mark Resolved</option>
            </select>
          </motion.div>
        ))
      )}
    </div>
  );
};

export default ComplaintsPage;
