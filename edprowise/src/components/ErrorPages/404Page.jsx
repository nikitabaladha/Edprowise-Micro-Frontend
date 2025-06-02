import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import styled, { keyframes } from "styled-components";

const floating = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const Styled404 = styled.div`
  .error-container {
    background: ${(props) =>
      props.darkMode
        ? "#1a1a1a"
        : "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)"};
    min-height: 100vh;
    transition: background 0.3s ease;
  }

  .floating-img {
    animation: ${floating} 3s ease-in-out infinite;
    max-width: 300px;
    filter: ${(props) => (props.darkMode ? "invert(0.9)" : "none")};
  }

  .glow-text {
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  }

  .dynamic-button {
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }

    &::after {
      content: "";
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(
        45deg,
        transparent,
        rgba(255, 255, 255, 0.2),
        transparent
      );
      transform: rotate(45deg);
      transition: all 0.5s;
    }

    &:hover::after {
      left: 150%;
    }
  }

  .dark-mode-toggle {
    position: fixed;
    top: 20px;
    right: 20px;
    cursor: pointer;
    z-index: 1000;
  }
`;

const Page404ForWebsite = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [randomTip, setRandomTip] = useState("");
  const navigate = useNavigate();

  const tips = [
    "Check the URL for typos",
    "Try our search feature",
    "Explore our homepage",
    "Contact support if stuck",
    "Check our latest updates",
  ];

  useEffect(() => {
    setRandomTip(tips[Math.floor(Math.random() * tips.length)]);
  }, []);

  return (
    <Styled404 darkMode={darkMode}>
      <div className="error-container d-flex flex-column justify-content-center align-items-center p-3">
        <button
          className="dark-mode-toggle btn btn-sm btn-outline-secondary"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "🌙 Dark" : "☀️ Light"}
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1
            className="display-1 fw-bold mb-3"
            style={{ color: darkMode ? "#fff" : "#2c3e50" }}
          >
            4<span style={{ color: "#ff4757" }}>0</span>4
          </h1>

          <h2 className={`h1 mb-3 ${darkMode ? "text-light" : "text-dark"}`}>
            Lost in Space?
          </h2>

          <p className={`lead mb-4 ${darkMode ? "text-light" : "text-muted"}`}>
            {randomTip || "The page you're looking for is out of this world..."}
          </p>

          <div className="d-flex gap-3 justify-content-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`dynamic-button btn btn-lg ${
                darkMode ? "btn-light" : "btn-primary"
              }`}
              onClick={() => navigate(-1)}
            >
              ← Go Back
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`dynamic-button btn btn-lg ${
                darkMode ? "btn-primary" : "btn-dark"
              }`}
              onClick={() => navigate("/")}
            >
              🏠 Home
            </motion.button>
          </div>

          <div className="mt-4">
            <p className={`small ${darkMode ? "text-light" : "text-muted"}`}>
              Need help?{" "}
              <Link
                to="/contact"
                className={darkMode ? "text-light" : "text-dark"}
              >
                Contact support
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Animated background elements */}
        <div
          className="position-fixed top-0 start-0 w-100 h-100"
          style={{ zIndex: -1 }}
        >
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="position-absolute"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: 8,
                height: 8,
                background: darkMode
                  ? "rgba(255,255,255,0.2)"
                  : "rgba(0,0,0,0.1)",
                borderRadius: "50%",
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>
    </Styled404>
  );
};

export default Page404ForWebsite;
