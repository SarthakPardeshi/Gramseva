import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import api from "../api/axios.js"; 
import { CheckCircle, Clock, AlertCircle, RefreshCw } from "lucide-react";
import { useAuth } from '../context/AuthContext';

const ComplaintsPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Added error state
  const { token } = useAuth();

  useEffect(() => {
    const fetchComplaints = async () => {
      console.log("Attempting to fetch with token:", token ? "Token exists" : "No token");
      try {
        setLoading(true);
        const response = await api.get("/complaints", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log("Data received:", response.data);
        setComplaints(response.data);
        setError(null);
      } catch (err) {
        console.error("Fetch error details:", err.response || err);
        setError(err.response?.data?.message || "Failed to load complaints. Please check server connection.");
      } finally {
        setLoading(false);
      }
    };

    // If you are logged in, fetch. If token is undefined/null, wait.
    if (token) {
        fetchComplaints();
    } else {
        // If there's no token after a short delay, stop loading so we don't hang
        const timer = setTimeout(() => setLoading(false), 3000);
        return () => clearTimeout(timer);
    }
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-4">
        <RefreshCw className="animate-spin text-blue-600" size={40} />
        <p className="font-bold text-slate-500">Connecting to Server...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 text-center bg-red-50 rounded-2xl border border-red-100">
        <AlertCircle className="mx-auto mb-4 text-red-500" size={48} />
        <h3 className="text-lg font-bold text-red-800">Connection Error</h3>
        <p className="text-red-600 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-red-600 text-white px-6 py-2 rounded-xl font-bold"
        >
          Retry Connection
        </button>
      </div>
    );
  }


  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
      <div className="bg-slate-50 p-6 border-b border-slate-100 flex justify-between items-center">
        <h2 className="text-2xl font-black text-slate-800">Manage Complaints</h2>
        <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase">
          Admin View
        </span>
      </div>

      {/* Table Header */}
      <div className="hidden md:grid grid-cols-4 bg-slate-100 p-4 text-[11px] font-black text-slate-500 uppercase tracking-widest">
        <span>Category</span>
        <span>Description</span>
        <span>Current Status</span>
        <span>Update Action</span>
      </div>

      <div className="divide-y divide-slate-100">
        {complaints.map((complaint) => (
          <motion.div
            key={complaint._id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-4 p-4 md:p-6 items-center gap-4 hover:bg-slate-50 transition-colors"
          >
            {/* Category */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span className="font-bold text-slate-700 capitalize">{complaint.category}</span>
            </div>

            {/* Description */}
            <span className="text-slate-600 text-sm leading-relaxed">
              {complaint.description}
            </span>

            {/* Status Badge */}
            <div>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold capitalize ${complaint.status === "pending"
                    ? "bg-yellow-50 text-yellow-600 border border-yellow-100"
                    : "bg-green-50 text-green-600 border border-green-100"
                  }`}
              >
                {complaint.status === "pending" ? <Clock size={14} /> : <CheckCircle size={14} />}
                {complaint.status}
              </span>
            </div>

            {/* Action Select */}
            <div className="relative">
              <select
                value={complaint.status}
                onChange={(e) => handleStatusChange(complaint._id, e.target.value)}
                className={`w-full md:w-auto appearance-none border-2 px-4 py-2 rounded-xl font-bold text-sm cursor-pointer outline-none transition-all ${complaint.status === "pending"
                    ? "border-slate-200 focus:border-blue-500"
                    : "border-green-200 bg-green-50 text-green-700"
                  }`}
              >
                <option value="pending">Mark as Pending</option>
                <option value="resolved">Mark as Resolved</option>
              </select>
            </div>
          </motion.div>
        ))}
      </div>

      {complaints.length === 0 && (
        <div className="p-20 text-center text-slate-400">
          <AlertCircle className="mx-auto mb-2" size={48} />
          <p className="font-bold"> .</p>
        </div>
      )}
    </div>
  );
};

export default ComplaintsPage;