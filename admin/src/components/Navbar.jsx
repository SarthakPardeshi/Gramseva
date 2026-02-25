import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LogOut, LogIn, Landmark, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/login');
  };

  const navLinks = [
    { name: "home", path: "/" },
    { name: "notices", path: "/notices" },
    { name: "complaints", path: "/complaints" }
  ];

  return (
    <nav className="bg-white shadow-md px-6 md:px-10 py-4 flex justify-between items-center sticky top-0 z-50">
      {/* Logo */}
      <div 
        className="text-xl md:text-2xl font-black text-blue-800 cursor-pointer tracking-tight flex items-center gap-2"
        onClick={() => { navigate("/"); setIsOpen(false); }}
      >
        <div className="bg-blue-800 p-1.5 rounded-lg text-white">
          <Landmark size={20} />
        </div>
        <span>GRAM <span className="text-orange-500 underline decoration-2 underline-offset-4 md:no-underline">PANCHAYAT</span></span>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8 text-gray-600 font-semibold">
        {navLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) => `
              relative pb-1 capitalize transition-all duration-200 
              ${isActive ? "text-blue-800" : "hover:text-blue-500"}
            `}
          >
            {({ isActive }) => (
              <>
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="desktop-nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-800"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}

        {user?.role === "admin" && (
          <NavLink
            to="/admin"
            className={({ isActive }) => `
              relative transition-all duration-200
              ${isActive ? "scale-105" : ""}
            `}
          >
            {({ isActive }) => (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`${
                  isActive ? "bg-blue-900" : "bg-blue-800"
                } text-white px-5 py-2 rounded-full font-bold shadow-lg text-sm`}
              >
                Admin Panel
              </motion.button>
            )}
          </NavLink>
        )}

        <div className="h-6 w-[1px] bg-gray-200 mx-2"></div>

        {user ? (
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter leading-none">Logged in</p>
              <p className="text-sm font-bold text-blue-800">{user.name}</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full font-bold text-sm border border-red-100"
            >
              <LogOut size={16} />
            </motion.button>
          </div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-full font-bold text-sm shadow-md"
          >
            Sign In <LogIn size={16} />
          </motion.button>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setIsOpen(!isOpen)} className="text-blue-800 focus:outline-none">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-[72px] left-0 w-full bg-white shadow-xl border-t border-gray-100 flex flex-col p-6 gap-6 md:hidden z-40"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => `
                  text-lg font-bold capitalize border-b pb-2 
                  ${isActive ? "text-blue-800 border-blue-800" : "text-gray-700 border-gray-50"}
                `}
              >
                {link.name}
              </NavLink>
            ))}
            
            {user?.role === "admin" && (
              <button 
                onClick={() => { navigate("/admin"); setIsOpen(false); }}
                className="bg-blue-800 text-white w-full py-3 rounded-xl font-bold"
              >
                Admin Panel
              </button>
            )}

            {user ? (
              <div className="flex flex-col gap-4">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-xs font-bold text-gray-400 uppercase">Profile</p>
                  <p className="text-lg font-bold text-blue-800">{user.name}</p>
                </div>
                <button 
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 bg-red-50 text-red-600 py-3 rounded-xl font-bold"
                >
                  Logout <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => { navigate("/login"); setIsOpen(false); }}
                className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl font-bold shadow-md"
              >
                Sign In <LogIn size={18} />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;