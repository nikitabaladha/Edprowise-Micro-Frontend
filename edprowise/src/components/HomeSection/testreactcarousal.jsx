import React from "react";
import Slider from "react-slick";

export function SimpleSlider() {
  var settings = {
    dots: true,
    autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      <div style={{ background: "black", width: "100px" }}>
        <h3>1</h3>
      </div>
      <div>
        <h3>2</h3>
      </div>
      <div>
        <h3>3</h3>
      </div>
      <div>
        <h3>4</h3>
      </div>
      <div>
        <h3>5</h3>
      </div>
      <div>
        <h3>6</h3>
      </div>
    </Slider>
  );
}

// import React, { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    text: "EdProWise has completely transformed the way we manage our curriculum and student engagement. The intuitive platform and expert guidance have made a significant impact on our school's success.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6NOoyAVaX8I76Q4Lre8gmxK5YbJIo_c_kcQ&s",
    name: "Principal",
    position: "Carmel convent school, Chandigarh",
  },
  // {
  //   text: "EdProWise has revolutionized our administrative processes. From managing student data to optimizing lesson plans, everything is now efficient. It has truly been a game-changer for our school.",
  //   image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREUWe7HmcsRfT2iV5uq4L0lzrsteFWTdQbdw&s",
  //   name: "Principal",
  //   position: "St francis de sales school, Janakpuri",
  // },
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

export function TestimonialSection() {
  const carouselRef = useRef(null);
  const innerRef = useRef(null);
  const [itemsToShow, setItemsToShow] = useState(1);
  const [scrollPosition, setScrollPosition] = useState(0);
  const duplicatedTestimonials = [
    ...testimonials,
    ...testimonials,
    ...testimonials,
    ...testimonials,
  ];
  const updateItemsToShow = () => {
    const width = window.innerWidth;
    if (width < 576) setItemsToShow(1); // Single item for small screens
    else if (width < 768) setItemsToShow(2); // Two items for medium screens
    else if (width < 1200) setItemsToShow(2);
    else setItemsToShow(3); // Default to three items for large screens
  };

  const handleNext = () => {
    const innerCarousel = innerRef.current;
    const items = innerCarousel.querySelectorAll(".carousel-itemm");
    if (items.length === 0) return;

    const cardWidth = items[0].offsetWidth;
    const carouselWidth = innerCarousel.scrollWidth;

    if (scrollPosition < carouselWidth - cardWidth * itemsToShow) {
      setScrollPosition((prev) => {
        const newScroll = prev + cardWidth;
        innerCarousel.scrollTo({ left: newScroll, behavior: "smooth" });
        return newScroll;
      });
    } else {
      setScrollPosition(0);
      innerCarousel.scrollTo({ left: 0, behavior: "auto" });
    }
  };

  const handlePrev = () => {
    const innerCarousel = innerRef.current;
    const items = innerCarousel.querySelectorAll(".carousel-itemm");
    const cardWidth = items[0].offsetWidth;

    if (scrollPosition > 0) {
      setScrollPosition((prev) => {
        const newScroll = prev - cardWidth;
        innerCarousel.scrollTo({ left: newScroll, behavior: "smooth" });
        return newScroll;
      });
    }
  };

  useEffect(() => {
    updateItemsToShow();
    window.addEventListener("resize", updateItemsToShow);
    return () => {
      window.removeEventListener("resize", updateItemsToShow);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const items = innerRef.current?.querySelectorAll(".carousel-itemm");
      if (items?.length > 0) {
        handleNext();
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [scrollPosition, itemsToShow]);

  return (
    <section className="wpo-courses-section-s2 section-padding pt-0 pb-1">
      <div className="container-fluidd bg-body-tertiary pyy-3">
        <div className="row">
          <div className="col-12">
            <div className="wpo-section-title-s2">
              {/* <h3>Testimonials</h3> */}
              <h2>What Our Client Says About Us</h2>
            </div>
          </div>
        </div>

        <div
          id="testimonialCarousel"
          className="carousel"
          data-bs-ride="carousel"
          ref={carouselRef}
        >
          <div className="carousel-innerr d-flex" ref={innerRef}>
            {duplicatedTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`carousel-itemm ${index === 0 ? "active" : ""}`}
                style={{ flex: `0 0 ${100 / itemsToShow}%` }}
              >
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
          </div>
          <button
            className="carousel-control-prevvv"
            type="button"
            onClick={handlePrev}
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-nexttt"
            type="button"
            onClick={handleNext}
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </section>
  );
}

//

import React, { useEffect, useRef, useState } from "react";
import { GiThreeFriends } from "react-icons/gi";
import { FaStore } from "react-icons/fa";
import { FaShieldAlt } from "react-icons/fa";
import { PiMedalBold } from "react-icons/pi";
import { GiDiamondTrophy } from "react-icons/gi";
import { GiTeamIdea } from "react-icons/gi";
export function WhyChooseEdProwise() {
  const carouselRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);

  const chooseData = [
    {
      id: 1,
      className: "s1",
      iconClass: <GiThreeFriends />,
      title: "Connect Ecosystem",
      description:
        "The Central Dashboard offers real-time access to vital information, including student performance, attendance, and fee status. This enhances communication and collaboration among principals, teachers, management, and parents, supporting student success.",
    },
    {
      id: 2,
      className: "s2",
      iconClass: <FaStore />,
      title: "Marketplace For School",
      description:
        "Marketplace for wide range of services including technology integration, administrative solutions, educational consultation, and professional development, providing holistic support tailored to enhanceevery aspect of educational operations",
    },
    {
      id: 3,
      className: "s3",
      iconClass: <FaShieldAlt />,
      title: "Zero Leakage Of Fees",
      description:
        "Through meticulous reconciliation of school fees, we guarantee zero leakage. Our detailed analysis identifies the gap between fees due and fees collected, enabling us to swiftly address any discrepancie",
    },
    {
      id: 4,
      className: "s4",
      iconClass: <GiDiamondTrophy />,
      title: "Expertise In Educational Solutions",
      description:
        "With a dedicated focus on the education sector, we brings deep expertise and understanding of the unique needs and challenges faced by educational institutions.",
    },
    {
      id: 5,
      className: "s5",
      iconClass: <PiMedalBold />,
      title: "Commitment To Excellence",
      description:
        "Our commitment to excellence is reflected in our mission to empower educational institutions with transformative solutions that enable them to achieve their goals effectively and sustainably",
    },
    {
      id: 6,
      className: "s6",
      iconClass: <GiTeamIdea />,
      title: "Innovative Approach",
      description:
        "We leverage innovative technologies and strategic insights to deliver solutions that drive efficiency, improve learning outcomes, and foster continuous improvement within educational setting.",
    },
  ];

  useEffect(() => {
    const carouselContainer = carouselRef.current;
    const items = carouselContainer.querySelectorAll(".carousel-item-choose");
    const totalItems = items.length;

    let currentIndex = 1; // Start at the first real item
    const intervalTime = 4000; // Time between slides in milliseconds
    let autoplayInterval;

    // Clone first and last items for infinite loop effect
    const firstClone = items[0].cloneNode(true);
    const lastClone = items[totalItems - 1].cloneNode(true);

    // Add clones to the DOM for mobile view
    if (isMobile) {
      carouselContainer.appendChild(firstClone);
      carouselContainer.insertBefore(lastClone, items[0]);
    }

    // Update carousel position
    function updateCarousel() {
      const itemWidth = items[0].offsetWidth;
      carouselContainer.style.transition = "transform 0.5s ease-in-out";
      carouselContainer.style.transform = `translateX(-${
        currentIndex * itemWidth
      }px)`;
    }

    // Move to the next slide
    function moveToNextSlide() {
      const itemWidth = items[0].offsetWidth;
      currentIndex++;
      updateCarousel();

      if (currentIndex === totalItems + 1) {
        // Reset to the first real item
        setTimeout(() => {
          carouselContainer.style.transition = "none";
          currentIndex = 1;
          carouselContainer.style.transform = `translateX(-${
            currentIndex * itemWidth
          }px)`;
        }, 500); // Match transition duration
      }
    }

    // Move to the previous slide
    function moveToPrevSlide() {
      const itemWidth = items[0].offsetWidth;
      currentIndex--;
      updateCarousel();

      if (currentIndex === 0) {
        // Reset to the last real item
        setTimeout(() => {
          carouselContainer.style.transition = "none";
          currentIndex = totalItems;
          carouselContainer.style.transform = `translateX(-${
            currentIndex * itemWidth
          }px)`;
        }, 500); // Match transition duration
      }
    }

    // Start autoplay only for mobile
    function startAutoplay() {
      if (isMobile) {
        autoplayInterval = setInterval(moveToNextSlide, intervalTime);
      }
    }

    // Stop autoplay
    function stopAutoplay() {
      clearInterval(autoplayInterval);
    }

    // Handle window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 992);
    };

    // Initialize autoplay if mobile
    if (isMobile) {
      startAutoplay();
    }

    window.addEventListener("resize", handleResize);

    return () => {
      stopAutoplay();
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  return (
    <section className="wpo-courses-section-s2 section-padding pt-0 pb-1">
      <div className="container edprowise-choose-container">
        <div className="row-web">
          <div className="col-12">
            <div className="wpo-section-title-s2">
              <h2 className="font-family-web">Why Choose EdProwise?</h2>
            </div>
          </div>
        </div>
        <div
          className="row-web wpo-courses-wrap choose-wrapp"
          ref={carouselRef}
        >
          {chooseData.map((item) => (
            <div
              key={item.id}
              className={`col-lg-4 col-md-6 col-12 grid-web  ${item.className} carousel-item-choose`}
            >
              <div className="wpo-courses-item">
                <div className="wpo-courses-text">
                  <div className="courses-icon">
                    {item.iconClass}
                    {/* <i className={item.iconClass}></i> */}
                  </div>
                  <h2 className="font-weight-web-h2">
                    <a href="#">{item.title}</a>
                  </h2>
                  <p className="font-family-web  ">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
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
}

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    date: "25 Sep 2023",
    author: "Anne William",
    title: "The Surprising Reason College Tuition Is Crazy Expensive",
    image: "assets/website-images/blog/img-1.webp",
    link: "/blog/1",
  },
  {
    id: 2,
    date: "26 Sep 2023",
    author: "Robert Fox",
    title: "Become a great WordPress & PHP developer.",
    image: "assets/website-images/blog/img-2.webp",
    link: "/blog/2",
  },
  {
    id: 3,
    date: "28 Sep 2023",
    author: "Devon Lane",
    title: "A critical review of mobile learning integration",
    image: "assets/website-images/blog/img-3.webp",
    link: "/blog/3",
  },
];

const BlogItem = ({ date, author, title, image, link }) => (
  <div className="col col-lg-4 col-md-6 col-12 carousel-item-blog">
    <div className="wpo-blog-item">
      <div className="wpo-blog-img">
        <img src={image} alt={title} />
      </div>
      <div className="wpo-blog-content">
        <ul>
          <li>{date}</li>
          <li>
            By <Link to={link}>{author}</Link>
          </li>
        </ul>
        <h2 className="font-weight-web-h2">
          <Link to={link}>{title}</Link>
        </h2>
        <Link to={link} className="more">
          Continue Reading
        </Link>
      </div>
    </div>
  </div>
);

export function BlogSection() {
  const carouselRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 991);

  useEffect(() => {
    const carouselContainer = carouselRef.current;
    const items = carouselContainer.querySelectorAll(".carousel-item-blog");
    const totalItems = items.length;
    let currentIndex = 1; // Start at the first real item
    const intervalTime = 4000; // Time between slides in milliseconds
    let autoplayInterval;

    // Clone first and last items for infinite loop effect
    const firstClone = items[0].cloneNode(true);
    const lastClone = items[totalItems - 1].cloneNode(true);

    // Add clones to the DOM for mobile view
    if (isMobile) {
      carouselContainer.appendChild(firstClone);
      carouselContainer.insertBefore(lastClone, items[0]);
    }

    // Update carousel position
    function updateCarousel() {
      const itemWidth = items[0].offsetWidth;
      carouselContainer.style.transition = "transform 0.5s ease-in-out";
      carouselContainer.style.transform = `translateX(-${
        currentIndex * itemWidth
      }px)`;
    }

    // Move to the next slide
    function moveToNextSlide() {
      const itemWidth = items[0].offsetWidth;
      currentIndex++;
      updateCarousel();

      if (currentIndex === totalItems + 1) {
        // Reset to the first real item
        setTimeout(() => {
          carouselContainer.style.transition = "none";
          currentIndex = 1;
          carouselContainer.style.transform = `translateX(-${
            currentIndex * itemWidth
          }px)`;
        }, 500); // Match transition duration
      }
    }

    // Start autoplay only for mobile
    function startAutoplay() {
      if (isMobile) {
        autoplayInterval = setInterval(moveToNextSlide, intervalTime);
      }
    }

    // Stop autoplay
    function stopAutoplay() {
      clearInterval(autoplayInterval);
    }

    // Handle window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 991);
    };

    // Initialize autoplay if mobile
    if (isMobile) {
      startAutoplay();
    }

    window.addEventListener("resize", handleResize);

    return () => {
      stopAutoplay();
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  return (
    <section
      className="wpo-blog-section section-padding pt-0 pb-1"
      id="blog"
      style={{ background: "#fcf9ef" }}
    >
      <div className="container edprowise-choose-container">
        <div className="wpo-section-title-s2 mb-2">
          <h2 className="font-family-web">Our Latest News</h2>
        </div>
        <div className="wpo-blog-items">
          <div className="row-web row-blog" ref={carouselRef}>
            {blogPosts.map((post) => (
              <BlogItem
                key={post.id}
                date={post.date}
                author={post.author}
                title={post.title}
                image={post.image}
                link={post.link}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
export function EdprowiseTalk() {
  const carouselRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);

  const slides = [
    {
      icon: "fi flaticon-training",
      title: "CRM Driven Process",
      // description: "We have highly expert mentors for our student’s best support.",
    },
    {
      icon: "fi flaticon-support",
      title: "Instant User Support",
      // description: "We are always here to help our students and solve problems.",
    },
    {
      icon: "fi flaticon-e-learning",
      title: "Guide, Manual & Training",
      // description: "We have highly expert mentors for our student’s best support.",
    },
    {
      icon: "fi flaticon-medal-1",
      title: "Highly Trained Team",
      // description: "We are always here to help our students and solve problems.",
    },
  ];

  useEffect(() => {
    const carouselContainer = carouselRef.current;
    const items = carouselContainer.querySelectorAll(".grid-web");
    const totalItems = items.length;

    let currentIndex = 1; // Start at the first real item
    const intervalTime = 4000; // Time between slides in milliseconds
    let autoplayInterval;

    // Clone first and last items for infinite loop effect
    const firstClone = items[0].cloneNode(true);
    const lastClone = items[totalItems - 2].cloneNode(true);

    // Add clones to the DOM for mobile view
    if (isMobile) {
      carouselContainer.appendChild(firstClone);
      carouselContainer.insertBefore(lastClone, items[0]);
    }

    // Update carousel position
    function updateCarousel() {
      const itemWidth = items[0].offsetWidth;
      carouselContainer.style.transition = "transform 0.5s ease-in-out";
      carouselContainer.style.transform = `translateX(-${
        currentIndex * itemWidth
      }px)`;
    }

    // Move to the next slide
    function moveToNextSlide() {
      const itemWidth = items[0].offsetWidth;
      currentIndex++;
      updateCarousel();

      if (currentIndex === totalItems + 1) {
        // Reset to the first real item
        setTimeout(() => {
          carouselContainer.style.transition = "none";
          currentIndex = 1;
          carouselContainer.style.transform = `translateX(-${
            currentIndex * itemWidth
          }px)`;
        }, 500); // Match transition duration
      }
    }

    // Move to the previous slide
    function moveToPrevSlide() {
      const itemWidth = items[0].offsetWidth;
      currentIndex--;
      updateCarousel();

      if (currentIndex === 0) {
        // Reset to the last real item
        setTimeout(() => {
          carouselContainer.style.transition = "none";
          currentIndex = totalItems;
          carouselContainer.style.transform = `translateX(-${
            currentIndex * itemWidth
          }px)`;
        }, 500); // Match transition duration
      }
    }

    // Start autoplay only for mobile
    function startAutoplay() {
      if (isMobile) {
        autoplayInterval = setInterval(moveToNextSlide, intervalTime);
      }
    }

    // Stop autoplay
    function stopAutoplay() {
      clearInterval(autoplayInterval);
    }

    // Handle window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 992);
    };

    // Initialize autoplay if mobile
    if (isMobile) {
      startAutoplay();
    }

    window.addEventListener("resize", handleResize);

    return () => {
      stopAutoplay();
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  return (
    <>
      <section className="wpo-choose-section-s2 section-padding pt-0 pb-1">
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
            <div className="wpo-choose-grids clearfix" ref={carouselRef}>
              {slides.map((slide, index) => (
                <div
                  className="grid-web"
                  key={index}
                  style={{ display: "inline-flex !important" }}
                >
                  <div className="icon">
                    <i className={slide.icon}></i>
                  </div>
                  <div className="info">
                    <h3>{slide.title}</h3>
                    <p>{slide.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section
        className="wpo-choose-section-s2 section-padding pt-lg-0 pb-lg-3"
        style={{ background: "white" }}
      >
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
}

import react, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { RiEmotionHappyLine } from "react-icons/ri";
import { FaHandsHelping } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { TbReportSearch } from "react-icons/tb";
import { IoIosSend } from "react-icons/io";
export function HomeMainSection() {
  const slideTrackRef = useRef(null);
  const [counter, setCounter] = useState(0);
  const words = ["Transforming", "Unlocking", "Redifining", "Nurturing"];
  const intervalTime = 3000;
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  // const intervalTime = 4000; // 4 seconds
  const [autoplay, setAutoplay] = useState(window.innerWidth <= 570);
  const [activeIndex, setActiveIndex] = useState(1);
  const [translateValue, setTranslateValue] = useState(100); // Default to 100%

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setTranslateValue(100);
      } else if (window.innerWidth <= 991) {
        setTranslateValue(50);
      } else {
        setTranslateValue(100);
      }
    };

    handleResize(); // Call once to set initial value
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => (prevCounter + 1) % words.length);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [words.length, intervalTime]);

  useEffect(() => {
    let autoplayInterval;

    const startAutoplay = () => {
      if (autoplay) {
        autoplayInterval = setInterval(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % featuresData.length);
        }, intervalTime);
      }
    };

    const stopAutoplay = () => {
      clearInterval(autoplayInterval);
    };

    // Start autoplay when below 570px
    if (autoplay) {
      startAutoplay();
    }

    // Clean up on unmount
    return () => stopAutoplay();
  }, [autoplay, intervalTime]);

  // Update autoplay on screen resize
  useEffect(() => {
    const handleResize = () => {
      setAutoplay(window.innerWidth <= 991);
      if (window.innerWidth > 991) {
        setCurrentIndex(0); // Reset carousel to first item on larger screens
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleHover = (index) => {
    if (!autoplay) {
      setCurrentIndex(index);
    }
  };

  const handleMouseEnter = (index) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(1);
  };

  // Array of unique names for the slides
  const slideNames = [
    "Fees Management",
    "Payroll Management",
    "Digital Exam Result",
    "Student & Staff Attendance",
    "Library Management",
    "Admission Management",
    "Website Design",
    "PF & ESI Consultancy",
    "Event Management",
    "Affiliation Support",
    "Student Counselling",
    "Procurement Service",
    "Hiring Solutions",
    "Assessment of Candidate",
  ];

  const featuresData = [
    {
      id: 1,
      icon: <RiEmotionHappyLine />,
      title: "5+ Happy Clients ",
    },
    {
      id: 2,
      icon: <FaHandsHelping />,
      title: "99% Full Loyalty",
    },
    {
      id: 3,
      icon: <FaUsers />,
      title: "5K+ Users",
    },
    {
      id: 4,
      icon: <TbReportSearch />,
      title: "100+ Reports",
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const searchBoxRef = useRef(null);

  const serviceData = [
    {
      title: "School Fees Management Software - Pixel Fees",
      send: "/services/digital-services/fees",
    },
    {
      title: "Payroll Management Software – Ease Payroll",
      send: "/services/digital-services/payroll",
    },
    {
      title: "Financial Management Software – Book Sync",
      send: "/services/digital-services/booksync",
    },
    {
      title: "School Operational Management Software",
      send: "/services/digital-services/schooloperation",
    },
    {
      title: "School Mobile Application",
      send: "/services/digital-services/schoolApplication",
    },
    {
      title: "School Website Design",
      send: "/services/digital-services/school-Website-Design",
    },
    { title: "Digital Exam Result System", send: "/services/digital-services" },
    { title: "Digital Student Attendance", send: "/services/digital-services" },
    { title: "Digital Staff Attendance", send: "/services/digital-services" },
    {
      title: "Library Management Software",
      send: "/services/digital-services",
    },
    {
      title: "Entrance Management Software",
      send: "/services/digital-services",
    },
    { title: "Online Payment Gateway", send: "/services/digital-services" },
    {
      title: "SMS & WhatsApp Integration Services",
      send: "/services/digital-services",
    },
    { title: "PF Consultancy", send: "/services/business-services" },
    { title: "ESI Consultancy", send: "/services/business-services" },
    { title: "Affiliation Support", send: "/services/business-services" },
    {
      title: "International Tour Management",
      send: "/services/business-services",
    },
    { title: "Student Counselling", send: "/services/business-services" },
    {
      title: "Training & Workshop for Teache",
      send: "/services/business-services",
    },
  ];

  const filteredServices = searchQuery
    ? serviceData.filter((service) =>
        service.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : serviceData.slice(0, 5);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target)
      ) {
        setIsExpanded(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <>
      <section className="slider-section pb-0">
        <div className="sliderr">
          <div className="slide-track" ref={slideTrackRef}>
            {slideNames.map((name, index) => (
              <div key={index} className="slidee">
                <div className="fw-bold p-2-web">{name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="static-hero-s2 home-hero-section">
        <div className="hero-container home-hero-container">
          <div className="hero-inner home-hero-inner p-0">
            <div className="container-fluid home-hero-container-fluid">
              <div className="hero-content">
                {/* Slide Title */}
                <div data-swiper-parallax="300" className="slide-title">
                  <h2 className="font-family-web">
                    Empowering Schools,
                    <span>
                      <small
                        id="changing"
                        className="fade-in hf-size fw-bold"
                        key={counter}
                      >
                        {words[counter]}
                      </small>
                    </span>
                    Excellence
                  </h2>
                </div>
                <div data-swiper-parallax="400" class="slide-text">
                  <p className="text-black">
                    Inspiring growth, fostering innovation, shaping the future,
                    and cultivating success in education.
                  </p>
                </div>

                {/* Slide Text */}
                <div data-swiper-parallax="400" className="slide-text">
                  <p className="font-family-web"></p>
                </div>

                <div className="serach-expand slide-text" ref={searchBoxRef}>
                  <div
                    className="searchbox-wrap slide-text"
                    data-swiper-parallax="400"
                  >
                    <input
                      className="home-search-input"
                      type="text"
                      placeholder="Search Our Services..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onClick={() => setIsExpanded(true)}
                    />
                    <button>
                      <span className="font-family-web">Search</span>
                    </button>
                  </div>
                  {/* Service suggestions dropdown list-unstyled */}
                  {isExpanded && (
                    <ul className="service-suggestions slide-text pb-2  ">
                      {filteredServices.length > 0 ? (
                        filteredServices.map((service, index) => (
                          <Link to={service.send}>
                            <li className="d-flex justify-content-between text-black mb-1 align-item-center pl-2 ">
                              <div
                                key={index}
                                className="service-item pl-1"
                                onClick={() => {
                                  setSearchQuery(service.title);
                                  setIsExpanded(false);
                                }}
                              >
                                {service.title}
                              </div>
                              <span className="">
                                <IoIosSend />
                              </span>
                            </li>
                          </Link>
                        ))
                      ) : (
                        <div className="no-results">No services found</div>
                      )}
                    </ul>
                  )}
                </div>

                {/* Call-to-Action Button */}
                <div data-swiper-parallax="500" className="slide-btns">
                  <Link to="/request-demo" className="theme-btn">
                    Request For Demo
                  </Link>
                </div>
              </div>

              {/* Student Picture with Shapes */}
              <div className="home-hero-outer-pic">
                <div className="student-pic home-hero-student-pic home-page-section-img">
                  {/* <img src="assets/website-images/event/HomePage.png" alt="Student" /> */}
                  <div
                    className="wpo-about-img"
                    style={{ textAlign: "center" }}
                  >
                    <img
                      src="/assets/images/EdProwiseFavicon.png"
                      alt=""
                      style={{ width: "29%" }}
                    />
                    <div className="back-shapee">
                      <img
                        src="/assets/website-images/event/HomePage.png"
                        alt=""
                        style={{ width: "80%" }}
                      />
                    </div>
                  </div>
                  <div className="wp-shape-1">
                    <img
                      src="assets/website-images/slider/shape-1.svg"
                      alt="Shape 1"
                    />
                  </div>
                  <div className="wp-shape-2">
                    <img
                      src="assets/website-images/slider/shape-2.svg"
                      alt="Shape 2"
                    />
                  </div>
                  <div className="wp-shape-3">
                    <img
                      src="assets/website-images/slider/shape-3.svg"
                      alt="Shape 3"
                    />
                  </div>
                  <div className="wp-shape-4">
                    <img
                      src="assets/website-images/slider/shape-4.svg"
                      alt="Shape 4"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="wpo-features-area section-padding pt-0">
        <div className="container-fluid">
          <div className="features-wrap">
            <div
              className="row-web features-wrapp back-color"
              ref={carouselRef}
              style={{
                transform: `translateX(-${currentIndex * translateValue}%)`,
                transition: "transform 0.5s ease-in-out",
                // background:"#A9FFFD",
                borderRadius: "10px",
              }}
            >
              {featuresData.map((feature, index) => (
                <div
                  key={feature.id}
                  className={`col col-lg-3 col-md-6 col-12 carousel-itemm ${
                    index === currentIndex ? "active" : "item"
                  }`}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div
                    className={`feature-item-wrap ${
                      window.innerWidth <= 992
                        ? index === currentIndex
                          ? "active"
                          : ""
                        : activeIndex === index
                        ? "active"
                        : ""
                    }`}
                  >
                    <div className="feature-item d-flex feature-itemm-small">
                      <div className="icon">
                        {/* <FontAwesomeIcon icon="fa-solid fa-face-smile" />        */}
                        {/* <RiEmotionHappyLine /> */}
                        {feature.icon}

                        <i className={feature.icon}></i>
                      </div>
                      <div className="feature-text align-content-center m-2">
                        <h2 className="font-weight-web-h2 mb-0">
                          <a className="feature-title-color">{feature.title}</a>
                        </h2>
                        {/* <p>{feature.description}</p> */}
                      </div>
                    </div>
                    <div className="feature-item-hidden d-flex feature-itemm-small">
                      <div className="icon">
                        {feature.icon}

                        {/* <i className={feature.icon}></i> */}
                      </div>
                      <div className="feature-text align-content-center m-2">
                        <h2 className="font-weight-web-h2 mb-0">
                          {feature.title}
                        </h2>
                        {/* <p>{feature.hiddenDescription}</p> */}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
const EdprowiseTalk = () => {
  const carouselRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);

  const slides = [
    {
      icon: "fi flaticon-training",
      title: "CRM Driven Process",
      // description: "We have highly expert mentors for our student’s best support.",
    },
    {
      icon: "fi flaticon-support",
      title: "Instant User Support",
      // description: "We are always here to help our students and solve problems.",
    },
    {
      icon: "fi flaticon-e-learning",
      title: "Guide, Manual & Training",
      // description: "We have highly expert mentors for our student’s best support.",
    },
    {
      icon: "fi flaticon-medal-1",
      title: "Highly Trained Team",
      // description: "We are always here to help our students and solve problems.",
    },
  ];

  useEffect(() => {
    const carouselContainer = carouselRef.current;
    const items = carouselContainer.querySelectorAll(".grid-web");
    const totalItems = items.length;

    let currentIndex = 1; // Start at the first real item
    const intervalTime = 4000; // Time between slides in milliseconds
    let autoplayInterval;

    // Clone first and last items for infinite loop effect
    const firstClone = items[0].cloneNode(true);
    const lastClone = items[totalItems - 2].cloneNode(true);

    // Add clones to the DOM for mobile view
    if (isMobile) {
      carouselContainer.appendChild(firstClone);
      carouselContainer.insertBefore(lastClone, items[0]);
    }

    // Update carousel position
    function updateCarousel() {
      const itemWidth = items[0].offsetWidth;
      carouselContainer.style.transition = "transform 0.5s ease-in-out";
      carouselContainer.style.transform = `translateX(-${
        currentIndex * itemWidth
      }px)`;
    }

    // Move to the next slide
    function moveToNextSlide() {
      const itemWidth = items[0].offsetWidth;
      currentIndex++;
      updateCarousel();

      if (currentIndex === totalItems + 1) {
        // Reset to the first real item
        setTimeout(() => {
          carouselContainer.style.transition = "none";
          currentIndex = 1;
          carouselContainer.style.transform = `translateX(-${
            currentIndex * itemWidth
          }px)`;
        }, 500); // Match transition duration
      }
    }

    // Move to the previous slide
    function moveToPrevSlide() {
      const itemWidth = items[0].offsetWidth;
      currentIndex--;
      updateCarousel();

      if (currentIndex === 0) {
        // Reset to the last real item
        setTimeout(() => {
          carouselContainer.style.transition = "none";
          currentIndex = totalItems;
          carouselContainer.style.transform = `translateX(-${
            currentIndex * itemWidth
          }px)`;
        }, 500); // Match transition duration
      }
    }

    // Start autoplay only for mobile
    function startAutoplay() {
      if (isMobile) {
        autoplayInterval = setInterval(moveToNextSlide, intervalTime);
      }
    }

    // Stop autoplay
    function stopAutoplay() {
      clearInterval(autoplayInterval);
    }

    // Handle window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 992);
    };

    // Initialize autoplay if mobile
    if (isMobile) {
      startAutoplay();
    }

    window.addEventListener("resize", handleResize);

    return () => {
      stopAutoplay();
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  return (
    <>
      <section className="wpo-choose-section-s2 section-padding pt-0 pb-1">
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
            <div className="wpo-choose-grids clearfix" ref={carouselRef}>
              {slides.map((slide, index) => (
                <div
                  className="grid-web"
                  key={index}
                  style={{ display: "inline-flex !important" }}
                >
                  <div className="icon">
                    <i className={slide.icon}></i>
                  </div>
                  <div className="info">
                    <h3>{slide.title}</h3>
                    <p>{slide.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section
        className="wpo-choose-section-s2 section-padding pt-lg-0 pb-lg-3"
        style={{ background: "white" }}
      >
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
