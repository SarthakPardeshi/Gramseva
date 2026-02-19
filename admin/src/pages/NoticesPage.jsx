import React from "react";
import { motion } from "framer-motion";

const NoticesPage = () => {
  const notices = [
    {
      id: 1,
      date: "Oct 25, 2023",
      title: "Monthly Gram Sabha Meeting",
      category: "Meeting",
      description: "Discussion on new water pipeline project and annual budget approval.",
      urgent: true,
    },
    {
      id: 2,
      date: "Oct 22, 2023",
      title: "Free Vaccination Camp",
      category: "Health",
      description: "Health department is organizing a free check-up and vaccination drive at the primary school.",
      urgent: false,
    },
    {
      id: 3,
      date: "Oct 18, 2023",
      title: "Agriculture Subsidy 2023",
      category: "Scheme",
      description: "Last date to apply for the organic fertilizer subsidy is coming up soon.",
      urgent: false,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Official Notice Board</h2>
        <p className="text-gray-500 mt-2">Stay updated with the latest village announcements</p>
      </div>

      <div className="grid gap-6">
        {notices.map((notice, index) => (
          <motion.div
            key={notice.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-sm border-l-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-l-blue-600 hover:shadow-md transition"
            style={{ borderLeftColor: notice.urgent ? "#ef4444" : "#2563eb" }}
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                  {notice.date}
                </span>
                <span className={`px-3 py-0.5 rounded-full text-xs font-bold ${
                  notice.urgent ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
                }`}>
                  {notice.category}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">{notice.title}</h3>
              <p className="text-gray-600">{notice.description}</p>
            </div>

            <div className="flex gap-3">
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition">
                View Details
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
                Download PDF
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NoticesPage;