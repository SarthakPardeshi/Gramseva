import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api/axios";

// Page Imports
import ComplaintsPage from "./ComplaintsPage"; // the actual Complaints panel

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const [stats, setStats] = useState({ total: 0, pending: 0, resolved: 0 });
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [noticeData, setNoticeData] = useState({ title: "", description: "" });
  const [postingNotice, setPostingNotice] = useState(false);

  const handlePostNotice = async (e) => {
    e.preventDefault();
    setPostingNotice(true);
    try {
      await api.post("/notices", {
        title: { en: noticeData.title },
        description: { en: noticeData.description }
      });
      setShowNoticeModal(false);
      setNoticeData({ title: "", description: "" });
      alert("Notice posted successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to post notice.");
    } finally {
      setPostingNotice(false);
    }
  };

  useEffect(() => {
    // Fetch stats on load
    api.get("/complaints")
      .then(res => {
        const complaints = res.data;
        const total = complaints.length;
        const pending = complaints.filter(c => c.status === "pending").length;
        const resolved = complaints.filter(c => c.status === "resolved").length;
        setStats({ total, pending, resolved });
      })
      .catch(err => console.error("Could not fetch stats:", err));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 font-sans">
      {/* MAIN CONTENT AREA */}
      <main className="flex-1 px-6 md:px-12 py-8">
        <motion.div
          key="admin"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          className="space-y-8 max-w-7xl mx-auto"
        >
          {/* Admin Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-800">Gramsevak Dashboard</h2>
              <p className="text-gray-500">Welcome back! Here is what's happening in the village.</p>
            </div>
            <motion.button
              onClick={() => setShowNoticeModal(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg flex items-center gap-2"
            >
              <span>+</span> Post New Notice
            </motion.button>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard title="Total Complaints" value={stats.total} />
            <StatCard title="Pending Review" value={stats.pending} color="text-yellow-500" />
            <StatCard title="Resolved Cases" value={stats.resolved} color="text-green-600" />
          </div>

          {/* Internal Admin Navigation (Tabs) */}
          <div className="flex gap-2 p-1 bg-gray-200 rounded-xl w-fit">
            <TabButton
              label="Overview"
              active={activeTab === "overview"}
              onClick={() => setActiveTab("overview")}
            />
            <TabButton
              label="Manage Complaints"
              active={activeTab === "manage"}
              onClick={() => setActiveTab("manage")}
            />
          </div>

          {/* Dynamic Admin Content */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 min-h-[400px]">
            <AnimatePresence mode="wait">
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                >
                  <h3 className="text-2xl font-bold mb-4">Village Overview</h3>
                  <p className="text-gray-500 leading-relaxed">
                    The village current population census is pending. 85% of street lighting
                    complaints were resolved this week. Water supply is scheduled for Sector A
                    tomorrow at 6:00 AM.
                  </p>
                </motion.div>
              )}
              {activeTab === "manage" && (
                <motion.div
                  key="manage"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                >
                  <ComplaintsPage />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* POST NOTICE MODAL */}
        <AnimatePresence>
          {showNoticeModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            >
              <motion.div
                initial={{ y: 50, scale: 0.9 }}
                animate={{ y: 0, scale: 1 }}
                exit={{ y: 50, scale: 0.9 }}
                className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl"
              >
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Post New Notice</h3>
                <form onSubmit={handlePostNotice} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Notice Title</label>
                    <input
                      required
                      value={noticeData.title}
                      onChange={e => setNoticeData({ ...noticeData, title: e.target.value })}
                      className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                      placeholder="e.g., Gram Sabha Meeting Tomorrow"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Notice Description</label>
                    <textarea
                      required
                      rows={5}
                      value={noticeData.description}
                      onChange={e => setNoticeData({ ...noticeData, description: e.target.value })}
                      className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Provide the official details to the villagers..."
                    />
                  </div>
                  <div className="flex gap-4 pt-4 mt-2 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setShowNoticeModal(false)}
                      className="flex-1 px-4 py-3 rounded-xl font-bold bg-gray-100 text-gray-600 hover:bg-gray-200 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={postingNotice}
                      className="flex-1 px-4 py-3 rounded-xl font-bold bg-orange-500 text-white hover:bg-orange-600 disabled:bg-orange-300 shadow-md cursor-pointer disabled:cursor-not-allowed"
                    >
                      {postingNotice ? "Publishing..." : "Publish Live Notice"}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

 
    </div>
  );
};

/* ================= COMPONENT: STAT CARD ================= */
const StatCard = ({ title, value, color = "text-gray-800" }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center"
  >
    <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">{title}</p>
    <h3 className={`text-5xl font-black ${color}`}>{value}</h3>
  </motion.div>
);

/* ================= COMPONENT: TAB BUTTON ================= */
const TabButton = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-6 py-2 rounded-lg font-bold transition-all duration-200 cursor-pointer ${active
        ? "bg-white text-blue-700 shadow-sm"
        : "text-gray-500 hover:text-gray-700"
      }`}
  >
    {label}
  </button>
);

export default AdminDashboard;