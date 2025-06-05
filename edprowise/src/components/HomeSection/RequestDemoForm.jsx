import React, { useState } from "react";
import RequestDemoSteps from "./RequestDemoSteps.jsx";
import { ToastContainer, toast } from "react-toastify";
import postAPI from "../../api/postAPI.jsx";

const coursesData = [
  { id: 1, title: "School Fees Management Software - Pixel Fees" },
  { id: 2, title: "Payroll Management Software – Ease Payroll" },
  { id: 3, title: "Financial Management Software – Book Sync" },
  { id: 4, title: "School Operational Management Software" },
  { id: 5, title: "School Mobile Application" },
  { id: 6, title: "School Website Design" },
  { id: 7, title: "Digital Exam Result System" },
  { id: 8, title: "Digital Student Attendance" },
  { id: 9, title: "Digital Staff Attendance" },
  { id: 10, title: "Library Management Software" },
  { id: 11, title: "Entrance Management Software" },
  { id: 12, title: "Online Payment Gateway" },
  { id: 13, title: "SMS & WhatsApp Integration Services" },
];

const RequestDemoForm = () => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setSelectedServices((prev) =>
      checked ? [...prev, value] : prev.filter((service) => service !== value)
    );
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const resetForm = (form) => {
    form.reset();
    setSelectedServices([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      schoolName: formData.get("schoolname"),
      designation: formData.get("designation"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      demoDateTime: formData.get("demoDateTime"),
      selectedServices: selectedServices,
      note: formData.get("note"),
    };

    try {
      const response = await postAPI(
        `${process.env.REACT_APP_ENQUIRY_SERVICE}/request-demo`,
        data,
        {
          "Content-Type": "application/json",
        },
        true
      );

      if (!response.hasError) {
        toast.success("Thank you! We will touch with you shortly.");
        resetForm(e.target);
      } else {
        toast.error("A demo request with this email already exists.");
      }
    } catch (error) {
      toast.error(
        "Error occurred while sending request. Please try again later."
      );
    }
  };

  return (
    <>
      <section className="wpo-page-title">
        <div className="container">
          <div className="row">
            <div className="col col-xs-12">
              <div className="wpo-breadcumb-wrap">
                <h2>Request For Demo</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <RequestDemoSteps />
      <section className="wpo-contact-pg-section section-padding">
        <div className="container">
          <div className="row">
            <div className="col col-lg-10 offset-lg-1">
              <div className="wpo-contact-title">
                <h2>
                  Experience the future of school solutions - Request a Demo
                  Today!
                </h2>
                <p className="text-black">
                  Fill out the form below, and our team will get in touch with
                  you shortly!
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
                      placeholder="Enter Your Full Name*"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      name="schoolname"
                      placeholder="Enter School Name*"
                      required
                    />
                  </div>
                  <div>
                    <select
                      name="designation"
                      className="form-control"
                      required
                    >
                      <option disabled selected>
                        Choose Designation*
                      </option>
                      <option>Principal</option>
                      <option>Administrator</option>
                      <option>HR</option>
                      <option>Teacher</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Email id*"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      placeholder="Contact No*"
                      required
                    />
                  </div>
                  <div className="fullwidth">
                    <label className="text-black">
                      Preferred Demo Date & Time*
                    </label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      name="demoDateTime"
                      required
                    />
                  </div>

                  {/* <div className="fullwidth">
                    <label className="text-black">Select Services*</label>
                    <div
                      className="custom-multi-select"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      onMouseLeave={() => setIsDropdownOpen(false)}
                  
                    >
                      <div className="dropdown-header-web">
                        {selectedServices.length > 0
                          ? `${selectedServices.length} services selected`
                          : "Select services"}
                        <span className="arrow">
                          {isDropdownOpen ? "▲" : "▼"}
                        </span>
                      </div>
                      {isDropdownOpen && (
                        <div className="dropdown-options">
                          {coursesData.map((service) => (
                            <label
                              key={service.id}
                              className="dropdown-option text-black"
                            >
                              <input
                                type="checkbox"
                                className="check-box-demo"
                                value={service.title}
                                checked={selectedServices.includes(
                                  service.title
                                )}
                                onChange={handleCheckboxChange}
                              />
                              {service.title}
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  {selectedServices.length >= 1 && (
                    <div className="fullwidth mt-4">
                      <h4>Selected Services:</h4>
                      <ul>
                        {selectedServices.map((service, index) => (
                          <li key={index} style={{ color: "#4e545c" }}>{service}</li>
                        ))}
                      </ul>
                    </div>
                  )} */}

                  <div className="fullwidth">
                    <label className="text-black">Select Services*</label>
                    <div
                      className="custom-multi-select"
                      onMouseLeave={() => setIsDropdownOpen(false)} // <- move here
                    >
                      <div
                        className="dropdown-header-web"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      >
                        {selectedServices.length > 0
                          ? `${selectedServices.length} services selected`
                          : "Select services"}
                        <span className="arrow">
                          {isDropdownOpen ? "▲" : "▼"}
                        </span>
                      </div>

                      {isDropdownOpen && (
                        <div className="dropdown-options">
                          {coursesData.map((service) => (
                            <label
                              key={service.id}
                              className="dropdown-option text-black"
                            >
                              <input
                                type="checkbox"
                                className="check-box-demo"
                                value={service.title}
                                checked={selectedServices.includes(
                                  service.title
                                )}
                                onChange={handleCheckboxChange}
                              />
                              {service.title}
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  {selectedServices.length >= 1 && (
                    <div className="fullwidth mt-4">
                      <h4>Selected Services:</h4>
                      <ul>
                        {selectedServices.map((service, index) => (
                          <li key={index} style={{ color: "#4e545c" }}>
                            {service}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="fullwidth">
                    <textarea
                      className="form-control"
                      name="note"
                      placeholder="Additional requirements or questions..."
                    ></textarea>
                  </div>
                  <div className="submit-area">
                    <button type="submit" className="theme-btn">
                      Get in Touch
                    </button>
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

export default RequestDemoForm;
