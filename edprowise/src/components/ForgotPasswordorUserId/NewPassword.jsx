import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import pAPI from "../../api/postAPI.jsx";
import putAPI from "../../api/putAPI.jsx";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const NewPassword = (e) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [generalError, setGeneralError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const passedUserId = location?.state?.userId || "";

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setGeneralError("");
  };

  const navigateToHome = (event) => {
    event.preventDefault();
    navigate("/");
  };
  const navigateToSignup = (event) => {
    event.preventDefault();
    navigate("/signup");
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setGeneralError("");

    if (formData.password !== formData.confirmPassword) {
      setGeneralError("Passwords do not match.");
      return;
    }

    if (!passedUserId) {
      setGeneralError("Missing user ID. Please restart the process.");
      return;
    }

    try {
      const response = await putAPI(
        "/reset-password",
        {
          userId: passedUserId,
          newPassword: formData.password,
        },
        false
      );

      if (!response.hasError) {
        toast.success("Password updated successfully.");
        navigate("/login");
      } else {
        setGeneralError(response.data.message);
      }
    } catch (error) {
      const errorMsg =
        error?.response?.data?.message || "Something went wrong.";
      setGeneralError(errorMsg);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <>
      <div className="form-body form-left">
        <div className="iofrm-layout">
          <div className="img-holder text-start">
            <div className="bg" />
            <div className="info-holder">
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/graphic15.svg`}
                alt=""
              />
            </div>
          </div>
          <div
            className="form-holder"
            style={{
              height: "100vh",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="form-content justify-content-end">
              <div className="form-items">
                <div className="website-logoo-inside logo-normal">
                  <Link to="/" className="custom-link">
                    <div>
                      <img
                        className="logos"
                        src="/assets/website-images/EdProwise New Logo-1.png"
                        alt="logo"
                      />
                    </div>
                  </Link>
                </div>
                <h3 className="font-md">Whatever School Need, We Provide</h3>
                <p>We Listen... We Resolve... We Deliver</p>
                <form onSubmit={handlePasswordSubmit}>
                  {/* <p style={{ fontSize: "1rem" }}> Enter the userId associated with your Edprowise account.</p> */}
                  <div
                    style={{
                      position: "relative",
                      display: "inline-block",
                      width: "100%",
                    }}
                  >
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="form-control pe-5"
                      placeholder="Enter New Password"
                    />
                    {showPassword ? (
                      <FaEye
                        onClick={togglePasswordVisibility}
                        style={{
                          position: "absolute",
                          right: "60px",
                          top: "50%",
                          transform: "translateY(-80%)",
                          cursor: "pointer",
                        }}
                      />
                    ) : (
                      <FaEyeSlash
                        onClick={togglePasswordVisibility}
                        style={{
                          position: "absolute",
                          right: "60px",
                          top: "50%",
                          transform: "translateY(-80%)",
                          cursor: "pointer",
                        }}
                      />
                    )}
                  </div>

                  <div
                    style={{
                      position: "relative",
                      display: "inline-block",
                      width: "100%",
                    }}
                  >
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="form-control pe-5"
                      placeholder="Retype New Password"
                    />
                    {showPassword ? (
                      <FaEye
                        onClick={togglePasswordVisibility}
                        style={{
                          position: "absolute",
                          right: "60px",
                          top: "50%",
                          transform: "translateY(-80%)",
                          cursor: "pointer",
                        }}
                      />
                    ) : (
                      <FaEyeSlash
                        onClick={togglePasswordVisibility}
                        style={{
                          position: "absolute",
                          right: "60px",
                          top: "50%",
                          transform: "translateY(-80%)",
                          cursor: "pointer",
                        }}
                      />
                    )}
                  </div>

                  {generalError && (
                    <div className="alert alert-danger mt-3">
                      {generalError}
                    </div>
                  )}
                  <div
                    className="form-button d-flex"
                    style={{
                      width: "80%",
                      justifySelf: "center",
                    }}
                  >
                    <button
                      id="submit"
                      type="submit"
                      className="btn btn-primary"
                      style={{
                        backgroundColor: "#ffc801",
                        borderColor: "#ffc801",
                      }}
                    >
                      Submit
                    </button>
                  </div>
                </form>

                <div className=" mt-2 text-center bottom-margin-forgot">
                  <Link onClick={navigateToSignup}>
                    If you are not Register, Sign Up Here
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewPassword;
