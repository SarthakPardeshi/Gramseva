import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api/axios";
import LoadingSpinner from "../components/LoadingSpinner";

const NoticesPage = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [noticeData, setNoticeData] = useState({ title: "", description: "" });
  const [postingNotice, setPostingNotice] = useState(false);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      setLoading(true);
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
      // Ensure the data sent to the backend follows the structured object format
      await api.post("/notices", {
        title: { en: noticeData.title },
        description: { en: noticeData.description },
        type: noticeData.type || "Notice"
      });
      setShowNoticeModal(false);
      setNoticeData({ title: "", description: "" });
      fetchNotices();
    } catch (error) {
      console.error(error);
      alert("Failed to post notice.");
    } finally {
      setPostingNotice(false);
    }
  };


  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="max-w-5xl mx-auto py-8 px-4 min-h-[75vh]">
          {/* Header section... */}
          <div className="mb-10 flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-3xl font-extrabold text-gray-800">Notice Board</h2>
            <motion.button
              onClick={() => setShowNoticeModal(true)}
              className="bg-orange-500 text-white px-6 py-3 rounded-xl font-bold cursor-pointer hover:bg-orange-600 transition shadow-md"
            >
              + Post New Notice
            </motion.button>
          </div>

          <div className="grid gap-6">
            {notices.length === 0 ? (
              <div className="text-center p-10 bg-white rounded-2xl">No notices published yet.</div>
            ) : (
              notices.map((notice, index) => (
                <motion.div
                  key={notice._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white p-6 rounded-2xl shadow-sm border-l-8 border-l-blue-600"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-bold text-gray-400 uppercase">
                        {/* Safe Date Rendering */}
                        {notice.createdAt ? new Date(notice.createdAt).toLocaleDateString() : "No Date"}
                      </span>
                    </div>

                    {/* SAFE RENDERING LOGIC:
                   This prevents the 'en' crash by checking if the property exists 
                   and falling back to a string or default text.
                   */}
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      {notice.title?.en ?? (typeof notice.title === 'string' ? notice.title : "Untitled Notice")}
                    </h3>

                    <p className="text-gray-600">
                      {notice.description?.en ?? (typeof notice.description === 'string' ? notice.description : "No description provided.")}
                    </p>
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
                  <h3 className="text-2xl font-black mb-6 text-gray-800">Publish New Update</h3>
                  <form onSubmit={handlePostNotice} className="space-y-5">

                    {/* 1. Category Selection */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                        Post Type
                      </label>
                      <div className="relative">
                        <select
                          required
                          value={noticeData.type || "Notice"} // Default to Notice
                          onChange={(e) => setNoticeData({ ...noticeData, type: e.target.value })}
                          className="w-full appearance-none border-2 border-slate-100 rounded-xl p-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-bold text-gray-700 bg-gray-50 cursor-pointer transition"
                        >
                          <option value="Notice">Notice</option>
                          <option value="Government GR">Government GR</option>
                          <option value="Scheme">Government Scheme</option>
                        </select>
                        {/* Custom dropdown arrow for better UI */}
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                      </div>
                    </div>

                    {/* 2. Title Input */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                        {noticeData.type === "Government GR" ? "GR Subject" : noticeData.type === "Scheme" ? "Scheme Name" : "Notice Title"}
                      </label>
                      <input
                        required
                        value={noticeData.title}
                        onChange={(e) => setNoticeData({ ...noticeData, title: e.target.value })}
                        className="w-full border-2 border-slate-100 rounded-xl p-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-medium transition"
                        placeholder={`e.g., ${noticeData.type === "Scheme" ? "Pradhan Mantri Awas Yojana" : "Gram Sabha Meeting"}`}
                      />
                    </div>

                    {/* 3. Description Input */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Details</label>
                      <textarea
                        required
                        rows={5}
                        value={noticeData.description}
                        onChange={(e) => setNoticeData({ ...noticeData, description: e.target.value })}
                        className="w-full border-2 border-slate-100 rounded-xl p-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-medium transition"
                        placeholder="Provide the relevant details, eligibility, or administrative notes..."
                      />
                    </div>

                    {/* Action Buttons */}
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
                        {postingNotice ? "Publishing..." : "Publish Update"}
                      </button>
                    </div>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
};

export default NoticesPage;