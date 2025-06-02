import React, { useState } from "react";
// import { toast } from "react-toastify"; // Import toastify
import { toast } from "react-toastify";
import postAPI from "../../api/postAPI.jsx";
import Select from "react-select";

const ConstactusMainSection = () => {
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
      <section className="wpo-contact-pg-section section-padding">
        <div className="container">
          <div className="row">
            <div className="col col-lg-10 offset-lg-1">
              <div className="office-info">
                <div className="row">
                  <div className="col col-xl-4 col-lg-6 col-md-6 col-12">
                    <div className="office-info-item">
                      <div className="office-info-icon">
                        <div className="icon">
                          <i className="fi flaticon-maps-and-flags text-black"></i>
                        </div>
                      </div>
                      <div className="office-info-text">
                        <h2>Address</h2>
                        <p className="text-black">New Delhi, Delhi, India</p>
                      </div>
                    </div>
                  </div>
                  <div className="col col-xl-4 col-lg-6 col-md-6 col-12">
                    <div className="office-info-item">
                      <div className="office-info-icon">
                        <div className="icon">
                          <i className="fi flaticon-email text-black"></i>
                        </div>
                      </div>
                      <div className="office-info-text">
                        <h2>Email Us</h2>
                        <p className="text-black">info@edprowise.com</p>
                      </div>
                    </div>
                  </div>
                  <div className="col col-xl-4 col-lg-6 col-md-6 col-12">
                    <div className="office-info-item">
                      <div className="office-info-icon">
                        <div className="icon">
                          <i className="fi flaticon-phone-call text-black"></i>
                        </div>
                      </div>
                      <div className="office-info-text">
                        <h2>Call Now</h2>
                        <p className="text-black">+91-9958528306</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="wpo-contact-title">
                <h2>Have Any Question?</h2>
                <p>
                  Want to get in touch? We'd love to hear from you. Here's how
                  you can reach us..
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
                      placeholder="Query*"
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
                          value={option.replace(/\s+/g, "-").toLowerCase()}
                        >
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="fullwidth">
                    <textarea
                      className="form-control"
                      style={{ border: "1px soild black !important" }}
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
    </>
  );
};

export default ConstactusMainSection;
