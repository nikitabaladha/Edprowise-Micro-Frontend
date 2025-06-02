import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SchoolWebsiteInfoSection = () => {
  const [counter, setCounter] = useState(0);

  const courses = [
    {
      id: "1",
      icon: "Transform School",
      title: "Websites ",
      serviceid: "Beautifully",
    },
    {
      id: "2",
      icon: "Upgrade School",
      title: "Websites",
      serviceid: "Instantly",
    },
    {
      id: "3",
      icon: "Customize School",
      title: "Websites ",
      serviceid: "Uniquely",
    },
    {
      id: "4",
      icon: "Optimize School",
      title: "Websites ",
      serviceid: "Perfectly",
    },
    {
      id: "5",
      icon: "Innovate School",
      title: "Websites ",
      serviceid: "Dynamically",
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
                    Showcase your school’s excellence with a beautifully
                    designed, mobile-friendly website that informs,
                    engages, and inspires.
                  </p>
                </div>
                <div data-swiper-parallax="500" className="slide-btns">
                  <Link to="/request-demo" className="theme-btn">
                    Request For Demo
                  </Link>
                </div>
              </div>
              {/* student-service-pic */}
              <div className="student-pic home-hero-student-pic service-subpage-image ">
                <img
                  src="/assets/website-images/event/Website.png"
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

export default SchoolWebsiteInfoSection;
