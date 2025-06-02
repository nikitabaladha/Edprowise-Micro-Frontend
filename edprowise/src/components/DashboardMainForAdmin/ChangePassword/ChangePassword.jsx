import React, { useState } from "react";
import putAPI from "../../../api/putAPI.jsx";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const { state } = useLocation();
  const adminProfile = state?.adminProfile;

  const navigate = useNavigate();

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const userId = userDetails?.email;

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New Password and Confirm Password do not match.");
      return;
    }

    setSending(true);

    try {
      const payload = {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      };

      const response = await putAPI(
        "/change-edprowise-admin-password",
        payload,
        true
      );

      if (!response.hasError) {
        toast.success("Password changed successfully.");
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        navigate("/admin-dashboard");
      } else {
        toast.error("Failed to update Password.");
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

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword((prev) => !prev);
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
    <>
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="card m-2">
              <div className="card-body custom-heading-padding">
                <div className="container">
                  <div className="card-header mb-2">
                    <h4 className="card-title custom-heading-font">
                      Change Your Password
                    </h4>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <div className="d-flex align-items-center">
                        <div className="rounded bg-light d-flex align-items-center justify-content-center">
                          <img
                            src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${adminProfile?.edprowiseProfile}`}
                            alt={`${adminProfile?.companyName} Profile`}
                            className="avatar-md"
                            style={{
                              objectFit: "cover",
                              width: "100px",
                              height: "100px",
                              borderRadius: "10px",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="schoolName" className="form-label">
                        Company Name
                      </label>
                      <p className="form-control">
                        {adminProfile?.companyName}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="userId" className="form-label">
                        User ID
                      </label>
                      <p className="form-control">{userId}</p>
                    </div>
                  </div>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                          Current Password
                        </label>
                        <div style={{ position: "relative" }}>
                          <input
                            type={showCurrentPassword ? "text" : "password"}
                            className="form-control"
                            required
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            id="currentPassword"
                            placeholder="Example : dc#BA@21"
                          />
                          {showCurrentPassword ? (
                            <FaEye
                              onClick={toggleCurrentPasswordVisibility}
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
                              onClick={toggleCurrentPasswordVisibility}
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
                          New Password
                        </label>
                        <div style={{ position: "relative" }}>
                          <input
                            type={showNewPassword ? "text" : "password"}
                            className="form-control"
                            required
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            id="newPassword"
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
                          Retype New Password
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
                      {sending ? "Submitting..." : "Submit New Password"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
