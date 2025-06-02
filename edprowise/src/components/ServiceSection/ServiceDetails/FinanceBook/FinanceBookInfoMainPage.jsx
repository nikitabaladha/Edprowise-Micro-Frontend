import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FinanceBookInfoMainPage = () => {
  const [counter, setCounter] = useState(0);

  const courses = [
    {
      id: "1",
      icon: "Automated Invoices",
      title: "Error-Free",
      serviceid: "Payments",
    },
    {
      id: "2",
      icon: "Automate, Accurate, ",
      title: "Validate ",
      serviceid: "Pay Effortlessly",
    },
    {
      id: "3",
      icon: "Efficient Invoice Processing",
      title: "Secure",
      serviceid: " Payments",
    },
    {
      id: "4",
      icon: "Online Invoices",
      title: "Faster",
      serviceid: " Transactions",
    },
    {
      id: "5",
      icon: "Streamlined Tax",
      title: "Enhanced",
      serviceid: " Accuracy",
    },
    {
      id: "6",
      icon: "Automated Entries ",
      title: " Accurate",
      serviceid: " Accounts",
    },
    {
      id: "7",
      icon: "Predefined Ledgers ",
      title: "Accurate",
      serviceid: " Accounting",
    },
    {
      id: "8",
      icon: "Analyze, Monitor",
      title: " Elevate ",
      serviceid: "Performance",
    },
    {
      id: "9",
      icon: "Automation, Accuracy ",
      title: "Effortless",
      serviceid: " Operations",
    },
  ];

  const intervalTime = 3000;

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => (prevCounter + 1) % courses.length);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [courses.length, intervalTime]);
  return (
    <>
      <section className="static-hero-s2 home-hero-section pb-3 pt-3">
        <div className="hero-container home-hero-container">
          <div className="hero-inner home-hero-inner p-0">
            <div className="container-fluid home-hero-container-fluid">
              <div className="hero-content" style={{ order: "2" }}>
                {/* Slide Title */}
                <div data-swiper-parallax="300" className="slide-title">
                  <h2 className="font-family-web">
                    {courses[counter].icon}
                    <span>
                      <small id="changing" className="fade-in hf-size fw-bold">
                        {courses[counter].title}
                      </small>
                    </span>
                    {courses[counter].serviceid}
                  </h2>
                </div>

                {/* Slide Text */}
                <div data-swiper-parallax="400" className="slide-text">
                  <p className="text-black">
                    Comprehensive financial management tailored for educational
                    institution ,including Invoice Processing, reporting,
                    budgeting & MIS.
                  </p>
                </div>
                <div data-swiper-parallax="500" className="slide-btns">
                  <Link to="/request-demo" className="theme-btn">
                    Request For Demo
                  </Link>
                </div>
              </div>
              <div className="student-pic home-hero-student-pic service-subpage-image">
                <img
                  src="/assets/website-images/event/Financial.png"
                  alt="Student"
                />
                <div className="wp-shape-1">
                  <img
                    src="/assets/website-images/slider/shape-1.svg"
                    alt="Shape 1"
                  />
                </div>
                <div className="wp-shape-2">
                  <img
                    src="/assets/website-images/slider/shape-2.svg"
                    alt="Shape 2"
                  />
                </div>
                <div className="wp-shape-3">
                  <img
                    src="/assets/website-images/slider/shape-3.svg"
                    alt="Shape 3"
                  />
                </div>
                <div className="wp-shape-4">
                  <img
                    src="/assets/website-images/slider/shape-4.svg"
                    alt="Shape 4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FinanceBookInfoMainPage;
