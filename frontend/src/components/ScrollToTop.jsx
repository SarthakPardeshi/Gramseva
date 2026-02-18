import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Remove "behavior: smooth" for an instant, snappy feel
    window.scrollTo(0, 0); 
  }, [pathname]);

  return null;
};

export default ScrollToTop;