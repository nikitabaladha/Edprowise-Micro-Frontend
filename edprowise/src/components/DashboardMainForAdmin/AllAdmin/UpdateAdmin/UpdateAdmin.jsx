import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import putAPI from "../../../../api/putAPI.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const UpdateAdmin = () => {
  const location = useLocation();
  const admin = location.state?.admin;
  const adminId = admin?._id;

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (admin) {
      setFormData({
        firstName: admin.firstName || "",
        lastName: admin.lastName || "",
        email: admin.email || "",
        password: "",
      });
    }
  }, [admin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [sending, setSending] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (formData.password && formData.confirmPassword) {
      if (formData.password !== formData.confirmPassword) {
        toast.error("New Password and Confirm Password do not match.");
        return;
      }
    }

    const formDataToSend = new FormData();
    for (const key in formData) {
      if (formData[key] instanceof File) {
        formDataToSend.append(key, formData[key]);
      } else {
        formDataToSend.append(key, formData[key] || "");
      }
    }

    setSending(true);

    try {
      const response = await putAPI(
        `${process.env.REACT_APP_USER_AND_PROFILE_SERVICE}/update-admin/${adminId}`,
        formDataToSend,
        true
      );

      if (!response.data.hasError) {
        toast.success("Admin updated successfully!");

        navigate(-1);
      } else {
        toast.error(response.data.message || "Failed to update Admin.");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
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
                    Update Admin
                  </h4>
                </div>
              </div>
              <form onSubmit={handleUpdate}>
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
                          // required
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          id="password"
                          placeholder="********"
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
                          // required
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          id="confirmPassword"
                          placeholder="********"
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
                    {sending ? "Updating..." : "Update"}
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

export default UpdateAdmin;
