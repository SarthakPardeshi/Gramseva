import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Landmark, Languages } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext'; // Import the hook

const Navbar = () => {
  const [lang, setLang] = useState('EN'); // Default language is English
  const { user, logout } = useAuth(); // Get user and logout from context
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clear the context and localStorage
    navigate('/login'); // Redirect to login page
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white px-6 py-4 flex justify-between items-center shadow-sm sticky top-0 z-50 antialiased"
    >
      {/* Animated Logo */}
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-slate-800">
          <div className="bg-orange-600 p-1.5 rounded-lg text-white">
            <Landmark size={24} />
          </div>
          <span className="hidden sm:inline">Gram Panchayat</span>
        </Link>
      </motion.div>

      {/* Navigation Links */}
      <div className="hidden md:flex gap-8 text-sm font-semibold text-gray-600">
        {[
          { path: "/", label: "Home" },
          { path: "/notices", label: "Notices" },
          { path: "/complaints", label: "Complaints" }
        ].map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) => `
              relative pb-1 transition-colors duration-300
              ${isActive ? "text-orange-600" : "hover:text-orange-600"}
            `}
          >
            {({ isActive }) => (
              <>
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>

      <div className="flex items-center gap-6">
        {/* Language Selection (Radio Style) */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setLang('EN')}
            className={`px-3 py-1.5 text-[10px] font-black rounded-lg transition-all cursor-pointer ${lang === 'EN' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
          >
            EN
          </button>
          <button
            onClick={() => setLang('MR')}
            className={`px-3 py-1.5 text-[10px] font-black rounded-lg transition-all cursor-pointer ${lang === 'MR' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
          >
            मरा
          </button>
        </div>

        {/* Login Button */}
        {user ? (
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-xs font-black text-slate-800 uppercase">{user.name}</span>
              <span className="text-[10px] font-bold text-orange-600 uppercase leading-none">{user.role}</span>
            </div>
            <button
              onClick={handleLogout}
              className="px-5 py-2.5 rounded-xl text-sm font-bold bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-300 transform active:scale-95"
            >
              Logout
            </button>
          </div>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) => `
              px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 transform active:scale-95
              ${isActive
                ? "bg-slate-900 text-white shadow-lg"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }
            `}
          >
            Login
          </NavLink>
        )}      </div>
    </motion.nav>
  );
};

export default Navbar;