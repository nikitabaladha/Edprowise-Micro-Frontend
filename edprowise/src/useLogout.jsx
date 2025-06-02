// Create a new file useLogout.js
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export const useLogout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const performLogout = () => {
    localStorage.removeItem("sidebartab");
    localStorage.removeItem("selectedAcademicYear");

    logout();
    navigate("/login");
  };

  return performLogout;
};
