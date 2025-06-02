import React, { useState, useEffect, useRef } from "react";

const tabs = [
  {
    id: "tab1",
    label: "Digital Services - Advance ERP",
    content: (
      <>
        <div className={`category-items col-lg-4 col-md-12 col-12 grid-web s3`}>
          <div className="wpo-courses-item category-itemm">
            <div className="wpo-courses-text">
              <p className="category-text font-family-web ">
                Our robust suite of digital services is designed to bring
                schools into the modern era of education management. We provide
                custom school applications for principals, teachers, students,
                and parents, along with professionally designed websites that
                enhance a school’s digital presence.
              </p>
            </div>
          </div>
        </div>

        <div className={`category-items col-lg-4 col-md-12 col-12 grid-web s4`}>
          <div className="wpo-courses-item category-itemm">
            <div className="wpo-courses-text">
              <p className="category-text font-family-web ">
                Our Fees Management System helps schools track collections, send
                daily notifications, and streamline approval workflows. With our
                Payroll Management Software, schools can automate salary
                disbursement, manage staff attendance, handle leave records, and
                ensure compliance with ease. Our Financial Management tools
                provide insights through detailed reports like monthly profit &
                loss, key performance indicators (KPIs), and real-time
                dashboards for effective decision-making.
              </p>
            </div>
          </div>
        </div>

        <div className={`category-items col-lg-4 col-md-12 col-12 grid-web s5`}>
          <div className="wpo-courses-item category-itemm">
            <div className="wpo-courses-text">
              <p className="category-text font-family-web ">
                Additional digital solutions include online payment systems,
                digital exam result generation, library and admission
                management, attendance tracking, SMS and WhatsApp communication
                services, MIS reporting, and more—all aimed at simplifying
                operations and enhancing productivity.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },

  {
    id: "tab2",
    label: "Academic & Admin",
    content: (
      <>
        <p style={{ color: "white" }}>
          In addition, we provide academic and administrative services that
          support the daily functions of schools, including a recruitment portal
          for hiring staff, payroll and financial management software, PF & ESI
          consultancy, and entrance management solutions.Every solution is
          designed to reduce administrative burdens and improve institutional
          performance.
        </p>
      </>
    ),
  },

  {
    id: "tab3",
    label: "Our Expertise",
    content: (
      <>
        <p style={{ color: "white" }}>
          Our team brings together years of experience in education management,
          procurement, technology, and logistics, allowing us to deliver
          high-quality solutions with precision and professionalism. Our goal is
          to simplify school operations, reduce costs, improve service quality,
          and enable educators to focus on what matters most — teaching and
          nurturing students.
        </p>
      </>
    ),
  },

  {
    id: "tab4",
    label: "Relationship Management",
    content: (
      <>
        <p style={{ color: "white" }}>
          At EdProwise, we don’t just offer services we build long-term
          partnerships. Our dedicated relationship managers work closely with
          each school to understand their needs, provide tailored solutions, and
          ensure a smooth, responsive service experience. Your success
          is our priority.
        </p>
      </>
    ),
  },
];

const tabBackgrounds = {
  tab1: "#ffbf00",
  tab2: "#15a382",
  tab3: "#443fe0",
  tab4: "#fa416c",
};

const procurementPoints = [
  {
    title: "High Quality",
    description: "Only trusted suppliers and vetted products.",
  },
  {
    title: "Low Cost",
    description:
      "Leveraging bulk discounts through aggregated purchasing power.",
  },
  {
    title: "On-Time Delivery",
    description: "Efficient logistics and supply chain systems.",
  },
  {
    title: "No Negotiation Hassles",
    description: "Transparent, fixed pricing for peace of mind.",
  },
  {
    title: "Digital Order System",
    description:
      "Schools can place, track, and manage orders seamlessly via our platform or app.",
  },
  {
    title: "Bulk Discount Advantage",
    description:
      "Enjoy corporate-level discounts as we consolidate demand across multiple institutions.",
  },
];

const TabsWithContent = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [showProcurement, setShowProcurement] = useState(false);
  const contentRef = useRef(null);
  const procurementRef = useRef(null);

  const handleTabClick = (id) => {
    setShowProcurement(false);
    setActiveTab((prev) => (prev === id ? null : id));
  };

  const handleProcurementClick = () => {
    setActiveTab(null);
    setShowProcurement((prev) => !prev);
  };

  // useEffect(() => {
  //   if (contentRef.current) {
  //     if (activeTab) {
  //       contentRef.current.style.maxHeight = contentRef.current.scrollHeight + 'px';
  //       contentRef.current.style.opacity = '1';
  //     } else {
  //       contentRef.current.style.maxHeight = '0px';
  //       contentRef.current.style.opacity = '0';
  //     }
  //   }
  // }, [activeTab]);

  // useEffect(() => {
  //   if (procurementRef.current) {
  //     if (showProcurement) {
  //       procurementRef.current.style.maxHeight = procurementRef.current.scrollHeight + 'px';
  //       procurementRef.current.style.opacity = '1';
  //     } else {
  //       procurementRef.current.style.maxHeight = '0px';
  //       procurementRef.current.style.opacity = '0';
  //     }
  //   }
  // }, [showProcurement]);

  useEffect(() => {
    if (contentRef.current) {
      if (activeTab) {
        // First set maxHeight to scrollHeight to open
        contentRef.current.style.maxHeight =
          contentRef.current.scrollHeight + "px";
        // Then set opacity after a small delay to allow height transition to start
        setTimeout(() => {
          contentRef.current.style.opacity = "1";
        }, 10);
      } else {
        // First set opacity to 0
        contentRef.current.style.opacity = "0";
        // Then set maxHeight after the opacity transition completes
        setTimeout(() => {
          contentRef.current.style.maxHeight = "0px";
        }, 400); // This should match your opacity transition duration
      }
    }
  }, [activeTab]);

  useEffect(() => {
    if (procurementRef.current) {
      if (showProcurement) {
        procurementRef.current.style.maxHeight =
          procurementRef.current.scrollHeight + "px";
        setTimeout(() => {
          procurementRef.current.style.opacity = "1";
        }, 10);
      } else {
        procurementRef.current.style.opacity = "0";
        setTimeout(() => {
          procurementRef.current.style.maxHeight = "0px";
        }, 400);
      }
    }
  }, [showProcurement]);

  const activeContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <>
      <section className="wpo-courses-section-s2 section-padding pt-2 pb-1">
        <div className="container">
          {/* <div className="tabs-container"> */}
          <div className="tab-buttons-scroll">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => handleTabClick(tab.id)}
                style={{
                  backgroundColor:
                    activeTab === tab.id ? tabBackgrounds[tab.id] : "#ffffff",
                  color: activeTab === tab.id ? "#fff" : "#000",
                  transition: "background-color 0.3s, color 0.3s",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div
            ref={contentRef}
            className="row-web wpo-courses-wrap tab-content-box"
            style={{
              backgroundColor: activeTab
                ? tabBackgrounds[activeTab]
                : "transparent",
              maxHeight: "0",
            }}
          >
            {activeContent}
          </div>

          {/* Procurement Tab Button */}

          <div className="tab-buttons-scroll" style={{ paddingTop: "20px" }}>
            <button
              className={`tab-button ${showProcurement ? "active" : ""}`}
              onClick={handleProcurementClick}
              style={{
                backgroundColor: showProcurement ? "#04d3d4" : "#ffffff",
                color: showProcurement ? "#fff" : "#000",
                transition: "background-color 0.3s, color 0.3s",
              }}
            >
              Procurement Management – High Quality, Low Cost, On Time delivery
            </button>
          </div>
          <div
            ref={procurementRef}
            className="row-web wpo-courses-wrap tab-content-box"
            style={{
              maxHeight: "0",
              backgroundColor: "#04d3d4",
            }}
          >
            {procurementPoints.map((point, index) => (
              <div
                key={index}
                className={`category-items col-lg-4 col-md-6 col-12 grid-web s${
                  index + 1
                }`}
              >
                <div className="wpo-courses-item category-itemm">
                  <div className="wpo-courses-text">
                    <h2 className="category-h2 font-weight-web-h2">
                      {point.title}
                    </h2>
                    <p className="category-text font-family-web">
                      {point.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default TabsWithContent;
