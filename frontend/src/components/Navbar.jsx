import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Landmark } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { lang, setLang, t } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { path: "/", label: t('nav_home') },
    { path: "/notices", label: t('nav_notices') },
    { path: "/complaints", label: t('nav_complaints') }
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white px-6 py-4 flex justify-between items-center shadow-sm sticky top-0 z-50 antialiased"
    >
      {/* Logo */}
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-slate-800">
          <div className="bg-orange-600 p-1.5 rounded-lg text-white">
            <Landmark size={24} />
          </div>
          <span className="hidden sm:inline tracking-tight">{t('gram_panchayat')}</span>
        </Link>
      </motion.div>

      {/* Navigation Links with Sliding Underline */}
      <div className="hidden md:flex gap-8 text-sm font-bold text-gray-500">
        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) => `
              relative py-1 transition-colors duration-300
              ${isActive ? "text-orange-600" : "hover:text-orange-600"}
            `}
          >
            {({ isActive }) => (
              <>
                <span>{link.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange-600 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>

      <div className="flex items-center gap-6">
        {/* Language Selection */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
          {['EN', 'MR'].map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-3 py-1.5 text-[10px] font-black rounded-lg transition-all cursor-pointer ${
                lang === l ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {l === 'MR' ? 'मरा' : 'EN'}
            </button>
          ))}
        </div>

        {/* User Profile / Login */}
        {user ? (
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-xs font-black text-slate-800 uppercase tracking-tighter">
                {user.name}
              </span>
              <span className="text-[9px] font-bold text-orange-600 uppercase leading-none tracking-widest">
                {user.role}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-red-50 text-red-600 hover:bg-red-100 transition-all active:scale-95 shadow-sm border border-red-100"
            >
              {t('nav_logout')}
            </button>
          </div>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) => `
              px-5 py-2.5 rounded-xl text-xs font-black transition-all transform active:scale-95
              ${isActive ? "bg-slate-900 text-white shadow-lg" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}
            `}
          >
            {t('nav_login')}
          </NavLink>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;