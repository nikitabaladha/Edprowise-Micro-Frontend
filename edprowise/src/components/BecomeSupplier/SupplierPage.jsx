import react, { useState } from "react";

const SupplierPage = () => {
  return (
    <>
      <section className="wpo-page-title">
        <div className="container">
          <div className="row">
            <div className="col col-xs-12">
              <div className="wpo-breadcumb-wrap">
                <h2>Become A Supplier</h2>
                <ol className="wpo-breadcumb-wrap">
                  <li>
                    <a>Home</a>
                  </li>
                  <li>Become A Supplier</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="shape-1">
          <img src="assets/website-images/shape/1.svg" alt="" />
        </div>
        <div className="shape-2">
          <img src="assets/website-images/shape/2.svg" alt="" />
        </div>
        <div className="shape-3">
          <img src="assets/website-images/shape/3.svg" alt="" />
        </div>
        <div className="shape-4">
          <img src="assets/website-images/shape/4.svg" alt="" />
        </div>
      </section>
      <div className="teacher-area pb-0">
        <div className="teacher-wrap">
          <div className="container">
            <div className="row-web justify-content-center">
              <div className="col-lg-10">
                <div className="teacher-item">
                  <div className="teacher-img-wrap">
                    <div className="volunter-img">
                      <img
                        src="assets/website-images/teacher.webp"
                        alt="Teacher"
                      />
                    </div>
                  </div>
                </div>
                <div className="teacher-contact">
                  <div className="teacher-contact-form">
                    <h2>Become a Supplier</h2>
                    <form
                      className="contact-validation-active"
                      id="contact-form-main"
                    >
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-12 form-group">
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            id="name"
                            placeholder="Name"
                          />
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-12 form-group clearfix">
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            id="email"
                            placeholder="Email"
                          />
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-12 form-group">
                          <input
                            type="number"
                            className="form-control"
                            name="contact"
                            id="contact"
                            placeholder="Contact NO"
                          />
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-12 form-group">
                          <input
                            type="text"
                            className="form-control"
                            name="Qualification"
                            id="Qualification"
                            placeholder="Qualification"
                          />
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-12 form-group form-group-in">
                          <label htmlFor="file">Upload Your CV</label>
                          <input
                            id="file"
                            type="file"
                            className="form-control"
                            name="file"
                          />
                          <i className="ti-cloud-up"></i>
                        </div>
                        <div className="col-lg-12 col-12 form-group">
                          <textarea
                            className="form-control"
                            name="address"
                            id="address"
                            placeholder="Address"
                          ></textarea>
                        </div>
                        <div className="col-lg-12 col-12 form-group">
                          <textarea
                            className="form-control"
                            name="note"
                            id="note"
                            placeholder="Your Message..."
                          ></textarea>
                        </div>
                        <div className="submit-area col-lg-12 col-12">
                          <button
                            type="submit"
                            className="theme-btn submit-btn"
                          >
                            Submit
                          </button>
                          <div id="loader">
                            <i className="ti-reload"></i>
                          </div>
                        </div>
                      </div>
                      <div className="clearfix error-handling-messages">
                        <div id="success">Thank you</div>
                        <div id="error">
                          Error occurred while sending email. Please try again
                          later.
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SupplierPage;
