import React, { useState } from "react";
import { IoCubeOutline, IoLogOutOutline } from "react-icons/io5";
import { BsReceipt } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../../useLogout.jsx";

const DashboardInformationCards = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const [hoveredCard, setHoveredCard] = useState(null);
  const [isLogoutHovered, setIsLogoutHovered] = useState(false);
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const role = userDetails?.role;

  const navigateToProcurementService = (event) => {
    event.preventDefault();
    localStorage.setItem("sidebartab", "ProcurementService");
    if (role === "School") {
      navigate("/school-dashboard/procurement-services/dashboard");
    } else {
      navigate("/school/go-to-dashboard");
    }
  };

  const navigateToFeesModule = (event) => {
    event.preventDefault();
    localStorage.setItem("sidebartab", "FeesModule");
    if (role === "School") {
      navigate("/school/fees-management-year");
    } else {
      navigate("/school/go-to-dashboard");
    }
  };

  const cardData = [
    {
      icon: <IoCubeOutline />,
      label: "Procurement Services",
      onClick: navigateToProcurementService,
    },
    {
      icon: <BsReceipt />,
      label: "Fees Management",
      onClick: navigateToFeesModule,
    },
    {
      icon: <IoCubeOutline />,
      label: "Payroll",
      onClick: () => {},
    },
    {
      icon: <IoCubeOutline />,
      label: "Payroll",
      onClick: () => {},
    },
  ];

  const styles = {
    container: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      flexWrap: "wrap",
      maxWidth: "1200px",
      margin: "40px auto",
      padding: "0 20px",
      gap: "30px",
    },
    card: {
      position: "relative",
      minWidth: "320px",
      height: "240px",
      boxShadow:
        "inset 5px 5px 5px #a9fffd, inset -5px -5px 15px #a9fffd, 5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.1)",
      borderRadius: "15px",
      cursor: "pointer",
      flex: "1 1 300px",
      maxWidth: "calc(33.333% - 30px)",
    },
    box: {
      position: "absolute",
      top: "20px",
      left: "20px",
      right: "20px",
      bottom: "20px",
      background: "#24253b",
      borderRadius: "15px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      transition: "transform 0.5s ease",
      WebkitTransition: "transform 0.5s ease",
    },
    boxHover: {
      transform: "translateY(-30px)",
      WebkitTransform: "translateY(-30px)",
    },
    content: {
      padding: "20px",
      textAlign: "center",
      width: "100%",
    },
    iconContainer: {
      position: "absolute",
      top: "-10px",
      right: "30px",
      fontSize: "8rem",
      opacity: 0.1,
    },
    label: {
      fontSize: "1.8rem",
      color: "#fff",
      zIndex: 1,
      transition: "all 0.5s ease",
      marginBottom: "15px",
      position: "relative",
    },
    logoutIcon: {
      position: "absolute",
      top: "10px",
      right: "20px",
      fontSize: "1.0rem",
      color: "#fff",
      cursor: "pointer",
      zIndex: 1000,
      transition: "all 0.3s ease",
      backgroundColor: "#1a1729",
      padding: "12px",
      borderRadius: "10%",
      boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
      transform: isLogoutHovered ? "scale(1.1)" : "scale(1)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "70px",
      height: "35px",
      textAlign: "center",
    },
    wrapper: {
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "white",
      fontFamily: '"Poppins", sans-serif',
      padding: "20px",
      width: "100%",
    },
  };

  return (
    <div style={styles.wrapper}>
      <span
        style={styles.logoutIcon}
        onClick={logout}
        onMouseEnter={() => setIsLogoutHovered(true)}
        onMouseLeave={() => setIsLogoutHovered(false)}
      >
        Logout
      </span>
      <div style={styles.container}>
        {cardData.map((card, index) => (
          <div
            key={index}
            style={styles.card}
            onClick={card.onClick}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div
              style={{
                ...styles.box,
                ...(hoveredCard === index && styles.boxHover),
              }}
            >
              <div style={styles.content}>
                <div
                  style={{
                    ...styles.iconContainer,
                    color: card.color,
                  }}
                >
                  {React.cloneElement(card.icon, { size: "1em" })}
                </div>
                <h3 style={styles.label}>{card.label}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardInformationCards;
