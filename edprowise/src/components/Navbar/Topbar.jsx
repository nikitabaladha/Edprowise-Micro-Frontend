import React from "react";

const Topbar = () => {
  return (
    <div className="topbar-web">
      <h2 className="hidden">some</h2>
      <div className="container-fluid">
        <div className="row">
          {/* Left Section */}
          <div className="col col-lg-8 col-md-12 col-12">
            <div className="contact-intro">
              <ul>
                <li>
                  <i className="fi flaticon-phone-call"></i>
                  <a className="contact-info-text" href="tel:+919958528306">
                    +91-9958528306
                  </a>
                </li>
                <li>
                  <i className="fi flaticon-email"></i>
                  <a
                    className="contact-info-text"
                    href="mailto:info@edprowise.com"
                  >
                    info@edprowise.com
                  </a>
                </li>
                <li className="contact-location">
                  <i className="fi flaticon-maps-and-flags"></i>
                  <a
                    className="contact-info-text"
                    href="https://g.page/r/CTBN6r3t-9N3EBI/review"
                  >
                    New Delhi, Delhi, India.
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Section */}
          <div className="col col-lg-4 col-md-12 col-12">
            <div className="contact-info">
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
      </div>
    </div>
  );
};

export default Topbar;
