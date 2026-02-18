import React from 'react';
import { Upload, Send, Clock, CheckCircle, AlertCircle, Pointer } from 'lucide-react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';

// Animation variants for the container and items
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
};

const listVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
};

const ComplaintsPage = () => {
  const myComplaints = [
    {
      id: "C001",
      title: "Broken road near primary school",
      description: "The road near the village primary school has many potholes causing accidents.",
      date: "2026-02-08",
      category: "Roads",
      status: "In Progress",
      statusStyle: "bg-blue-100 text-blue-600",
      icon: <Clock size={14} />
    },
    {
      id: "C002",
      title: "Irregular water supply",
      description: "Water supply has been irregular for the past 2 weeks in Ward No. 3.",
      date: "2026-02-14",
      category: "Water",
      status: "Pending",
      statusStyle: "bg-orange-100 text-orange-600",
      icon: <AlertCircle size={14} />
    },
    {
      id: "C003",
      title: "Street light not working",
      description: "Street light near the temple has been non-functional for a month.",
      date: "2026-01-20",
      category: "Electricity",
      status: "Resolved",
      statusStyle: "bg-green-100 text-green-600",
      icon: <CheckCircle size={14} />
    }
  ];

  return (
    <PageTransition>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="min-h-screen bg-[#fdfbf9] py-12 px-6"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Left Side: Submit Form */}
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold text-slate-800 mb-8">Submit a Complaint</h2>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <form className="space-y-6">
                <div className=' '>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
                  <select className=" w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all cursor-pointer">
                    <option className='cursor-pointer'>-- Select Category --</option>
                    <option>Water Supply</option>
                    <option>Roads & Infrastructure</option>
                    <option>Electricity</option>
                    <option>Sanitation</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Subject</label>
                  <input type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500" placeholder="Brief title of the issue" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                  <textarea rows="4" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500" placeholder="Describe the problem in detail..."></textarea>
                </div>

             <div>
  <label className="block text-sm font-bold text-slate-700 mb-2">Attach Photo Proof</label>
  
  {/* The Label is now the primary interactive container */}
  <label 
    htmlFor="file-upload" 
    className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-orange-500 hover:border-orange-200 cursor-pointer transition-all group"
  >
    <Upload size={32} className="mb-2 group-hover:scale-110 transition-transform" />
    
    {/* This span replaces the ugly default "No file chosen" text */}
    <span className="text-sm font-medium">Click to upload photo</span>
    
    {/* The Input is hidden so it doesn't mess up your alignment */}
    <input 
      type="file" 
      id="file-upload" 
      name="filename" 
      className="hidden" 
      accept="image/*"
      onChange={(e) => console.log(e.target.files[0]?.name)} 
    />
  </label>
</div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-200 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Send size={18} /> Submit Complaint
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Right Side: Track Status */}
          <motion.div variants={listVariants}>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-slate-800">Track My Complaints</h2>
              <button className="text-orange-500 text-sm font-bold flex items-center gap-1">
              </button>
            </div>

            <div className="space-y-4">
              {myComplaints.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  whileHover={{ x: 10 }}
                  className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow cursor-default"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-bold text-slate-400 tracking-widest">{item.id}</span>
                    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${item.statusStyle}`}>
                      {item.icon} {item.status}
                    </div>
                  </div>
                  <h4 className="font-bold text-slate-800 mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">{item.description}</p>
                  <div className="text-[11px] text-gray-400 font-medium">
                    {item.date} • <span className="text-slate-600">{item.category}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </PageTransition>
  );
};

export default ComplaintsPage;