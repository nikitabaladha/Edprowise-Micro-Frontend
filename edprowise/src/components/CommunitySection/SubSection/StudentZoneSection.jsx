import React from "react";
import { Link, useLocation,  } from "react-router-dom";
const StudentZoneSection = () => {
  const blogPosts = [
    {
      date: "25 Sep 2023",
      author: "Anne William",
      title: "Proposed Exam Reforms by CBSE: A Step Towards Reducing Academic Stress and Improving Learning Outcomes",
      image: "/assets/website-images/blog-details/CBSE-exam-reform.jpg",
      link: "/community-connect/student-zone/proposed-exam-reforms-by-cbse"
    },
    {
      date: "26 Sep 2023",
      author: "Robert Fox",
      title: "How to Be Successful in the CBSE Board Exam: Tips and Strategies for Students",
      image: "/assets/website-images/blog-details/howtosuccessfulstudent.jpg",
      link:"/community-connect/student-zone/how-to-be-successful-in-the-cbse-board-exam"
    },
    // {
    //   date: "28 Sep 2023",
    //   author: "Devon Lane",
    //   title: "A critical review of mobile learning integration",
    //   image: "/assets/website-images/blog/img-3.webp",
    // },
  ];

  return (
    <section className="wpo-blog-section section-padding pt-lg-3 pb-lg-2 pt-mb-2 pb-mb-1" id="blog">
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
              {/* <ul className="blog-list-ul">
                <li>{post.date}</li>
                <li>
                  By <a >{post.author}</a>
                </li>
              </ul> */}
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

export default StudentZoneSection;
