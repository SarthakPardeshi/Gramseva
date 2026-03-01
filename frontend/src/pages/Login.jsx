import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Landmark, Lock, Phone, ArrowRight, Eye, EyeOff } from 'lucide-react'; 
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { useAuth } from '../context/AuthContext'; // Imported to update global state

const LoginPage = () => {
  // Changed email to mobile
  const [formData, setFormData] = useState({ mobile: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // Destructured the login function

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await axios.post(`${apiUrl}/auth/login`, formData);

      // Update global context AND localStorage simultaneously 
      login(res.data.user, res.data.token);

      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#fdfbf9] flex items-center justify-center p-6">
        {/* Animated Form Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-10"
        >
          <div className="text-center mb-10">
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex bg-orange-500 p-3 rounded-2xl text-white mb-4 shadow-lg shadow-orange-100"
            >
              <Landmark size={32} />
            </motion.div>
            <h2 className="text-3xl font-bold text-slate-800">Welcome Back</h2>
            <p className="text-slate-500 mt-2 font-medium">Digital Gram Panchayat Login</p>
          </div>

          {error && (
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold mb-6 flex items-center gap-2"
            >
              <span>⚠️</span> {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Updated Mobile Number Field */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Mobile Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="tel"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 transition-all font-medium"
                  placeholder="9900000000"
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type={showPassword?"text":"password"}
                  required
                  className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 transition-all font-medium"
                  placeholder="••••••••"
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <div
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-orange-200 flex items-center justify-center gap-2 transition-all"
            >
              Sign In <ArrowRight size={18} />
            </motion.button>
          </form>

          <p className="text-center mt-8 text-sm text-slate-500 font-medium">
            New to the portal? <Link to="/register" className="text-orange-600 font-bold hover:underline">Create Account</Link>
          </p>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default LoginPage;