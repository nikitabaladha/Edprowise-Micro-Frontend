import React from "react";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { AuthProvider } from "./AuthContext.jsx";
import CookieConsent from "./CookieConsent.jsx";
import { CookiesProvider } from "react-cookie";

import AppRoutes from "./routes.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CookiesProvider>
          <AppRoutes />
          <CookieConsent />
          <ToastContainer />
        </CookiesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
