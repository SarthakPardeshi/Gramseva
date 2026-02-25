import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { FileText, MessageSquare, Users, Landmark, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

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
  const { t } = useLanguage();

  // Unified state for real-time stats
  const [stats, setStats] = useState({
    villagers: 1569, // Static for now, update if you create a /users endpoint
    notices: 0,
    complaints: 0,
    schemes: 0
  });

  const [recentNotices, setRecentNotices] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch Stats and Notices in parallel for better performance
        const [statsRes, noticesRes] = await Promise.all([
          api.get('/stats'),
          api.get('/notices')
        ]);

        const statsData = statsRes.data;
        const noticesData = noticesRes.data;

        // Update counts based on the fetched stats
        setStats({
          villagers: statsData.villagers ?? 1569,
          notices: statsData.notices ?? noticesData.length,
          complaints: statsData.complaints ?? 0,
          schemes: statsData.schemes ?? noticesData.filter(n => n.type === "Scheme").length
        });

        // Set the 3 most recent notices for the bottom section
        setRecentNotices(noticesData.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <PageTransition>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Hero Section */}
        <header className="bg-orange-500 py-24 px-4 text-center text-white">
          <motion.h1 variants={itemVariants} className="text-5xl font-black mb-4">
            {t('hero_title')}
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl opacity-90 mb-10 font-medium">
            {t('hero_subtitle')}
          </motion.p>
          <motion.div variants={itemVariants} className="flex justify-center gap-4">
            <NavLink to="/notices">
              <button className="bg-white text-orange-600 px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-gray-100 transition active:scale-95 cursor-pointer">
                {t('btn_notices')}
              </button>
            </NavLink>
            <NavLink to="/complaints">
              <button className="bg-orange-700/30 border border-white/40 px-8 py-3 rounded-xl font-bold backdrop-blur-sm hover:bg-orange-700/50 transition active:scale-95 cursor-pointer">
                {t('btn_complaint')}
              </button>
            </NavLink>
          </motion.div>
        </header>

        {/* Dynamic Stats Cards */}
        <motion.div
          variants={itemVariants}
          className="max-w-6xl mx-auto -mt-10 px-4 grid grid-cols-2 lg:grid-cols-4 gap-6 relative z-10"
        >
          {[
            { label: 'Villagers', count: stats.villagers, icon: <Users className="text-orange-600" /> },
            { label: 'Notices', count: stats.notices, icon: <FileText className="text-orange-600" /> },
            { label: 'Complaints', count: stats.complaints, icon: <MessageSquare className="text-orange-600" /> },
            { label: 'Schemes', count: stats.schemes, icon: <Landmark className="text-orange-600" /> },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-3xl shadow-xl border border-gray-50 flex flex-col items-center"
            >
              <div className="p-3 bg-orange-50 rounded-2xl mb-3">{stat.icon}</div>
              <span className="text-3xl font-black text-slate-800">{stat.count}</span>
              <span className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-1 text-center">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Recent Notices Section */}
        <section className="max-w-6xl mx-auto py-20 px-4">
          <motion.div variants={itemVariants} className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Village Notices & GRs</h2>
              <p className="text-gray-500 mt-1">Stay updated with the latest government resolutions</p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentNotices.length > 0 ? (
              recentNotices.map((notice) => (
                <motion.div
                  key={notice._id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex-grow">
                    <span className={`text-[10px] font-black px-2 py-1 rounded uppercase ${notice.type === 'Scheme' ? 'bg-green-100 text-green-700' :
                      notice.type === 'Government GR' ? 'bg-blue-100 text-blue-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                      {notice.type || "Notice"}
                    </span>
                    <h4 className="mt-4 font-bold text-lg text-slate-800 leading-tight line-clamp-2">
                      {notice.title?.en ?? (typeof notice.title === 'string' ? notice.title : "Untitled Notice")}
                    </h4>
                    <p className="text-sm text-gray-500 mt-2 line-clamp-3">
                      {notice.description?.en ?? (typeof notice.description === 'string' ? notice.description : "No description provided.")}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center">
                    <span className="text-[10px] font-bold text-gray-400 italic">
                      By {notice.createdBy?.name || "Gram Panchayat"}
                    </span>
                    <button className="text-orange-600 text-[10px] font-bold flex items-center gap-1 hover:bg-orange-50 p-2 rounded-lg transition-colors cursor-pointer tracking-wider">
                      <Download size={14} /> PDF
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center p-10 bg-white rounded-2xl col-span-full border border-gray-100 text-gray-500 font-medium">
                No recent notices published.
              </div>
            )}
          </div>
        </section>
      </motion.div>
    </PageTransition>
  );
};

export default Home;