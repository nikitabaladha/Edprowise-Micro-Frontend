import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const handleDownload = (tabName) => {
    if (tabName === "brochureSection") {
      const link = document.createElement("a");
      link.href = "/assets/website-images/EdProwise Brochure.pdf";
      link.download = "EdProwise-Brochure.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleHomePageRender = (event) => {
    event.preventDefault();
    event.stopPropagation();
    navigate(`/`);
  };

  const menuData = [
    { name: "Home", link: "/" },
    {
      name: "About Us",
      link: "/about-us",
    },
    {
      name: "Services",
      link: "/services/digital-services",
    },
    { name: "Orders", link: "/order" },
    {
      name: "Community Connect",
      link: "/community-connect/gallery",
    },
  ];

  const useLinks = [
    { name: "Contact Us", link: "/contact-us", subMenu: [] },
    {
      name: "Career",
      link: "/career",
    },
    {
      name: "FAQ",
      link: "/faq",
    },
    {
      name: "Download Brochure",
    },
    { name: "Become A Supplier", link: "/signup" },
  ];
  return (
    <footer className="wpo-site-footer">
      <div className="wpo-upper-footer">
        <div className="container">
          <div className="row">
            {/* About Widget */}
            <div className="col col-lg-3 col-md-6 col-12 col-sm-12 mt-0">
              <div className="widget about-widget">
                <div className="logo widget-title">
                  <Link
                    onClick={(event) => handleHomePageRender(event)}
                    className="navbar-brand"
                  >
                    <img
                      src="/assets/website-images/EdProwise New Logo White-1.png"
                      width="180px"
                      alt="EdProwise Logo"
                    />
                  </Link>
                </div>
                <p>
                  Market place for school which offers wide range of services
                  including technology integration, professional development,
                  providing holistic support tailored to enhance every aspect of
                  educational operations.
                  {/* Startup founded on the principle of empowering educational institutions, specializes in delivering various services to educational institution */}
                </p>
                <div className="social">
                  <ul>
                    <li>
                      <a href="https://www.facebook.com/profile.php?id=100088336484479&mibextid=ZbWKwL">
                        <i className="fi flaticon-facebook-app-symbol"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://x.com/edprowise?s=09">
                        <i className="fi flaticon-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.linkedin.com/company/edprowise/">
                        <i className="fi flaticon-linkedin"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.instagram.com/edprowise?igsh=MWM4ZTAwNmo1bTA3MA==">
                        <i className="fi flaticon-instagram-1"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://youtube.com/@edprowise?si=-9fYnKkzsGFcXCQE">
                        <i className="fi flaticon-youtube"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Quick Links */}
            <div className="col col-lg-3 col-md-6 col-12 col-sm-12">
              <div className="widget link-widget">
                <div className="widget-title">
                  <h3>Quick Links</h3>
                </div>
                <ul>
                  {menuData.map((menu, index) => (
                    <li key={index}>
                      <Link to={menu.link}>{menu.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Useful Links */}
            <div className="col col-lg-3 col-md-6 col-12 col-sm-12">
              <div className="widget link-widget s2">
                <div className="widget-title">
                  <h3>Useful Links</h3>
                </div>
                <ul>
                  {useLinks.map((menu, index) => (
                    <li key={index}>
                      {index === 3 ? (
                        <Link onClick={() => handleDownload("brochureSection")}>
                          {menu.name}
                        </Link>
                      ) : (
                        <Link to={menu.link}>{menu.name}</Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Contact Us */}
            <div className="col col-lg-3 col-md-6 col-12 col-sm-12">
              <div className="widget wpo-contact-widget">
                <div className="widget-title">
                  <h3>Contact Us</h3>
                </div>
                <div className="contact-ft">
                  <ul>
                    <li>
                      <i className="fi flaticon-email"></i>
                      <a
                        href="mailto:info@edprowise.com"
                        style={{ color: "white" }}
                      >
                        info@edprowise.com
                      </a>
                    </li>

                    <li>
                      <i className="fi flaticon-phone-call"></i>
                      <a href="tel:+919958528306" style={{ color: "white" }}>
                        +91-9958528306
                      </a>
                    </li>

                    <li>
                      <i className="fi flaticon-placeholder"></i>
                      <a
                        href="https://g.page/r/CTBN6r3t-9N3EBI/review"
                        style={{ color: "white" }}
                      >
                        New Delhi, Delhi, India.
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Lower Footer */}
      <div className="wpo-lower-footer">
        <div className="container">
          <div className="row align-items-center">
            <div className="col col-lg-6 col-md-12 col-12">
              <ul>
                <li>
                  All Copyright © {new Date().getFullYear()} EdProwise Tech PVT
                  LTD. All Rights Reserved.
                </li>
              </ul>
            </div>
            <div className="col col-lg-6 col-md-12 col-12">
              <div className="link">
                <ul>
                  <li>
                    <Link to="/privacy-policy">Privacy & Policy</Link>
                  </li>
                  <li>
                    <Link to="/terms">Terms & Conditions</Link>
                  </li>
                  {/* <li>
                    <Link to="/about-us">About us</Link>
                  </li>
                  <li>
                    <Link to="/faq">FAQ</Link>
                  </li> */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
