import React from 'react';
import { useAuth } from '../context/AuthContext'; 
import { useNavigate } from 'react-router-dom';
import { LogOut, LogIn, Landmark } from 'lucide-react';
import { motion } from 'framer-motion'; // Added missing motion import

const Navbar = () => {
  const { user, logout } = useAuth(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md px-10 py-4 flex justify-between items-center sticky top-0 z-50">
      {/* Logo */}
      <h1 
        className="text-2xl font-black text-blue-800 cursor-pointer tracking-tight flex items-center gap-2"
        onClick={() => navigate("/")}
      >
        <div className="bg-blue-800 p-1.5 rounded-lg text-white">
          <Landmark size={20} />
        </div>
        <span>GRAM <span className="text-orange-500">PANCHAYAT</span></span>
      </h1>

      {/* Desktop Navigation */}
      <div className="flex items-center gap-8 text-gray-600 font-semibold">
        {["home", "notices", "complaints"].map((item) => (
          <span
            key={item}
            onClick={() => navigate(item === "home" ? "/" : `/${item}`)}
            className="cursor-pointer capitalize transition-all duration-200 border-b-2 border-transparent hover:text-blue-500 hover:border-blue-500"
          >
            {item}
          </span>
        ))}

        {/* Admin Panel Toggle - Only show if user is admin */}
        {user?.role === "admin" && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/admin")}
            className="bg-blue-800 text-white px-5 py-2 rounded-full font-bold shadow-lg"
          >
            Admin Panel
          </motion.button>
        )}

        <div className="h-6 w-[1px] bg-gray-200 mx-2"></div>

        {/* Dynamic Login/Logout Button */}
        {user ? (
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter leading-none">Logged in as</p>
              <p className="text-sm font-bold text-blue-800">{user.name}</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-50 text-red-600 px-5 py-2 rounded-full font-bold text-sm border border-red-100 hover:bg-red-100 transition-all"
            >
              Logout <LogOut size={16} />
            </motion.button>
          </div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-full font-bold text-sm shadow-md hover:bg-blue-700 transition-all"
          >
            Sign In <LogIn size={16} />
          </motion.button>
        )}
      </div>
    </nav>
  );
};

export default Navbar; // The fix: adding the default export