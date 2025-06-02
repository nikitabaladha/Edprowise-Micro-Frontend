import react from "react";

const CompanyJourney = () => {
  const coursesData = [
    {
      id: 1,
      icon: "fi flaticon-user-experience",
      title: "UI/UX Design",
      description:
        "We are providing you the best UI/UX design guideline. That help you be professional and talented designer.",
      link: "#",
    },
    {
      id: 2,
      icon: "fi flaticon-megaphone",
      title: "Digital Marketing",
      description:
        "We are providing you the best UI/UX design guideline. That help you be professional and talented designer.",
      link: "#",
    },
    {
      id: 3,
      icon: "fi flaticon-code",
      title: "Development",
      description:
        "We are providing you the best UI/UX design guideline. That help you be professional and talented designer.",
      link: "#",
    },
    {
      id: 4,
      icon: "fi flaticon-knowledge",
      title: "Self Improvement",
      description:
        "We are providing you the best UI/UX design guideline. That help you be professional and talented designer.",
      link: "#",
    },
  ];

  return (
    <>
      <section className="wpo-courses-section-s2 section-padding">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="wpo-section-title-s2">
                {/* <small>Our Courses</small> */}
                <h2>Our Journey</h2>
              </div>
            </div>
          </div>
          <div className="row wpo-courses-wrap">
            {coursesData.map((course) => (
              <div
                key={course.id}
                className={`category-items col-lg-3 col-md-6 col-6 grid-web s${course.id}`}
              >
                <div className="wpo-courses-item category-itemm">
                  <div className="wpo-courses-text">
                    <div className="courses-icon category-icons">
                      <i className={course.icon}></i>
                    </div>
                    <h2 className="category-h2 font-weight-web-h2">
                      <a href={course.link}>{course.title}</a>
                    </h2>
                    <p className="category-text">{course.description}</p>
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
    </>
  );
};

export default CompanyJourney;
