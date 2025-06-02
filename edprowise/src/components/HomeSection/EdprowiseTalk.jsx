import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
const EdprowiseTalk = () => {
  // const carouselRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);

  const slides = [
    {
      icon: "fi flaticon-training",
      title: "CRM Driven Process",
      color: "#f2be00",
    },
    {
      icon: "fi flaticon-support",
      title: "Instant User Support",
      color: "#15a382",
    },
    {
      icon: "fi flaticon-e-learning",
      title: "Guide, Manual & Training",
      color: "#0568fc",
      padding: true,
    },
    {
      icon: "fi flaticon-medal-1",
      title: "Highly Trained Team",
      color: "#fa416c",
    },
  ];

  // Slick slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          autoplay: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          autoplay: true,
        },
      },
    ],
  };

  return (
    <>
      <section
        className="wpo-choose-section-s2 section-padding pt-2 pb-2"
        style={{ boxShadow: "rgba(17, 17, 26, 0.1) 0px 0px 16px" }}
      >
        <div className="container edprowise-choose-container">
          <div className="wpo-choose-wrap">
            <div className="row">
              <div className="col-12">
                <div className="wpo-section-title-s2">
                  <h2 className="font-family-web">
                    Support – We Listen..We Resolve..We Deliver
                  </h2>
                </div>
              </div>
            </div>

            <div className="wpo-choose-grids clearfix">
              <Slider {...settings}>
                {slides.map((slide, index) => (
                  <div
                    className={`grid-web ${slide.padding ? "guid-traing" : ""}`}
                    key={index}
                  >
                    <div className="icon" style={{ background: slide.color }}>
                      <i className={slide.icon}></i>
                    </div>
                    <div className="info">
                      <h3>{slide.title}</h3>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>
      <section className="wpo-choose-section-s2 section-padding section-background-box-shadow pt-lg-2 pb-2">
        <div className="container edprowise-choose-container">
          <div className="row mb-2">
            <div className="col-12">
              <div className="wpo-section-title-s2 mb-2">
                <h2 className="font-family-web">Edprowise Talk</h2>
              </div>
            </div>
          </div>
          <div className="right-img mb-2">
            <iframe
              width="100%"
              height="325"
              src="https://www.youtube.com/embed/KzMNx8h7RbY?si=7eEmdFNCVHPkdYBp"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
};

export default EdprowiseTalk;
