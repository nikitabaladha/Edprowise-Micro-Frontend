import React, { useState } from "react";
import postAPI from "../../../../api/postAPI.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AddNewAdmin = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,

      [name]: value,
    }));
  };

  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("New Password and Confirm Password do not match.");
      return;
    }

    setSending(true);

    try {
      const response = await postAPI(
        "/add-admin",
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        },
        true
      );

      if (!response.hasError) {
        toast.success("Admin added successfully");

        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        navigate(-1);
      } else {
        toast.error(response.message || "Failed to add Admin");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      );
    } finally {
      setSending(false);
    }
  };

  const [showNewPassword, setShowNewPassword] = useState(false);
  const toggleNewPasswordVisibility = () => {
    setShowNewPassword((prev) => !prev);
  };

  const [showConformPassword, setShowConformPassword] = useState(false);
  const toggleConformPasswordVisibility = () => {
    setShowConformPassword((prev) => !prev);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2">
                  <h4 className="card-title text-center custom-heading-font">
                    Add Admin
                  </h4>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="firstName" className="form-label">
                        First Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="form-control"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        placeholder="Example : John"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="lastName" className="form-label">
                        Last Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="form-control"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        placeholder="Example : Doe"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Example : john.doe@example.com"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        New Password <span className="text-danger">*</span>
                      </label>
                      <div style={{ position: "relative" }}>
                        <input
                          type={showNewPassword ? "text" : "password"}
                          className="form-control"
                          required
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          id="password"
                          placeholder="Example : 12@AB#cd"
                        />
                        {showNewPassword ? (
                          <FaEye
                            onClick={toggleNewPasswordVisibility}
                            style={{
                              position: "absolute",
                              right: "10px",
                              top: "50%",
                              transform: "translateY(-50%)",
                              cursor: "pointer",
                            }}
                          />
                        ) : (
                          <FaEyeSlash
                            onClick={toggleNewPasswordVisibility}
                            style={{
                              position: "absolute",
                              right: "10px",
                              top: "50%",
                              transform: "translateY(-50%)",
                              cursor: "pointer",
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        Retype New Password{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <div style={{ position: "relative" }}>
                        <input
                          type={showConformPassword ? "text" : "password"}
                          className="form-control"
                          required
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          id="confirmPassword"
                          placeholder="Example : 12@AB#cd"
                        />
                        {showConformPassword ? (
                          <FaEye
                            onClick={toggleConformPasswordVisibility}
                            style={{
                              position: "absolute",
                              right: "10px",
                              top: "50%",
                              transform: "translateY(-50%)",
                              cursor: "pointer",
                            }}
                          />
                        ) : (
                          <FaEyeSlash
                            onClick={toggleConformPasswordVisibility}
                            style={{
                              position: "absolute",
                              right: "10px",
                              top: "50%",
                              transform: "translateY(-50%)",
                              cursor: "pointer",
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-end">
                  <button
                    type="submit"
                    className="btn btn-primary custom-submit-button"
                    disabled={sending}
                  >
                    {sending ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewAdmin;
