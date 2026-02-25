import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Ensure react-router-dom is installed

const HomePage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 my-14">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-3xl p-10 text-white mb-12 shadow-xl"
      >
        <div className="md:w-2/3 mt-20">
          <h1 className="text-4xl font-bold mb-4">Welcome to Digital Gram Panchayat</h1>
          <p className="text-blue-100 text-lg mb-6">
            Access all village services, lodge complaints, and stay updated with 
            the latest government notices—all from your home.
          </p>
          
        </div>
      </motion.section>

      {/* Main Actions Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Notices Panel Redirect */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between"
        >
          <div>
            <h3 className="text-2xl font-bold mb-3 flex items-center gap-2 text-gray-800">
              📢 Official Notices
            </h3>
            <p className="text-gray-600 mb-6">
              View the latest updates, government orders, and community announcements 
              relevant to our village.
            </p>
          </div>
          <Link 
            to="/notices" 
            className="bg-blue-600 text-white text-center py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Open Notice Panel
          </Link>
        </motion.div>

        {/* Complaints Panel Redirect */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-orange-50 p-8 rounded-2xl border border-orange-100 flex flex-col justify-between"
        >
          <div>
            <h3 className="text-2xl font-bold mb-3 flex items-center gap-2 text-orange-800">
              🛠️ Complaint Center
            </h3>
            <p className="text-orange-700 mb-6">
              Report issues regarding water supply, electricity, or roads. 
              Track your complaint status in real-time.
            </p>
          </div>
          <Link 
            to="/complaints" 
            className="bg-orange-600 text-white text-center py-3 rounded-xl font-semibold hover:bg-orange-700 transition"
          >
            File or View Complaints
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;