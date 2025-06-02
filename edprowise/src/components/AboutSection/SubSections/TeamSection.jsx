import React from "react";

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Kunal Shah",
      role: "CEO",
      image: "assets/website-images/kunalCEO-preview (1).jpg",
      description:
        " CA with 5 Year of Experience in Corporate Finance",
      socialLinks: {
        linkedin: " https://www.linkedin.com/in/ca-kunal-shah-a7618a100?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      },
    },
    {
      name: "Jai Gupta",
      role: "COO",
      image: "assets/website-images/jayGupta-preview (1).jpg",
      description:
        "CA with 5 Year of experience in Audit",
      socialLinks: {
        linkedin: "#",
      },
    },
    {
      name: "Dhiraj Zope",
      role: "CTO",
      image: "assets/website-images/dhirajsir-preview (1).jpg",
      description:
        "3yrs of experience in Software Life Cycle",
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/dhiru805",
      },
    },
    {
      name: "Dhruv Anand",
      role: "CFO",
      image: "assets/website-images/DhruvPhota.jpg",
      description:
        "CA With 5 Year of experience in Audit",
      socialLinks: {
        linkedin: "#",
      },
    },
  ];

  return (
    <section className="wpo-team-section section-padding pt-lg-3 pb-lg-3 pt-mb-2 pb-mb-2">
      <div className="container">
        <div className="wpo-section-title-s2">
          {/* <small>Our Professionals</small> */}
          <h2>
          Meet the    
            <span style={{margin:"0 5px"}} >
             Exceptional
              <i className="shape">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 206 53"
                  fill="none"
                >
                  <path d="M152.182 2.58319C107.878 0.889793 54.8748 6.13932 21.2281 18.6943C14.2699 21.4407 7.93951 24.7738 5.70192 28.7128C4.27488 31.2398 5.03121 33.954 7.69121 36.2925C14.8835 42.3911 31.9822 45.4011 46.8006 47.3115C78.3067 51.0179 113.672 51.7406 145.489 48.3204C167.194 46.0009 200.667 39.5923 199.399 28.5709C198.543 20.0621 180.437 14.5729 162.979 11.6178C138.219 7.469 111.131 6.00576 84.5743 5.86862C71.32 5.85789 58.0913 6.85723 45.6675 8.78436C33.512 10.7186 21.2709 13.4317 12.6602 17.5817C11.2246 18.2877 8.62449 17.4553 9.9973 16.6813C20.7486 11.2493 38.0215 7.73493 53.9558 5.76368C77.1194 2.90994 101.75 3.75426 125.339 5.14356C158.167 7.2615 207.554 13.5139 204.928 30.7413C203.629 36.0898 194.762 40.5057 184.681 43.5503C156.563 51.768 119.114 53.6844 85.6331 52.5265C65.1694 51.7477 44.4831 50.1855 25.9972 46.2442C11.4129 43.1186 -1.0337 37.8297 0.0679738 30.5063C2.14003 19.9035 31.4913 12.0006 52.6201 7.98775C71.2971 4.45904 91.3384 2.2302 111.674 1.24636C125.228 0.595237 138.962 0.539188 152.536 1.15931C153.475 1.20224 154.154 1.55523 154.051 1.94876C153.951 2.33872 153.115 2.62135 152.182 2.58319Z" />
                </svg>
              </i>
            </span>
            Minds at Edprowise
          </h2>
        </div>
        <div className="wpo-team-wrap">
          <div className="row">
            {teamMembers.map((member, index) => (
              <div key={index} className="col col-lg-3 col-md-6 col-6">
                <div className="wpo-team-item">
                  <div className="wpo-team-img">
                    <div className="wpo-team-img-box">
                      <img src={member.image} alt={member.name} />
                      <div className="profile-info team-profile-info">
                        <p className="team-para">{member.description}</p>
                      </div>
                      <ul>
                        {/* <li>
                          <a href={member.socialLinks.facebook}>
                            <i className="fi flaticon-facebook-app-symbol"></i>
                          </a>
                        </li>
                        <li>
                          <a href={member.socialLinks.twitter}>
                            <i className="fi flaticon-twitter"></i>
                          </a>
                        </li> */}
                        <li>
                          <a href={member.socialLinks.linkedin}>
                            <i className="fi flaticon-linkedin"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="wpo-team-text">
                    <h2>
                      <a >{member.name}</a>
                    </h2>
                    <span>{member.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>{" "}
      {/* end container */}
      <div className="shape-1">
        <img src="assets/website-images/team/shape-1.svg" alt="" />
      </div>
      <div className="shape-2">
        <img src="assets/website-images/team/shape-2.svg" alt="" />
      </div>
      <div className="shape-3">
        <img src="assets/website-images/team/shape-3.svg" alt="" />
      </div>
      <div className="shape-4">
        <img src="assets/website-images/team/shape-4.svg" alt="" />
      </div>
    </section>
  );
};

export default TeamSection;
