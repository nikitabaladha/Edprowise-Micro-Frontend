import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import GeneralFaq from "./GeneralFaq.jsx";
import postAPI from "../../api/postAPI.jsx";

const FaqContactUsComponent = () => {
  // contact
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    query: "",
    phone: "",
    service: "",
    note: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Validate form data
    if (
      !formData.name ||
      !formData.email ||
      !formData.query ||
      !formData.phone ||
      !formData.service
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Phone number must be exactly 10 digits.");
      return;
    }
    // Send the form data to the backend API
    try {
      const response = await postAPI(
        "/contactus",
        formData,
        {
          "Content-Type": "application/json",
        },
        true
      );

      if (!response.hasError) {
        toast.success("Thank you! Your message has been sent.");
        setFormData({
          name: "",
          email: "",
          query: "",
          phone: "",
          service: "",
          note: "",
        });
      } else {
        toast.error(
          response.message ||
            "Error occurred while sending message. Please try again later."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        "Error occurred while sending message. Please try again later."
      );
    }
  };

  const serviceOptions = [
    "General Inquiry",
    "Pricing Information",
    "Complaint or Service Issue",
    "Feedback or Suggestions",
    "Billing & Payment Query",
    "Investor Relations",
    "Vendor Registration / Partnership",
    "Customized Services Request",
    "Fees Management Software",
    "Payroll Management Assistance",
    "Financial Management Software Support",
    "School Operational Management Software",
    "School Admission Management Solutions",
    "Digital Exam Result System",
    "Library Management System Inquiry",
    "Entrance Exam Management Inquiry",
    "SMS/WhatsApp Communication Services",
    "Online Payment Integration Support",
    "School App Services",
    "Website Design Services",
    "PF & ESI Consultancy Services",
    "Tour Management Services",
    "Affiliation Support",
    "Procurement Services Inquiry",
    "Recruitment Services for Schools",
    "Technical Support / Issue",
  ];

  return (
    <>
      {/* <ToastContainer position="top-right"/> */}
      {/* <section className="wpo-courses-section-s2 section-padding section-background-box-shadow pt-2 pb-1">
        <div className="container edprowise-choose-container">
          <div className="row-web">
            <div className="col-12">
              <div className="wpo-section-title-s2 mb-1">
                <h2 className="font-family-web">Let Me Know Your Concern</h2>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-md-12 col-lg-6 p-0">
              <div className="wpo-blog-items">
                <div id="GeneralFaqSection">
                  <GeneralFaq />
                </div>
              </div>
            </div>

            <div className="col-12 col-md-12 col-lg-6">
              <section className="wpo-contact-pg-section section-padding pt-0">
                <div className="container">
                  <div className="row">
                    <div className="col col-lg-12  ">
                      <div className="wpo-contact-title">
                        <h2 className="home-contact-header">
                          Have Any Question?
                        </h2>
                        <p>
                          Want to get in touch? We'd love to hear from you.
                          Here's how you can reach us..
                        </p>
                      </div>
                      <div className="wpo-contact-form-area">
                        <form
                          method="post"
                          className="contact-validation-active"
                          id="contact-form-main"
                          onSubmit={handleSubmit}
                        >
                          <div>
                            <input
                              type="text"
                              className="form-control"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="Your Name*"
                              required
                            />
                          </div>
                          <div>
                            <input
                              type="email"
                              className="form-control"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="Your Email*"
                              required
                            />
                          </div>
                          <div className="fullwidth">
                            <input
                              type="text"
                              className="form-control"
                              name="query"
                              value={formData.query}
                              onChange={handleChange}
                              placeholder="Your query*"
                              required
                            />
                          </div>
                          <div>
                            <input
                              type="text"
                              className="form-control"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="Your Phone*"
                              required
                            />
                          </div>
                          <div>
                            <select
                              name="service"
                              className="form-control"
                              value={formData.service}
                              onChange={handleChange}
                              required
                            >
                              <option value="">Subject*</option>
                              {serviceOptions.map((option, index) => (
                                <option
                                  key={index}
                                  value={option
                                    .replace(/\s+/g, "-")
                                    .toLowerCase()}
                                >
                                  {option}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="fullwidth">
                            <textarea
                              className="form-control"
                              name="note"
                              value={formData.note}
                              onChange={handleChange}
                              placeholder="Message..."
                            ></textarea>
                          </div>
                          <div className="submit-area">
                            <button type="submit" className="theme-btn">
                              Get in Touch
                            </button>
                            <div id="loader">
                              <i className="ti-reload"></i>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section> */}
      <>Hello</>
    </>
  );
};

export default FaqContactUsComponent;
