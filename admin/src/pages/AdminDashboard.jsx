import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Page Imports
import HomePage from "./HomePage";
import NoticesPage from "./NoticesPage";
import ComplaintsPage from "./ComplaintsPage";

const AdminDashboard = () => {
  const [activeNav, setActiveNav] = useState("home"); // Default landing page
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 font-sans">
      

      {/* ================= MAIN CONTENT AREA ================= */}
      <main className="flex-1 px-6 md:px-12 py-8">
        <AnimatePresence mode="wait">
          
          {/* 1. HOME VIEW */}
          {activeNav === "home" && (
            <motion.div key="home" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <HomePage />
            </motion.div>
          )}

          {/* 2. NOTICES VIEW */}
          {activeNav === "notices" && (
            <motion.div key="notices" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <NoticesPage />
            </motion.div>
          )}

          {/* 3. COMPLAINTS VIEW (Public/User View) */}
          {activeNav === "complaints" && (
            <motion.div key="complaints" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <ComplaintsPage />
            </motion.div>
          )}

          {/* 4. ADMIN PANEL VIEW (Gramsevak Dashboard) */}
          {activeNav === "admin" && (
            <motion.div 
              key="admin" 
              initial={{ opacity: 0, scale: 0.98 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.98 }}
              className="space-y-8"
            >
              {/* Admin Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm">
                <div>
                  <h2 className="text-3xl font-extrabold text-gray-800">Gramsevak Dashboard</h2>
                  <p className="text-gray-500">Welcome back! Here is what's happening in the village.</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg flex items-center gap-2"
                >
                  <span>+</span> Post New Notice
                </motion.button>
              </div>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total Complaints" value="12" />
                <StatCard title="Pending Review" value="05" color="text-yellow-500" />
                <StatCard title="Resolved Cases" value="07" color="text-green-600" />
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
                  {activeTab === "overview" ? (
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
                  ) : (
                    <motion.div
                      key="manage"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                    >
                      <h3 className="text-2xl font-bold mb-4">Incoming Complaints</h3>
                      <div className="border-2 border-dashed border-gray-200 rounded-2xl p-10 text-center text-gray-400">
                        Detailed complaint list and status controls will appear here.
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-slate-900 text-slate-300 px-10 py-12 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <h4 className="text-white font-bold text-xl">Digital Gram Panchayat</h4>
            <p className="text-sm leading-relaxed opacity-70">
              Transforming rural governance through transparency and technology. 
              Connecting every citizen to the heart of administration.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-white font-bold text-xl">Helpline</h4>
            <p className="text-sm">📞 Toll Free: 1800-123-4567</p>
            <p className="text-sm">📧 Email: support.panchayat@gov.in</p>
          </div>
          <div className="space-y-4">
            <h4 className="text-white font-bold text-xl">Useful Links</h4>
            <ul className="text-sm space-y-2">
              <li className="hover:text-orange-400 cursor-pointer transition">State Welfare Schemes</li>
              <li className="hover:text-orange-400 cursor-pointer transition">Land Records (7/12)</li>
              <li className="hover:text-orange-400 cursor-pointer transition">E-Tendering Portal</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-10 pt-6 text-center text-xs opacity-50">
          © 2026 Digital Village Initiative. All Rights Reserved.
        </div>
      </footer>
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
    className={`px-6 py-2 rounded-lg font-bold transition-all duration-200 ${
      active 
        ? "bg-white text-blue-700 shadow-sm" 
        : "text-gray-500 hover:text-gray-700"
    }`}
  >
    {label}
  </button>
);

export default AdminDashboard;