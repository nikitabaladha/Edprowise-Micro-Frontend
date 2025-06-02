import React from "react";
import { Link,   } from "react-router-dom";
const EducatorZoneSection = () => {
  const blogPosts = [
    {
      date: "25 Sep 2023",
      author: "Anne William",
      title: "How to Be a Successful School Teacher",
      image: "/assets/website-images/blog-details/EducatorZone1.jpg",
      link:"/community-connect/educator-zone/how-to-be-successful-teacher",
    },
    {
      date: "26 Sep 2023",
      author: "Robert Fox",
      title: "Teaching Strategies & Pedagogy: A Guide for Educators",
      image: "/assets/website-images/blog-details/EducatorZone2.jpg",
      link:"/community-connect/educator-zone/teaching-strategies-and-pedagogy",
    },
    {
      date: "28 Sep 2023",
      author: "Devon Lane",
      title: "Teacher Well-being & Work-Life Balance: A Guide to Sustainable Teaching",
      image: "/assets/website-images/blog-details/EducatorZone3.jpg",
      link:"/community-connect/educator-zone/teacher-well-being-and-work-life-balance",
    },
  ];

  return (
    <section className="wpo-blog-section section-padding pt-lg-3 pb-lg-2 pt-mb-2 pb-mb-1" id="blog" >
      <div className="container edprowise-choose-container">
      
        <div className="wpo-blog-items">
    <div className="row-web">
      {blogPosts.map((post, index) => (
        <div key={index} className="col col-lg-4 col-md-6 col-6 ">
          <Link to={post.link}>
          <div className="wpo-blog-item mb-lg-3 blog-item-custom">
            <div className="wpo-blog-img">
              <img src={post.image} alt={post.title} />
            </div>
            <div className="wpo-blog-content">
              <h2 className="font-weight-web-h2">
                <a >{post.title}</a>
              </h2>
              <Link to={post.link}  className="more">
                Continue Reading
              </Link>
            </div>
          </div>
          </Link>
        </div>
      ))}
    </div>
    </div>
    </div>
    </section>
  );
};

export default EducatorZoneSection;
