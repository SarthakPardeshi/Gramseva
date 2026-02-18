import { motion } from 'framer-motion';

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}    // Start state (hidden and lower)
      animate={{ opacity: 1, y: 0 }}     // End state (visible and at position)
      exit={{ opacity: 0, y: -20 }}      // Exit state (when leaving page)
      transition={{ duration: 0.2, ease: "easeOut" }} // Smoothness
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;