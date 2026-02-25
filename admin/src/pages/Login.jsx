import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ShieldCheck, Lock, Phone, ArrowRight } from 'lucide-react'; // Swapped Landmark for ShieldCheck
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { useAuth } from '../context/AuthContext';

const AdminLoginPage = () => {
  const [formData, setFormData] = useState({ mobile: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const res = await axios.post(`${apiUrl}/auth/login`, formData);

      // Ensure the user logging in is actually an admin
      if (res.data.user.role !== 'admin') {
        setError('Access Denied: This portal is for administrative officers only.');
        return;
      }

      login(res.data.user, res.data.token);
      navigate('/admin'); // Redirect to Admin Dashboard instead of Home
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-slate-200 p-10"
        >
          <div className="text-center mb-10">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="inline-flex bg-blue-800 p-4 rounded-2xl text-white mb-4 shadow-lg shadow-blue-100"
            >
              <ShieldCheck size={36} />
            </motion.div>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">Admin Portal</h2>
            <p className="text-slate-500 mt-2 font-medium">Gramsevak & Officer Secure Login</p>
          </div>

          {error && (
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="bg-red-50 text-red-600 p-4 rounded-xl text-xs font-bold mb-6 flex items-center gap-2 border border-red-100"
            >
              <span>⚠️</span> {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Officer Mobile ID</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="tel"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-800 transition-all font-semibold text-slate-700"
                  placeholder="Official Mobile No."
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Secure Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="password"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-800 transition-all font-semibold text-slate-700"
                  placeholder="••••••••"
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-blue-800 hover:bg-blue-900 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-200 flex items-center justify-center gap-2 transition-all"
            >
              Access Dashboard <ArrowRight size={18} />
            </motion.button>
          </form>

          {/* <div className="mt-8 pt-6 border-t border-slate-100 text-center">
             <Link to="/login" className="text-slate-400 text-xs font-bold hover:text-blue-800 transition-colors">
               Switch to Villager Login
             </Link>
          </div> */}
          <div className="mt-8 pt-6 border-t border-slate-100 space-y-4 text-center">
            <p className="text-sm text-slate-500 font-medium">
              New Officer? <Link to="/register" className="text-blue-800 font-bold hover:underline">Register Admin Account</Link>
            </p>

            <div className="flex justify-center items-center gap-2">
              <span className="h-px w-8 bg-slate-200"></span>
              <Link to="/login" className="text-slate-400 text-xs font-bold hover:text-blue-800 transition-colors uppercase tracking-widest">
                Villager Portal
              </Link>
              <span className="h-px w-8 bg-slate-200"></span>
            </div>
          </div>


        </motion.div>
      </div>
    </PageTransition>
  );
};

export default AdminLoginPage;