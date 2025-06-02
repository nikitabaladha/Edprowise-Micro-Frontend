import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import GallerySection from "./SubSection/GallerySection.jsx";
import EdprowiseTalkSection from "./SubSection/EdprowiseTalkSection.jsx";
import StudentZoneSection from "./SubSection/StudentZoneSection.jsx";
import EducatorZoneSection from "./SubSection/EducatorZoneSection.jsx";

const CommunityMainSection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    switch (location.pathname) {
      case "/community-connect/gallery":
        setActiveTab("gallerySection");
        break;
      case "/community-connect/edprowise-talks":
        setActiveTab("edprowiseSection");
        break;
      case "/community-connect/student-zone":
        setActiveTab("studentSection");
        break;
      case "/community-connect/educator-zone":
        setActiveTab("educatorSection");
        break;
      default:
        setActiveTab("gallerySection"); // Default tab
    }
  }, [location.pathname]);

  const showTab = (tabName) => {
    setActiveTab(tabName);
    switch (tabName) {
      case "gallerySection":
        navigate("/community-connect/gallery");
        break;
      case "edprowiseSection":
        navigate("/community-connect/edprowise-talks");
        break;
      case "studentSection":
        navigate("/community-connect/student-zone");
        break;
      case "educatorSection":
        navigate("/community-connect/educator-zone");
        break;
      default:
        navigate("/community-connect/gallery");
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
    // <section className="wpo-blog-section section-padding p-0" id="blog">
    //   <div className="nav-tabs-container">
    //     <button
    //       id="galleryTab"
    //       className={`nav-tab ${
    //         activeTab === "gallerySection" ? "active" : ""
    //       }`}
    //       onClick={() => showTab("gallerySection")}
    //     >
    //       Gallery
    //     </button>
    //     <button
    //       id="edprowiseTab"
    //       className={`nav-tab ${
    //         activeTab === "edprowiseSection" ? "active" : ""
    //       }`}
    //       onClick={() => showTab("edprowiseSection")}
    //     >
    //       EdProwise Talks
    //     </button>
    //     <button
    //       id="studentTab"
    //       className={`nav-tab ${
    //         activeTab === "studentSection" ? "active" : ""
    //       }`}
    //       onClick={() => showTab("studentSection")}
    //     >
    //       Student Zone
    //     </button>
    //     <button
    //       id="educatorTab"
    //       className={`nav-tab ${
    //         activeTab === "educatorSection" ? "active" : ""
    //       }`}
    //       onClick={() => showTab("educatorSection")}
    //     >
    //       Educator Zone
    //     </button>
    //   </div>

    //   <div className="wpo-blog-items">
    //     <div className="container">
    //       <div
    //         className={`show-tab ${
    //           activeTab === "gallerySection" ? "active" : ""
    //         }`}
    //         id="gallerySection"
    //       >
    //         <GallerySection />
    //       </div>
    //       <div
    //         className={`show-tab ${
    //           activeTab === "edprowiseSection" ? "active" : ""
    //         }`}
    //         id="edprowiseSection"
    //       >
    //         <EdprowiseTalkSection />
    //       </div>
    //       <div
    //         className={`show-tab ${
    //           activeTab === "studentSection" ? "active" : ""
    //         }`}
    //         id="studentSection"
    //       >
    //         <StudentZoneSection />
    //       </div>
    //       <div
    //         className={`show-tab ${
    //           activeTab === "educatorSection" ? "active" : ""
    //         }`}
    //         id="educatorSection"
    //       >
    //         <EducatorZoneSection />
    //       </div>
    //     </div>
    //   </div>
    // </section>

    <section
      className="wpo-blog-section section-padding p-0"
      id="blog"
      style={{ background: "#ffffff" }}
    >
      <div className="nav-tabs-container">
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
                    id="gallerySection"
                    className={`category-item-btn   ${
                      activeTab === "gallerySection" ? "active" : ""
                    }`}
                    onClick={() => showTab("gallerySection")}
                  >
                    {" "}
                    Gallery
                  </button>

                  <button
                    id="edprowiseSection"
                    className={`category-item-btn   ${
                      activeTab === "edprowiseSection" ? "active" : ""
                    }`}
                    onClick={() => showTab("edprowiseSection")}
                  >
                    EdProwise Talks
                  </button>

                  <button
                    id="studentSection"
                    className={`category-item-btn   ${
                      activeTab === "studentSection" ? "active" : ""
                    }`}
                    onClick={() => showTab("studentSection")}
                  >
                    Student Zone
                  </button>

                  <button
                    id="educatorSection"
                    className={`category-item-btn  ${
                      activeTab === "educatorSection" ? "active" : ""
                    }`}
                    onClick={() => showTab("educatorSection")}
                  >
                    Educator Zone
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="wpo-blog-items">
        <div
          className={`show-tab ${
            activeTab === "gallerySection" ? "active" : ""
          }`}
          id="gallerySection"
        >
          <GallerySection />
        </div>

        <div
          className={`show-tab ${
            activeTab === "edprowiseSection" ? "active" : ""
          }`}
          id="edprowiseSection"
        >
          <EdprowiseTalkSection />
        </div>

        <div
          className={`show-tab ${
            activeTab === "studentSection" ? "active" : ""
          }`}
          id="studentSection"
        >
          <StudentZoneSection />
        </div>

        <div
          className={`show-tab ${
            activeTab === "educatorSection" ? "active" : ""
          }`}
          id="educatorSection"
        >
          <EducatorZoneSection />
        </div>
      </div>
    </section>
  );
};

export default CommunityMainSection;
