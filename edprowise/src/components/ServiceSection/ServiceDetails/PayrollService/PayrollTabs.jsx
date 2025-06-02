import React, { useState, useRef } from "react";
import PayrollKeyFeacher from "./PayrollKeyFeacher.jsx";
import PayrollReport from "./PayrollReport.jsx";
import EasePayrollFAQSection from "../../../FAQSection/EasePayrollFAQSection.jsx";
import WhatWeSolvePayroll from "./WhatWeSolvePayroll.jsx";

const PayrollTabs = () => {
  const [activeTab, setActiveTab] = useState("keyFeaturesSection");

  const showTab = (tabName) => {
    setActiveTab(tabName);
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

  const handleDownload = (tabName) => {
    if (tabName === "brochureSection") {
      const link = document.createElement("a");
      link.href = "/assets/website-images/EdProwise Brochure.pdf";
      link.download = "EdProwise-Brochure.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <>
      <section
        className="wpo-courses-section-s2 section-padding pt-0"
        style={{ background: "#fafaff" }}
      >
        <div className="nav-tabs-service-container">
          <section className="wpo-courses-section-s2 section-padding pt-0 pb-0">
            <div className="container-fluidd bg-bedcrum ">
              <div className="category-wrapper">
                <div className="category-nav">
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
                      id="keyFeaturesSection"
                      className={`category-item-btn   ${
                        activeTab === "keyFeaturesSection" ? "active" : ""
                      }`}
                      onClick={() => showTab("keyFeaturesSection")}
                    >
                      {" "}
                      Key Features
                    </button>

                    <button
                      id="reportSection"
                      className={`category-item-btn   ${
                        activeTab === "reportSection" ? "active" : ""
                      }`}
                      onClick={() => showTab("reportSection")}
                    >
                      Report
                    </button>

                    <button
                      id="FAQSection"
                      className={`category-item-btn   ${
                        activeTab === "FAQSection" ? "active" : ""
                      }`}
                      onClick={() => showTab("FAQSection")}
                    >
                      FAQ
                    </button>

                    <button
                      id="whatSolvingSection"
                      className={`category-item-btn  ${
                        activeTab === "whatSolvingSection" ? "active" : ""
                      }`}
                      onClick={() => showTab("whatSolvingSection")}
                    >
                      {" "}
                      What We Are Solving
                    </button>

                    <button
                      id="brochureSection"
                      className="download-brocher-tab"
                      onClick={() => handleDownload("brochureSection")}
                    >
                      Download Brochure
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
        <div className="container section-padding pt-lg-5">
          <div
            className={`show-tab ${
              activeTab === "keyFeaturesSection" ? "active" : ""
            }`}
            id="keyFeaturesSection"
          >
            <PayrollKeyFeacher />
          </div>

          <div
            className={`show-tab ${
              activeTab === "reportSection" ? "active" : ""
            }`}
            id="reportSection"
          >
            <PayrollReport />
          </div>

          <div
            className={`show-tab ${activeTab === "FAQSection" ? "active" : ""}`}
            id="FAQSection"
          >
            <EasePayrollFAQSection />
          </div>

          <div
            className={`show-tab ${
              activeTab === "whatSolvingSection" ? "active" : ""
            }`}
            id="whatSolvingSection"
          >
            <WhatWeSolvePayroll />
          </div>
        </div>
      </section>
    </>
  );
};

export default PayrollTabs;
