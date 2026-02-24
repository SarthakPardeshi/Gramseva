import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api/axios";

const NoticesPage = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [noticeData, setNoticeData] = useState({ title: "", description: "" });
  const [postingNotice, setPostingNotice] = useState(false);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const { data } = await api.get("/notices");
      setNotices(data);
    } catch (error) {
      console.error("Failed to fetch notices:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostNotice = async (e) => {
    e.preventDefault();
    setPostingNotice(true);
    try {
      await api.post("/notices", {
        title: { en: noticeData.title },
        description: { en: noticeData.description }
      });
      setShowNoticeModal(false);
      setNoticeData({ title: "", description: "" });
      alert("Notice posted successfully!");
      fetchNotices(); // Refresh the list after posting
    } catch (error) {
      console.error(error);
      alert("Failed to post notice.");
    } finally {
      setPostingNotice(false);
    }
  };

  if (loading) return <div className="text-center font-bold text-gray-400 mt-10">Loading notices...</div>;

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="mb-10 flex flex-col sm:flex-row justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div className="text-center sm:text-left">
          <h2 className="text-3xl font-extrabold text-gray-800">Official Notice Board</h2>
          <p className="text-gray-500 mt-2 font-medium">Manage and view all village announcements</p>
        </div>
        <motion.button
          onClick={() => setShowNoticeModal(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 sm:mt-0 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg flex items-center gap-2 transition"
        >
          <span>+</span> Post New Notice
        </motion.button>
      </div>

      <div className="grid gap-6">
        {notices.length === 0 ? (
          <div className="text-center text-gray-400 p-10 bg-white rounded-2xl shadow-sm">No notices have been published yet.</div>
        ) : (
          notices.map((notice, index) => (
            <motion.div
              key={notice._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-sm border-l-8 flex flex-col md:flex-row md:items-start justify-between gap-4 border-l-blue-600 hover:shadow-md transition"
              style={{ borderLeftColor: "#2563eb" }}
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                    {new Date(notice.createdAt).toLocaleDateString()}
                  </span>
                  <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-600">
                    Official Notice
                  </span>
                </div>
                {/* Fallback to english translation if multi-lingual is set up */}
                <h3 className="text-xl font-bold text-gray-800 mb-1">{notice.title.en || notice.title}</h3>
                <p className="text-gray-600">{notice.description.en || notice.description}</p>
              </div>

              <div className="flex gap-3">
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition">
                  View full
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* POST NOTICE MODAL */}
      <AnimatePresence>
        {showNoticeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ y: 50, scale: 0.9 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 50, scale: 0.9 }}
              className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl"
            >
              <h3 className="text-2xl font-black mb-6 text-gray-800">Publish New Notice</h3>
              <form onSubmit={handlePostNotice} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Notice Title</label>
                  <input
                    required
                    value={noticeData.title}
                    onChange={e => setNoticeData({ ...noticeData, title: e.target.value })}
                    className="w-full border-2 border-slate-100 rounded-xl p-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-medium transition"
                    placeholder="e.g., Gram Sabha Meeting Tomorrow"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Notice Description</label>
                  <textarea
                    required
                    rows={5}
                    value={noticeData.description}
                    onChange={e => setNoticeData({ ...noticeData, description: e.target.value })}
                    className="w-full border-2 border-slate-100 rounded-xl p-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-medium transition"
                    placeholder="Provide the administrative details..."
                  />
                </div>
                <div className="flex gap-4 pt-4 mt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowNoticeModal(false)}
                    className="flex-1 px-4 py-3 rounded-xl font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={postingNotice}
                    className="flex-1 px-4 py-3 rounded-xl font-bold bg-orange-500 text-white hover:bg-orange-600 disabled:bg-orange-300 shadow-md cursor-pointer disabled:cursor-not-allowed transition"
                  >
                    {postingNotice ? "Publishing..." : "Publish Notice"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NoticesPage;