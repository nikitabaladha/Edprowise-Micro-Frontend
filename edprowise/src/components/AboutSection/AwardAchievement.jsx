import React from "react";

const AwardAchievement = () => {
  const courses = [
    {
      id: 1,
      image: "assets/website-images/popular/img-1.webp",
      thumb: "$80",
      avatar: "assets/website-images/popular/avater/img-1.webp",
      instructor: "Robert Henry",
      courseLink: "course-single.html",
      courseName: "Learn WordPress & Elementor for Beginners",
      rating: 4.5,
      students: 245,
      lessons: 25,
    },
    {
      id: 2,
      image: "assets/website-images/popular/img-2.webp",
      thumb: "$200",
      avatar: "assets/website-images/popular/avater/img-2.webp",
      instructor: "Jenny Wilson",
      courseLink: "course-single.html",
      courseName: "The Complete Guide to Be a Graphics Designer.",
      rating: 5.0,
      students: 365,
      lessons: 35,
    },
    {
      id: 3,
      image: "assets/website-images/popular/img-3.webp",
      thumb: "$90",
      avatar: "assets/website-images/popular/avater/img-3.webp",
      instructor: "Jerome Bell",
      courseLink: "course-single.html",
      courseName: "Learning How To Write As A Professional Author",
      rating: 4.9,
      students: 134,
      lessons: 12,
    },
  ];

  return (
    <div className="wpo-popular-area section-padding">
      <div className="container">
        <div className="wpo-section-title-s2">
          <h2>Award and Achievement</h2>
        </div>
        <div className="wpo-popular-wrap">
          <div className="row">
            {courses.map((course) => (
              <div
                className="col col-lg-4 col-md-6 category-items"
                key={course.id}
              >
                <div className="wpo-popular-single">
                  <div className="wpo-popular-item">
                    <div className="wpo-popular-img Award-img">
                      <img src={course.image} alt={course.courseName} />
                      <div className="thumb">
                        <span>{course.thumb}</span>
                      </div>
                    </div>
                    <div className="wpo-popular-content">
                      <div className="wpo-popular-text-top">
                        <ul>
                          <li className="award-list">
                            <img src={course.avatar} alt={course.instructor} />
                          </li>
                          <li className="award-list">
                            <a>{course.instructor}</a>
                          </li>
                        </ul>
                        <ul className="award-ul">
                          <li className="award-list">
                            <i className="fi flaticon-star"></i>
                          </li>
                          <li className="award-list">({course.rating})</li>
                        </ul>
                      </div>
                      <h2 className="award-headline">
                        <a>{course.courseName}</a>
                      </h2>
                      <div className="wpo-popular-text-bottom">
                        <ul>
                          <li className="award-listt">
                            <i className="fi flaticon-reading-book"></i>{" "}
                            {course.students} Students
                          </li>
                          <li className="award-listt">
                            <i className="fi flaticon-agenda"></i>{" "}
                            {course.lessons} Lesson
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="more-btn text-center">
          <a href="course.html" className="theme-btn-ss">
            View All Courses
          </a>
        </div>
      </div>
    </div>
  );
};

export default AwardAchievement;
