import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const CareerForm = () => {
  const location = useLocation();
  const { job } = location.state || {};

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    // Simulate API submission
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  if (!job) {
    return (
      <section className="wpo-page-title">
        <div className="container">
          <div className="row">
            <div className="col col-xs-12">
              <div className="wpo-breadcumb-wrap">
                <h2>Career</h2>
                <ol className="wpo-breadcumb-wrap">
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>Career</li>
                </ol>
              </div>
              <p>No job details available. Please try again.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="wpo-page-title">
        <div className="container">
          <div className="row">
            <div className="col col-xs-12">
              <div className="wpo-breadcumb-wrap">
                <h2>Career</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="shape-1">
          <img src="assets/images/shape/1.svg" alt="" />
        </div>
        <div className="shape-2">
          <img src="assets/images/shape/2.svg" alt="" />
        </div>
        <div className="shape-3">
          <img src="assets/images/shape/3.svg" alt="" />
        </div>
        <div className="shape-4">
          <img src="assets/images/shape/4.svg" alt="" />
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
                        src="/assets/website-images/teacher.webp"
                        alt="Teacher"
                      />
                    </div>
                  </div>
                </div>
                <div className="teacher-contact">
                  <div className="teacher-contact-form">
                    <h2>Apply for the Job</h2>
                    <form
                      onSubmit={handleSubmit}
                      id="contact-form-main"
                      className="contact-validation-active"
                    >
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-12 form-group">
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            id="name"
                            placeholder="Name"
                            required
                          />
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-12 form-group">
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            id="email"
                            placeholder="Email"
                            required
                          />
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-12 form-group">
                          <input
                            type="number"
                            className="form-control"
                            name="contact"
                            id="contact"
                            placeholder="Contact No"
                            required
                          />
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-12 form-group">
                          <input
                            type="text"
                            className="form-control"
                            name="designation"
                            id="designation"
                            value={job.title}
                            placeholder="Designation"
                            required
                          />
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-12 form-group">
                          <input
                            type="text"
                            className="form-control"
                            name="qualification"
                            id="qualification"
                            placeholder="Qualification"
                            required
                          />
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-12 form-group">
                          <label htmlFor="file">Upload Your CV</label>
                          <input
                            type="file"
                            className="form-control"
                            name="file"
                            id="file"
                            accept=".pdf, .doc, .docx"
                            required
                          />
                        </div>
                        <div className="col-lg-12 col-12 form-group">
                          <textarea
                            className="form-control"
                            name="skills"
                            id="skills"
                            placeholder="Skills"
                            required
                          ></textarea>
                        </div>
                        <div className="col-lg-12 col-12 form-group">
                          <textarea
                            className="form-control"
                            name="note"
                            id="note"
                            placeholder="Your Message..."
                            required
                          ></textarea>
                        </div>
                        <div className="submit-area col-lg-12 col-12">
                          <button
                            type="submit"
                            className="theme-btn submit-btn"
                            disabled={loading}
                          >
                            {loading ? "Submitting..." : "Submit"}
                          </button>
                        </div>
                      </div>
                      <div className="clearfix error-handling-messages">
                        {success && (
                          <div id="success">Thank you for applying!</div>
                        )}
                        {error && <div id="error">{error}</div>}
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

export default CareerForm;
