import React from "react";
import { motion } from "framer-motion";

const HomePage = () => {
  const features = [
    { title: "Birth Certificate", desc: "Apply and download online.", icon: "📝" },
    { title: "Property Tax", desc: "Pay your dues securely.", icon: "🏠" },
    { title: "Water Connection", desc: "Request new pipe lines.", icon: "🚰" },
    { title: "Schemes", desc: "View government subsidies.", icon: "🌾" },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-3xl p-10 text-white mb-12 shadow-xl"
      >
        <div className="md:w-2/3">
          <h1 className="text-4xl font-bold mb-4">Welcome to Digital Gram Panchayat</h1>
          <p className="text-blue-100 text-lg mb-6">
            Access all village services, lodge complaints, and stay updated with 
            the latest government notices—all from your home.
          </p>
          <button className="bg-white text-blue-700 px-6 py-3 rounded-full font-bold hover:bg-blue-50 transition">
            Explore Services
          </button>
        </div>
      </motion.section>

      {/* Quick Services Grid */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        {features.map((f, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center cursor-pointer hover:shadow-md transition"
          >
            <div className="text-4xl mb-3">{f.icon}</div>
            <h3 className="font-bold text-gray-800 mb-1">{f.title}</h3>
            <p className="text-gray-500 text-sm">{f.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* News & Updates Section */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            📢 Latest Announcements
          </h3>
          <ul className="space-y-4">
            <li className="border-l-4 border-orange-500 pl-4">
              <p className="text-sm text-gray-400">Oct 24, 2023</p>
              <p className="font-medium">Gram Sabha meeting scheduled for Sunday at 10 AM.</p>
            </li>
            <li className="border-l-4 border-blue-500 pl-4">
              <p className="text-sm text-gray-400">Oct 22, 2023</p>
              <p className="font-medium">New vaccination drive starting at the local clinic.</p>
            </li>
          </ul>
        </div>

        <div className="bg-orange-50 p-8 rounded-2xl border border-orange-100">
          <h3 className="text-xl font-bold text-orange-800 mb-2">Need Help?</h3>
          <p className="text-orange-700 mb-4">
            If you are facing issues with water supply or street lights, 
            please use our digital complaint system.
          </p>
          <button className="text-orange-800 font-bold underline hover:text-orange-600">
            File a Complaint →
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;