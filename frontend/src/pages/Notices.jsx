import React from 'react';
import { FileText, Download, Calendar, User } from 'lucide-react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';

// Define animation variants for the grid and the cards
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Each card starts 0.1s after the previous one
      delayChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 }, // Start lower and invisible
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" } 
  }
};

const NoticesPage = () => {
  const notices = [
    {
      id: 1,
      title: "New Water Supply Scheme Approved",
      type: "Scheme",
      typeColor: "bg-green-600",
      description: "Government has approved a new water supply scheme for our village. Work will begin next month.",
      date: "2026-02-15",
      author: "Gramsevak Patil"
    },
    {
      id: 2,
      title: "Gram Sabha Meeting - February 2026",
      type: "Notice",
      typeColor: "bg-blue-600",
      description: "Gram Sabha meeting scheduled for 25th February at 10 AM in the Panchayat Hall. All villagers are requested to attend.",
      date: "2026-02-12",
      author: "Sarpanch Deshmukh"
    },
    {
      id: 3,
      title: "GR: PM Awas Yojana Guidelines Updated",
      type: "GR",
      typeColor: "bg-orange-600",
      description: "Updated guidelines for PM Awas Yojana have been published. Eligible families can apply at the Panchayat office.",
      date: "2026-02-10",
      author: "Gramsevak Patil"
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#f8fafc] pb-20">
        <div className="max-w-7xl mx-auto px-6 pt-12">
          {/* Animated Title */}
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold text-slate-800 mb-8"
          >
            Village Notices & GRs
          </motion.h1>
          
          {/* Animated Grid Container */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {notices.map((notice) => (
              <motion.div 
                key={notice.id} 
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.2 } }} // Lift effect on hover
                className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-shadow flex flex-col cursor-default"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-orange-50 p-2 rounded-lg text-orange-600">
                    <FileText size={20} />
                  </div>
                  <span className={`${notice.typeColor} text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider`}>
                    {notice.type}
                  </span>
                </div>
              
                <h3 className="font-bold text-slate-800 text-lg mb-2 leading-tight">
                  {notice.title}
                </h3>
                
                <p className="text-gray-500 text-sm mb-6 flex-grow">
                  {notice.description}
                </p>

                <div className="pt-4 border-t border-slate-50 flex flex-col gap-3">
                  <div className="flex items-center justify-between text-[11px] text-gray-400">
                    <span className="flex items-center gap-1"><Calendar size={12}/> {notice.date}</span>
                    <span className="flex items-center gap-1"><User size={12}/> {notice.author}</span>
                  </div>
                  
                  {/* Animated Download Button */}
                  <motion.button 
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center gap-2 text-orange-600 font-bold text-xs uppercase hover:bg-orange-50 py-2 rounded-lg transition cursor-pointer"
                  >
                    <Download size={14} /> Download
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default NoticesPage;