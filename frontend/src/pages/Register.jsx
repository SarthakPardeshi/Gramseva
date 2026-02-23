import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios.js'; 
import { useAuth } from '../context/AuthContext'; // 1. Import your Auth hook
import { Landmark, User, Lock, Phone, ArrowRight } from 'lucide-react';

const RegisterPage = () => {
  const { login } = useAuth(); // 2. Destructure login function
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',   
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sends data to your backend
      const response = await api.post('/auth/register', {
        ...formData,
        role: "villager" // Ensure fixed role is sent
      });

      // 3. Extract token and user from backend response
      const { token, user } = response.data;

      // 4. Log them in immediately
      login(user, token);

      // 5. Redirect to Home instead of Login
      navigate('/'); 
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfbf9] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
        <div className="text-center mb-8">
          <div className="inline-flex bg-orange-500 p-3 rounded-2xl text-white mb-4 shadow-lg shadow-orange-100">
            <Landmark size={32} />
          </div>
          <h2 className="text-3xl font-bold text-slate-800">Create Account</h2>
          <p className="text-slate-500 mt-2 font-medium">Join your Digital Gram Panchayat</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-bold mb-6">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                required
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                placeholder="Aman"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          </div>

          {/* Mobile Number */}
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mobile Number</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="tel"
                required
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                placeholder="9900000000"
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="password"
                required
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                placeholder="••••••••"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-orange-200 flex items-center justify-center gap-2 transition-all active:scale-[0.98] mt-4"
          >
            Create Account <ArrowRight size={18} />
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-slate-500 font-medium">
          Already have an account? <Link to="/login" className="text-orange-600 font-bold hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;