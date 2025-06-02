import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

const blogPosts = [
  // {
  //   id: 1,
  //   date: "25 Sep 2023",
  //   author: "Anne William",
  //   title: "The Surprising Reason College Tuition Is Crazy Expensive",
  //   image: "assets/website-images/blog/img-1.webp",
  //   link: "/blog/1",
  // },
  {
    date: "25 Sep 2023",
    author: "Anne William",
    title: "How to Be a Successful School Teacher",
    image: "/assets/website-images/blog-details/EducatorZone1.jpg",
    link: "/community-connect/educator-zone/how-to-be-successful-teacher",
  },
  {
    date: "26 Sep 2023",
    author: "Robert Fox",
    title:
      "How to Be Successful in the CBSE Board Exam: Tips and Strategies for Students",
    image: "/assets/website-images/blog-details/howtosuccessfulstudent.jpg",
    link: "/community-connect/student-zone/how-to-be-successful-in-the-cbse-board-exam",
  },
  {
    date: "26 Sep 2023",
    author: "Robert Fox",
    title: "Teaching Strategies & Pedagogy: A Guide for Educators",
    image: "/assets/website-images/blog-details/EducatorZone2.jpg",
    link: "/community-connect/educator-zone/teaching-strategies-and-pedagogy",
  },
];

const BlogItem = ({ date, author, title, image, link }) => (
  <div className="carousel-item-blog">
    <Link to={link}>
      <div className="wpo-blog-item">
        <div className="wpo-blog-img">
          <img src={image} alt={title} />
        </div>
        <div className="wpo-blog-content">
          <h2 className="font-weight-web-h2">
            <Link to={link}>{title}</Link>
          </h2>
          <Link to={link} className="more">
            Continue Reading
          </Link>
        </div>
      </div>
    </Link>
  </div>
);

const BlogSection = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 991);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 991);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settings = isMobile
    ? {
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 767,
            settings: {
              swipe: true,
              touchMove: true,
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      }
    : {
        infinite: false, // No looping
        autoplay: false, // Disable autoplay
        slidesToShow: 3, // Show 3 items
        slidesToScroll: 1, // Keep it consistent
        arrows: false, // Hide arrows
        dots: false, // Hide dots
      };

  return (
    <section
      className="wpo-blog-section section-padding section-background-box-shadow pt-2 pb-0"
      id="blog"
    >
      <div className="container edprowise-choose-container">
        <div className="wpo-section-title-s2 mb-2">
          <h2 className="font-family-web">Our Latest News</h2>
        </div>
        <div className="wpo-blog-items">
          <Slider {...settings}>
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
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
