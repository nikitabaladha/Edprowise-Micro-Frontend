import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import { GiThreeFriends, GiDiamondTrophy, GiTeamIdea } from "react-icons/gi";
import { FaStore, FaShieldAlt } from "react-icons/fa";
import { PiMedalBold } from "react-icons/pi";

const WhyChooseEdProwise = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 991);
  const [maxHeight, setMaxHeight] = useState(0);
  const cardRefs = useRef([]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 991);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setTimeout(() => {
        const heights = cardRefs.current.map((ref) => ref?.offsetHeight || 0);
        setMaxHeight(Math.max(...heights));
      }, 500); // Delay to wait for the slider to render properly
    }
  }, [isMobile]);

  const chooseData = [
    { id: 1, className: "s1", iconClass: <GiThreeFriends />, title: "Connect Ecosystem", description: "The Central Dashboard offers real-time access to vital information, enhancing communication and collaboration among principals, teachers, management, and parents." },
    { id: 2, className: "s2", iconClass: <FaStore />, title: "Marketplace For School", description: "Marketplace for a wide range of services including technology integration, educational consultation, and professional development, tailored to educational operations." },
    { id: 3, className: "s3", iconClass: <FaShieldAlt />, title: "Zero Leakage Of Fees", description: "Through meticulous reconciliation of school fees, we guarantee zero leakage, ensuring transparency and swift resolution of discrepancies." },
    { id: 4, className: "s4", iconClass: <GiDiamondTrophy />, title: "Expertise In Educational Solutions", description: "With a dedicated focus on the education sector, we bring deep expertise and understanding of the unique challenges faced by educational institutions." },
    { id: 5, className: "s5", iconClass: <PiMedalBold />, title: "Commitment To Excellence", description: "We empower educational institutions with transformative solutions that enable them to achieve their goals effectively and sustainably." },
    { id: 6, className: "s6", iconClass: <GiTeamIdea />, title: "Innovative Approach", description: "We leverage innovative technologies and strategic insights to deliver solutions that drive efficiency and foster continuous improvement." },
  ];

  const settings = {
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="wpo-courses-section-s2 section-padding section-background-box-shadow pt-2 pb-1">
      <div className="container edprowise-choose-container">
        <div className="row-web">
          <div className="col-12">
            <div className="wpo-section-title-s2">
              <h2 className="font-family-web">Why Choose EdProwise?</h2>
            </div>
          </div>
        </div>

        {/* Grid Layout Above 992px */}
        {!isMobile ? (
          <div className="row-web wpo-courses-wrap choose-wrapp">
            {chooseData.map((item) => (
              <div key={item.id} className={`col-lg-4 col-md-6 col-12 grid-web ${item.className}`}>
                <Card item={item} />
              </div>
            ))}
          </div>
        ) : (
          // Slick Carousel Below 992px
          <div className="row-web wpo-courses-wrap choose-wrapp">
            <Slider {...settings}>
              {chooseData.map((item, index) => (
                <div key={item.id} className={`col-lg-4 col-md-6 col-12 grid-web ${item.className} carousel-item-choose`}>
                  <Card item={item} ref={(el) => (cardRefs.current[index] = el)} maxHeight={maxHeight} />
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>

      {/* Shapes */}
      <ShapeImages />
    </section>
  );
};

// Reusable Card Component
const Card = React.forwardRef(({ item, maxHeight }, ref) => (
  <div ref={ref} className="wpo-courses-item" style={{ minHeight: maxHeight, }}>
    <div className="wpo-courses-text">
      <div className="courses-icon">{item.iconClass}</div>
      <h2 className="font-weight-web-h2">
        <a>{item.title}</a>
      </h2>
      <p className="font-family-web">{item.description}</p>
    </div>
  </div>
));

// Shape Images Component
const ShapeImages = () => (
  <>
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
  </>
);

export default WhyChooseEdProwise;
