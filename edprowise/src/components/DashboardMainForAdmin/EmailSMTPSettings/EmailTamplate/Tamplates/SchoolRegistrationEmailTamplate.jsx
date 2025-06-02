import React, { useState, useEffect } from "react";
import getAPI from "../../../../../api/getAPI.jsx";
import postAPI from "../../../../../api/postAPI.jsx";
import { toast } from "react-toastify";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const SchoolRegistrationEmailTemplate = () => {
  const [formData, setFormData] = useState({
    mailFrom: "",
    subject: "School Registration Successful", // Default subject
    content: "",
  });

  // ReactQuill configuration for email-friendly editing
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }], // Only allow h1 and h2
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false, // Force plain text for better email compatibility
    },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
  ];

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle content change for ReactQuill
  const handleContentChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      content: value,
    }));
  };

  // Fetch mailFrom & email template on component load
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await getAPI("/get-smtp-email-settings", {}, true);
        if (!response.hasError) {
          setFormData((prevData) => ({
            ...prevData,
            mailFrom: response.data.data.mailFromName || "",
          }));
        }
      } catch (err) {
        toast.error("Error fetching email settings: " + err.message);
      }
    };

    const fetchEmailTemplate = async () => {
      try {
        const response = await getAPI("/get-signup-templates", {}, true);
        if (!response.hasError) {
          setFormData((prevData) => ({
            ...prevData,
            content: response.data.data.content || "",
          }));
        }
      } catch (err) {
        toast.error("Error fetching email template: " + err.message);
      }
    };

    fetchSettings();
    fetchEmailTemplate();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await postAPI("/post-signup-templates", formData, true);
      if (!response.hasError) {
        toast.success("Email template saved successfully!");
      } else {
        toast.error("Failed to save email template.");
      }
    } catch (err) {
      toast.error("Error saving email template: " + err.message);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          {/* Left Card - Email Details */}
          <div className="col-xl-5">
            <div className="card m-2">
              <div className="card-body custom-heading-padding">
                <div className="container">
                  <div className="card-header mb-2">
                    <h4 className="card-title text-center custom-heading-font">
                      Email Details
                    </h4>
                  </div>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                          defaultValue="School Registration Successful"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label htmlFor="mailFrom" className="form-label">
                          From
                        </label>
                        <input
                          type="text"
                          id="mailFrom"
                          name="mailFrom"
                          className="form-control"
                          value={formData.mailFrom}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button
                      type="submit"
                      className="btn btn-primary custom-submit-button"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Right Card - Variables */}
          <div className="col-xl-7">
            <div className="card m-2">
              <div className="card-body custom-heading-padding">
                <div className="container">
                  <div className="card-header mb-2">
                    <h4 className="card-title text-center custom-heading-font">
                      Variables
                    </h4>
                  </div>
                </div>
                <div className="row">
                  <p className="col-6">
                    Company Name:{" "}
                    <span className="text-primary">{`{mailForm}`}</span>
                  </p>
                  <p className="col-6">
                    UserName:{" "}
                    <span className="text-primary">{`{userName}`}</span>
                  </p>
                  <p className="col-6">
                    Email: <span className="text-primary">{`{email}`}</span>
                  </p>
                  <p className="col-6">
                    Password:{" "}
                    <span className="text-primary">{`{password}`}</span>
                  </p>
                  <p className="col-6">
                    Role: <span className="text-primary">{`{role}`}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Email Content */}
        <div className="row">
          <div className="col-xl-12">
            <div className="card m-2">
              <div className="card-body custom-heading-padding">
                <div className="container">
                  <div className="card-header mb-2">
                    <h4 className="card-title text-center custom-heading-font">
                      Email
                    </h4>
                  </div>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label htmlFor="subject" className="form-label">
                          Subject
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          className="form-control"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label htmlFor="emailMessage" className="form-label">
                          Email Message
                        </label>
                        <ReactQuill
                          theme="snow"
                          value={formData.content}
                          onChange={handleContentChange}
                          modules={modules}
                          formats={formats}
                          placeholder="Write your email template here..."
                        />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button
                      type="submit"
                      className="btn btn-primary custom-submit-button"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolRegistrationEmailTemplate;
