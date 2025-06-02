import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const RemoveThemeAttribute = () => {
  const location = useLocation();

  useEffect(() => {
    // Remove theme attribute for all website routes
    document.documentElement.removeAttribute("data-bs-theme");
  }, [location.pathname]);

  return null;
};

export default RemoveThemeAttribute;
