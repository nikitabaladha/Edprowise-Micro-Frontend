import React from "react";

const PressMediaSection = () => {
  const blogPosts = [
    {
      date: "25 Sep 2023",
      author: "Anne William",
      title: "The Surprising Reason College Tuition Is Crazy Expensive",
      image: "assets/website-images/blog/img-1.webp",
      link: "blog-single.html",
    },
    {
      date: "26 Sep 2023",
      author: "Robert Fox",
      title: "Become a great WordPress & PHP developer.",
      image: "assets/website-images/blog/img-2.webp",
      link: "blog-single.html",
    },
    {
      date: "28 Sep 2023",
      author: "Devon Lane",
      title: "A critical review of mobile learning integration",
      image: "assets/website-images/blog/img-3.webp",
      link: "blog-single.html",
    },
  ];

  return (
    <section className="wpo-blog-section section-padding pt-lg-3 pb-lg-2 pt-mb-2 pb-mb-1" id="blog"  style={{ background: "#fcf9ef" }}>
      <div className="container edprowise-choose-container">
      
        <div className="wpo-blog-items">
    <div className="row-web">
      {blogPosts.map((post, index) => (
        <div key={index} className="col col-lg-4 col-md-6 col-6 ">
          <div className="wpo-blog-item mb-lg-3 blog-item-custom">
            <div className="wpo-blog-img">
              <img src={post.image} alt={post.title} />
            </div>
            <div className="wpo-blog-content">
              <ul className="blog-list-ul">
                <li>{post.date}</li>
                <li>
                  By <a >{post.author}</a>
                </li>
              </ul>
              <h2 className="font-weight-web-h2">
                <a >{post.title}</a>
              </h2>
              <a  className="more">
                Continue Reading
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
    </div>
    </section>
  );
};

export default PressMediaSection;
