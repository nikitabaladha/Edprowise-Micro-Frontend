import React from "react";
import Slider from "react-slick";
import { FaEye } from "react-icons/fa";

const VisionMissionSection = () => {
  const data = [
    {
      id: 1,
      className: "missionn",
      icon: (
        <img
          className="cart-vm-iconn"
          src="assets/website-images/mission-icon.webp"
          alt="Mission Icon"
        />
      ),
      title: "Mission",
      description:
        "To empower educational institutions with innovative solutions that enhance learning environments, streamline operations, and foster continuous growth and development.",
    },
    {
      id: 2,
      // <div className="cart-vm-icon">👁️</div>
      className: "visionn",
      icon: <div className="cart-vm-icon">👁️</div>,
      title: "Vision",
      description:
        "Transforming education to drive societal progress & economic growth in India by delivering innovative, impactful solutions that empower institutions & inspire future leaders.",
    },
    {
      id: 3,
      className: "valuee",
      icon: <div className="cart-vm-icon">💎</div>,
      title: "Value",
      description:
        "At Edprowise, our values center around innovation, integrity, customer-centricity, collaboration, and continuous learning, empowering growth and success",
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 4000,
    arrows: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 4000,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 4000,
        },
      },
    ],
  };

  return (
    <section className="wpo-courses-section-s2 section-padding section-background-box-shadow pt-2 pb-3">
      <div className="container">
        <div className="row-web">
          <div className="col-12">
            <div className="wpo-section-title-s2">
              <h2 className="font-family-web">Vision & Mission</h2>
            </div>
          </div>
        </div>
        <div className="mission-vision-section-wrapper">
          <Slider {...settings}>
            {data.map((item) => (
              <div key={item.id} className="cart-vm">
                <div className={`cart-vm-circle ${item.className}`}>
                  {item.icon}
                </div>
                <div className="cart-vm-text">
                  <h2 className="font-family-web">{item.title}</h2>
                  <p className="font-family-web text-black">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <div className="shape-1">
        <img src="assets/website-images/shape/1.svg" alt="Shape 1" />
      </div>
      <div className="shape-2">
        <img src="assets/website-images/shape/2.svg" alt="Shape 2" />
      </div>
      <div className="shape-3">
        <img src="assets/website-images/shape/3.svg" alt="Shape 3" />
      </div>
      <div className="shape-4">
        <img src="assets/website-images/shape/4.svg" alt="Shape 4" />
      </div>
    </section>
  );
};

export default VisionMissionSection;
