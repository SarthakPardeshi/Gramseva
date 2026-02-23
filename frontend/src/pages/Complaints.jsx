import React, { useState, useEffect } from 'react';
import { Upload, Send, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import api from '../api/axios.js'; // Your custom axios instance with interceptors

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

const ComplaintsPage = () => {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [myComplaints, setMyComplaints] = useState([]);

  // Fetch your personal complaints on mount
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await api.get('/complaints/my');
        setMyComplaints(res.data);
      } catch (err) {
        console.error("Error fetching your complaints", err);
      }
    };
    fetchComplaints();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // FormData is required for file uploads
    const formData = new FormData();
    formData.append('category', category);
    formData.append('description', description);

    // Status is 'pending' by default in backend, but we can send it explicitly 
    // though the backend should handle this for security.
    if (image) formData.append('image', image);

    try {
      // Axios interceptor automatically attaches the Bearer token!
      await api.post('/complaints', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert("Complaint submitted successfully! Status is set to Pending.");

      // Reset form
      setCategory('');
      setDescription('');
      setImage(null);

      // Refresh list (optional)
      const res = await api.get('/complaints/my');
      setMyComplaints(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit complaint.");
    } finally {
      setLoading(false);
    }
  };

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
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Category Selection */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
                  <select
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all cursor-pointer"
                  >
                    <option value="">-- Select Category --</option>
                    <option value="water">Water Supply</option>
                    <option value="road">Roads & Infrastructure</option>
                    <option value="light">Electricity/Street Lights</option>
                    <option value="drainage">Sanitation & Drainage</option>
                    <option value="other">Other</option>                  </select>
                </div>

                {/* Description Textarea */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                  <textarea
                    required
                    rows="6"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Describe the problem in detail..."
                  ></textarea>
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Attach Photo Proof</label>
                  <label
                    htmlFor="file-upload"
                    className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center transition-all group cursor-pointer ${image ? 'border-green-500 bg-green-50 text-green-600' : 'border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-orange-500'
                      }`}
                  >
                    <Upload size={32} className="mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">
                      {image ? image.name : "Click to upload photo"}
                    </span>
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </label>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-200 flex items-center justify-center gap-2 transition-all disabled:bg-slate-300"
                >
                  <Send size={18} /> {loading ? "Uploading..." : "Submit Complaint"}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Right Side: Track Status */}
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold text-slate-800 mb-8">My Active Complaints</h2>
            <div className="space-y-4">
              {myComplaints.length > 0 ? myComplaints.map((item) => (
                <div key={item._id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">#{item._id.slice(-6)}</span>
                    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase ${item.status === 'resolved' ? 'bg-green-100 text-green-600' :
                        item.status === 'in-progress' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'
                      }`}>
                      {item.status === 'resolved' ? <CheckCircle size={12} /> : <Clock size={12} />} {item.status}
                    </div>
                  </div>
                  <h4 className="font-bold text-slate-800 mb-1 capitalize">{item.category}</h4>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-3">{item.description}</p>
                  <div className="text-[11px] text-gray-400 font-medium">
                    {new Date(item.createdAt).toLocaleDateString()} • <span className="text-slate-600">Pending Review</span>
                  </div>
                </div>
              )) : (
                <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
                  <p className="text-slate-400 italic">You haven't submitted any complaints yet.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </PageTransition>
  );
};

export default ComplaintsPage;