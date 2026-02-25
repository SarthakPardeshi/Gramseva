import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import api from "../api/axios";
import LoadingSpinner from "../components/LoadingSpinner";

const ComplaintsPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  // Define the fetch function
  const fetchComplaints = async () => {
    try {
      setLoading(true);
      // Using your axios 'api' instance instead of raw fetch for consistency
      const response = await api.get("/complaints");
      setComplaints(response.data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

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

  return (
    <div className="max-w-7xl mx-auto px-4">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="bg-white rounded-xl shadow-md flex flex-col h-[75vh] overflow-hidden border border-gray-100">
          {/* Header Section */}
          <div className="p-6 border-b bg-white">
            <h2 className="text-2xl font-bold text-gray-800">
              Manage Technical Complaints
            </h2>
          </div>

          {/* Sticky Table Header */}
          <div className="grid grid-cols-5 bg-gray-50 p-4 font-bold text-xs text-gray-500 uppercase tracking-widest border-b">
            <span>Citizen</span>
            <span>Category</span>
            <span>Issue Details</span>
            <span>Current Status</span>
            <span>Action</span>
          </div>

          {/* Scrollable Content Area */}
          <div className="overflow-y-auto flex-grow bg-white">
            {complaints.length === 0 ? (
              <div className="p-20 text-center flex flex-col items-center">
                <span className="text-4xl mb-4">📁</span>
                <p className="text-gray-400 italic">No complaints found in the system.</p>
              </div>
            ) : (
              complaints.map((complaint) => (
                <motion.div
                  key={complaint._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ backgroundColor: "#f9fafb" }}
                  className="grid grid-cols-5 p-4 border-b items-center gap-4 text-sm transition-colors"
                >
                  {/* Citizen Info */}
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-800">
                      {complaint.user?.name || "Anonymous"}
                    </span>
                    <span className="text-xs text-gray-500 font-mono">
                      {complaint.user?.mobile || "No Contact"}
                    </span>
                  </div>

                  {/* Category */}
                  <span className="capitalize font-semibold text-blue-600">
                    {complaint.category}
                  </span>

                  {/* Issue Details */}
                  <div className="flex flex-col">
                    <span className="text-gray-600 line-clamp-2" title={complaint.description}>
                      {complaint.description}
                    </span>
                    {complaint.imageUrl && (
                      <a 
                        href={complaint.imageUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-xs text-orange-600 hover:text-orange-700 font-bold mt-1 inline-flex items-center gap-1"
                      >
                        View Proof ↗
                      </a>
                    )}
                  </div>

                  {/* Status Badge */}
                  <div>
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                        complaint.status === "pending"
                          ? "bg-amber-100 text-amber-700 border border-amber-200"
                          : "bg-emerald-100 text-emerald-700 border border-emerald-200"
                      }`}
                    >
                      {complaint.status}
                    </span>
                  </div>

                  {/* Action Dropdown */}
                  <select
                    value={complaint.status}
                    onChange={(e) => handleStatusChange(complaint._id, e.target.value)}
                    className="border border-gray-200 px-3 py-2 bg-gray-50 hover:bg-white rounded-lg cursor-pointer outline-none focus:ring-2 focus:ring-blue-500 transition-all font-bold text-gray-700 text-xs shadow-sm"
                  >
                    <option value="pending">Mark Pending</option>
                    <option value="resolved">Mark Resolved</option>
                  </select>
                </motion.div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplaintsPage;