import React from "react";
import Slider from "react-slick";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
const testimonials = [
  {
    text: "EdProWise has completely transformed the way we manage our curriculum and student engagement. The intuitive platform and expert guidance have made a significant impact on our school's success.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6NOoyAVaX8I76Q4Lre8gmxK5YbJIo_c_kcQ&s",
    name: "Principal",
    position: "Carmel Convent School, Chandigarh",
  },
  {
    text: "EdProWise has elevated education quality at our institution, empowering teachers and students with the tools to succeed and fostering continuous improvement.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-Y3xfkKX6PUMgfToucwy_YRgln8AKEWzctQ&s",
    name: "Principal",
    position: "Christ Raja Convent School, Jind",
  },
  {
    text: "EdProWise has helped us transition smoothly into a more digital and data-driven education system. It has provided us with the structure and support needed to modernize our school operations.",
    image: "assets/website-images/Mount-collage-logo.png",
    name: "Principal",
    position: "Mount Carmel School, Hoshiarpur",
  },
  {
    text: "Managing a school comes with countless challenges, but EdProWise has simplified everything. From scheduling to resource allocation, our administrative workload has been significantly reduced.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmPtbFn_Ai1BkZRCDHtfH_hNIY9wLL9qKCdg&s",
    name: "Principal",
    position: "St. Thomas Convent School, Bhopal",
  },
  {
    text: "With EdProWise, we now have access to real-time analytics and insights that help us make informed decisions. It has significantly improved our ability to track student progress and teacher performance.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeKq8qxdnDCddHIxt3FP4OvvfL8HCAifnRGbP4_jEF_fKz2kUn1EgU1P8cZuRFE1_l&usqp=CAU",
    name: "Principal",
    position: "Trinity Convent School, Vidisha",
  },
];

const CustomPrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      className="custom-prev"
      onClick={onClick}
      style={{
        position: "absolute",
        left: "-48px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: "2",
        background: "white",
        border: "1px solid",
        color: "black",
        padding: "15px",
        cursor: "pointer",
        borderRadius: "50%",
      }}
    >
      <GrPrevious />
    </button>
  );
};

const CustomNextArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      className="custom-next"
      onClick={onClick}
      style={{
        position: "absolute",
        right: "-48px",
        top: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transform: "translateY(-50%)",
        zIndex: "2",
        background: "white",
        border: "1px solid",
        color: "black",
        padding: "15px",
        cursor: "pointer",
        borderRadius: "50%",
      }}
    >
      <GrNext />
    </button>
  );
};

const TestimonialSection = () => {
  const settings = {
    // dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          prevArrow: false,
          nextArrow: false,
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="wpo-courses-section-s2 section-padding section-background-box-shadow pt-0 pb-1">
      <div className="container-fluid  py-3">
        <div className="row">
          <div className="col-12">
            <div className="wpo-section-title-s2">
              <h2>What Our Client Says About Us</h2>
            </div>
          </div>
        </div>
        <div
          className="testimonial-width"
          style={{ width: "90%", margin: "0 auto" }}
        >
          <Slider {...settings}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="">
                <div className="card shadow-sm rounded-3">
                  <div className="quotes text-body-tertiary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="47"
                      height="47"
                      fill="currentColor"
                      className="bi bi-quote"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388q0-.527.062-1.054.093-.558.31-.992t.559-.683q.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992 4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 9 7.558V11a1 1 0 0 0 1 1zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612q0-.527.062-1.054.094-.558.31-.992.217-.434.559-.683.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992 4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 3 7.558V11a1 1 0 0 0 1 1z" />
                    </svg>
                  </div>
                  <div className="card-body">
                    <p className="card-text text-black">{testimonial.text}</p>
                    <div className="d-flex align-items-center pt-2">
                      <img
                        src={testimonial.image}
                        alt={`Testimonial by ${testimonial.name}`}
                        className="rounded-circle me-3"
                        style={{ width: "50px", height: "50px" }}
                      />
                      <div>
                        <h5 className="card-title fw-bold">
                          {testimonial.name}
                        </h5>
                        <span className="text-secondary">
                          {testimonial.position}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
