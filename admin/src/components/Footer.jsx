import React from "react";

const AdminFooter = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-200 py-4 shadow-inner">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Branding */}
        <div className="flex items-center space-x-2">
          <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
          <p className="text-sm text-gray-600 font-medium">
            GramSeva Admin Panel <span className="text-gray-400 mx-2">|</span> 
            <span className="text-xs font-mono">v1.0.4</span>
          </p>
        </div>

        {/* Status & Links */}
        <div className="flex items-center gap-6">
          <div className="text-xs text-gray-500 flex items-center gap-1">
            <span className="font-semibold text-gray-700">System Status:</span> 
            <span className="text-green-600">Secure</span>
          </div>
          
          <nav className="flex gap-4 text-xs font-semibold text-blue-600">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Help Desk</a>
          </nav>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} Digital Gram Panchayat.
        </p>
      </div>
    </footer>
  );
};

export default AdminFooter;