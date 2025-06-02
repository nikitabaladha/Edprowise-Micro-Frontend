import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router-dom";

const CookieConsent = () => {
  const [cookies, setCookie] = useCookies(["userConsent", "pageData", "theme"]);
  const [showPopup, setShowPopup] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (cookies.userConsent === undefined) {
      setShowPopup(true);
    }
  }, [cookies.userConsent]);

  useEffect(() => {
    if (cookies.userConsent) {
      setCookie(
        "pageData",
        JSON.stringify({ CurrentVisitedPage: location.pathname }),
        {
          path: "/",
          maxAge: 36000,
          secure: true,
          sameSite: "Strict",
        }
      );
    }
  }, [location, cookies.userConsent, setCookie]);

  useEffect(() => {
    const handleThemeChange = () => {
      if (cookies.userConsent) {
        const currentTheme =
          document.documentElement.getAttribute("data-bs-theme") || "light";
        setCookie("theme", currentTheme, {
          path: "/",
          maxAge: 36000,
          secure: true,
          sameSite: "Strict",
        });
      }
    };

    handleThemeChange();

    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-bs-theme"],
    });

    return () => observer.disconnect();
  }, [cookies.userConsent, setCookie]);

  useEffect(() => {
    if (cookies.userConsent) {
      const savedTheme =
        document.documentElement.getAttribute("data-bs-theme") || "light";
      setCookie("theme", savedTheme, {
        path: "/",
        maxAge: 36000,
        secure: true,
        sameSite: "Strict",
      });
    }
  }, [cookies.userConsent, setCookie]);

  const acceptCookies = () => {
    setCookie("userConsent", true, {
      path: "/",
      maxAge: 36000,
      secure: true,
      sameSite: "Strict",
    });

    setCookie(
      "pageData",
      JSON.stringify({ CurrentVisitedPage: location.pathname }),
      {
        path: "/",
        maxAge: 36000,
        secure: true,
        sameSite: "Lax",
      }
    );

    const currentTheme =
      document.documentElement.getAttribute("data-bs-theme") || "light";
    setCookie("theme", currentTheme, {
      path: "/",
      maxAge: 36000,
      secure: true,
      sameSite: "Strict",
    });

    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <div style={popupStyle}>
      <p style={{ margin: 0 }}>We use cookies to improve your experience.</p>
      <button onClick={acceptCookies} style={buttonStyle}>
        Accept All Cookies
      </button>
    </div>
  );
};

const popupStyle = {
  position: "fixed",
  bottom: "20px",
  left: "20px",
  background: "#333",
  color: "#fff",
  padding: "10px 15px",
  borderRadius: "8px",
  zIndex: 1000,
  fontSize: "14px",
  maxWidth: "250px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
};

const buttonStyle = {
  background: "#4CAF50",
  color: "white",
  border: "none",
  padding: "6px 12px",
  marginTop: "10px",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "13px",
};

export default CookieConsent;
