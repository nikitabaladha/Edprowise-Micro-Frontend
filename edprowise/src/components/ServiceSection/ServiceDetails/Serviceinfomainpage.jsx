import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Serviceinfomainpage = () => {
  const [counter, setCounter] = useState(0);

  const courses = [
    {
      id: "1",
      icon: "Manage Fees with",
      title: "Maximize",
      serviceid: "Efficiency",
    },
    {
      id: "2",
      icon: "Digital Payments",
      title: "Smarter",
      serviceid: "Education",
    },
    {
      id: "3",
      icon: "Seamless Transactions",
      title: "Smooth",
      serviceid: "Operations",
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
      <section className="static-hero-s2 static-hero-service pb-3 pt-3">
        <div className="hero-container">
          <div className="hero-inner p-0">
            <div className="container-fluid ">
              <div className="hero-content hero-service-content">
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
                    Inspiring growth, fostering innovation, shaping the future,
                    and cultivating success in education.
                  </p>
                </div>
                <div data-swiper-parallax="500" className="slide-btns">
                  <Link to="/request-demo" className="theme-btn">
                    Request For Demo
                  </Link>
                </div>
              </div>
              <div className="student-pic student-service-pic">
                <img src="/assets/images/Fees-service.png" alt="Student" />
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

export default Serviceinfomainpage;
