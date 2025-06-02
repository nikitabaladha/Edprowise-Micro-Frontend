import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DigitalSection from "./SubSections/DigitalService.jsx";
import BusinessSection from "./SubSections/BusinessSection.jsx";
import RecruitmentSection from "./SubSections/RecruitmentSection.jsx";
import ProcurementSection from "./SubSections/ProcurementSection.jsx";

const ServiceMainSection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    switch (location.pathname) {
      case "/services/digital-services":
        setActiveTab("digitalSection");
        break;
      case "/services/academic-admin-services":
        setActiveTab("businessSection");
        break;
      case "/services/hire-teacher":
        setActiveTab("recruitmentSection");
        break;
      case "/services/get-goods-for-school":
        setActiveTab("procurementSection");
        break;
      default:
        setActiveTab("");
        break;
    }
  }, [location.pathname]);

  const showTab = (tabName) => {
    setActiveTab(tabName);
    switch (tabName) {
      case "digitalSection":
        navigate("/services/digital-services");
        break;
      case "businessSection":
        navigate("/services/academic-admin-services");
        break;
      case "recruitmentSection":
        navigate("/services/hire-teacher");
        break;
      case "procurementSection":
        navigate("/services/get-goods-for-school");
        break;
      default:
        navigate("/services");
        break;
    }
  };

  //Scolling tab
  const [clickedBtn, setClickedBtn] = useState(""); // State for clicked button
  const [isDragging, setIsDragging] = useState(false); // State to track dragging
  const [startX, setStartX] = useState(0); // Initial position of the drag
  const [scrollLeft, setScrollLeft] = useState(0); // Initial scroll position
  const containerRef = useRef(null); // Ref to access category container

  // Scroll the container left or right
  const scroll = (direction) => {
    const container = document.getElementById("category-container");
    const scrollAmount = direction === "left" ? -200 : 200;
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    setClickedBtn(direction); // Set the clicked button direction
  };

  // Mouse event handlers for smoother dragging
  const handleMouseDown = (e) => {
    const container = containerRef.current;
    setIsDragging(true);
    setStartX(e.pageX - container.offsetLeft);
    setScrollLeft(container.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return; // Only run if dragging
    e.preventDefault();
    const container = containerRef.current;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5; // Adjust the multiplier for smoother scroll
    container.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  return (
    <section
      className="wpo-courses-section-s2 section-padding pt-0"
      style={{ background: "#ffffff" }}
    >
      <div className="nav-tabs-service-container">
        <section className="wpo-courses-section-s2 section-padding pt-0 pb-0">
          <div className="container-fluidd bg-bedcrum ">
            <div className="category-wrapper">
              <div className="category-nav">
                {/* <button
                className={`scroll-btn left ${clickedBtn === "left" ? "clicked" : ""}`}
                onClick={() => scroll("left")}
              >
                &#x276E;
              </button> */}
                <div
                  id="category-container"
                  className="category-container"
                  ref={containerRef}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUpOrLeave}
                  onMouseLeave={handleMouseUpOrLeave}
                  style={{
                    cursor: isDragging ? "grabbing" : "grab",
                    transition: "all 0.3s ease",
                  }} // Smooth interaction
                >
                  <button
                    id="digitalSection"
                    className={`category-item-btn   ${
                      activeTab === "digitalSection" ? "active" : ""
                    }`}
                    onClick={() => showTab("digitalSection")}
                  >
                    {" "}
                    Digital Services
                  </button>

                  <button
                    id="businessSection"
                    className={`category-item-btn   ${
                      activeTab === "businessSection" ? "active" : ""
                    }`}
                    onClick={() => showTab("businessSection")}
                  >
                    Academic & Admin
                  </button>

                  <button
                    id="procurementSection"
                    className={`category-item-btn   ${
                      activeTab === "procurementSection" ? "active" : ""
                    }`}
                    onClick={() => showTab("procurementSection")}
                  >
                    Get Goods for your School
                  </button>

                  <button
                    id="recruitmentSection"
                    className={`category-item-btn  ${
                      activeTab === "recruitmentSection" ? "active" : ""
                    }`}
                    onClick={() => showTab("recruitmentSection")}
                  >
                    {" "}
                    Hire School Teacher
                  </button>
                </div>
                {/* <button
                className={`scroll-btn right ${clickedBtn === "right" ? "clicked" : ""}`}
                onClick={() => scroll("right")}
              >
                &#x276F;
              </button> */}
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="container section-padding pt-lg-5 pb-1">
        <div
          className={`show-tab ${
            activeTab === "digitalSection" ? "active" : ""
          }`}
          id="digitalSection"
        >
          {/* <EdProwiseFAQSection /> */}
          <DigitalSection />
        </div>

        <div
          className={`show-tab ${
            activeTab === "businessSection" ? "active" : ""
          }`}
          id="businessSection"
        >
          <BusinessSection />
        </div>

        <div
          className={`show-tab ${
            activeTab === "procurementSection" ? "active" : ""
          }`}
          id="procurementSection"
        >
          <ProcurementSection />
        </div>

        <div
          className={`show-tab ${
            activeTab === "recruitmentSection" ? "active" : ""
          }`}
          id="recruitmentSection"
        >
          <RecruitmentSection />
        </div>
      </div>
    </section>
  );
};

export default ServiceMainSection;
