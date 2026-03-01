import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios.js';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, User, Lock, Phone, ArrowRight, Key, Eye, EyeOff } from 'lucide-react';

const AdminRegisterPage = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    password: '',
    secretKey: '' // Added for admin verification
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sends data to your backend with the Admin role
      const response = await api.post('/auth/register', {
        ...formData,
        role: "admin"
      });

      const { token, user } = response.data;
      login(user, token);
      navigate('/admin'); // Redirect straight to Admin Dashboard
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Check your Secret Key.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-slate-200 p-10">
        <div className="text-center mb-8">
          <div className="inline-flex bg-blue-800 p-4 rounded-2xl text-white mb-4 shadow-lg shadow-blue-100">
            <ShieldCheck size={36} />
          </div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Admin Registration</h2>
          <p className="text-slate-500 mt-2 font-medium">Create a new Officer account</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-xs font-bold mb-6 border border-red-100 flex items-center gap-2">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Officer Name */}
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Officer Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                required
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-800 transition-all font-semibold"
                placeholder="Officer Name"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          </div>

          {/* Official Mobile */}
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Official Mobile ID</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="tel"
                required
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-800 transition-all font-semibold"
                placeholder="9900000000"
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              />
            </div>
          </div>

          {/* Secure Password */}
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Secure Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type={showPassword?"text":"password"}
                required
                className="w-full pl-12 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-800 transition-all font-semibold"
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

          {/* Admin Secret Key */}
          {/* Admin Secret Key Input Field */}
          <div className="relative">
            <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600" size={18} />
            <input
              type="password"
              required
              className={`w-full pl-12 pr-4 py-3 bg-blue-50 border rounded-2xl outline-none transition-all font-semibold 
      ${formData.secretKey === 'admin123' ? 'border-green-500 ring-2 ring-green-100' : 'border-blue-100'}`}
              placeholder="Enter Private Admin Key"
              onChange={(e) => setFormData({ ...formData, secretKey: e.target.value })}
            />
            {/* Show a checkmark if the key is correct */}
            {formData.secretKey === 'admin123' && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-green-600 text-xs font-bold">
                VALID KEY
              </span>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-800 hover:bg-blue-900 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-100 flex items-center justify-center gap-2 transition-all active:scale-[0.98] mt-6"
          >
            Authorize Account <ArrowRight size={18} />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <Link to="/login" className="text-slate-400 text-xs font-bold hover:text-blue-800 transition-colors uppercase tracking-widest">
            Back to Admin Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminRegisterPage;