import React from 'react';
import { FileText, MessageSquare, Users, Landmark, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { NavLink, Link } from 'react-router-dom';




// Variants for staggered entrance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const Home = () => {
  return (
    <PageTransition>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Hero Section with Internal Staggered Animation */}
        <header className="bg-orange-500 py-24 px-4 text-center text-white">
          <motion.h1 variants={itemVariants} className="text-5xl font-black mb-4">
            Digital Gram Panchayat
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl opacity-90 mb-10 font-medium">
            Connecting villages with transparent governance
          </motion.p>
          <motion.div variants={itemVariants} className="flex justify-center gap-4">
            {/* Link to Notices Page */}
            <NavLink to="/notices">
              <button className="bg-white text-orange-600 px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-gray-100 transition active:scale-95 cursor-pointer">
                View Notices
              </button>
            </NavLink>

            {/* Link to Complaints Page */}
            <NavLink to="/complaints">
              <button className="bg-orange-700/30 border border-white/40 px-8 py-3 rounded-xl font-bold backdrop-blur-sm hover:bg-orange-700/50 transition active:scale-95 cursor-pointer">
                File Complaint
              </button>
            </NavLink>
          </motion.div>        </header>

        {/* Stats Cards - These will slide up after the hero */}
        <motion.div
          variants={itemVariants}
          className="max-w-6xl mx-auto -mt-10 px-4 grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { label: 'Villagers', count: '2,450', icon: <Users className="text-orange-600" /> },
            { label: 'Notices', count: '156', icon: <FileText className="text-orange-600" /> },
            { label: 'Complaints', count: '89', icon: <MessageSquare className="text-orange-600" /> },
            { label: 'Schemes', count: '12', icon: <Landmark className="text-orange-600" /> },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }} // Subtle hover lift
              className="bg-white p-6 rounded-3xl shadow-xl border border-gray-50 flex flex-col items-center"
            >
              <div className="p-3 bg-orange-50 rounded-2xl mb-3">{stat.icon}</div>
              <span className="text-3xl font-black text-slate-800">{stat.count}</span>
              <span className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-1">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Notices Section */}
        <section className="max-w-6xl mx-auto py-20 px-4">
          <motion.div variants={itemVariants} className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Village Notices & GRs</h2>
              <p className="text-gray-500 mt-1">Stay updated with the latest government resolutions</p>
            </div>
            {/* <button className="text-orange-600 font-bold hover:underline cursor-pointer">View All Notifications</button> */}
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm"
            >
              <span className="bg-green-100 text-green-700 text-[10px] font-black px-2 py-1 rounded uppercase">New Scheme</span>
              <h4 className="mt-4 font-bold text-lg text-slate-800 leading-tight">New Solar Pump Subsidy for Farmers 2026</h4>
              <p className="text-sm text-gray-500 mt-2 line-clamp-2">Eligible farmers can now apply for 90% subsidy on solar pump installations...</p>
              <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center">
                <span className="text-[10px] font-bold text-gray-400 italic">By Gramsevak Patil</span>
                <button className="text-orange-600 text-xs font-bold flex items-center gap-1 hover:bg-orange-50 p-2 rounded-lg transition-colors cursor-pointer">
                  <Download size={14} /> DOWNLOAD PDF
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </PageTransition>
  );
};

export default Home;