import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import postAPI from "../../api/postAPI.jsx";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    conformPassword: "",
  });

  const [generalError, setGeneralError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setGeneralError("");
  };

  const handleLoginRedirect = () => {
    navigate("/login/admin");
  };

  const [sending, setSending] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.conformPassword) {
      toast.error("Password and Confirm Password do not match.");
      return;
    }

    setSending(true);

    try {
      const response = await postAPI(
        `${process.env.REACT_APP_USER_AND_PROFILE_SERVICE}/admin-signup`,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        },
        false
      );

      if (!response.hasError) {
        toast.success("Signup successful!");

        setTimeout(() => {
          handleLoginRedirect();
        }, 2000);

        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          conformPassword: "",
        });
      } else {
        setGeneralError(response.message || "Signup failed.");
      }
    } catch (error) {
      setGeneralError(
        error?.response?.data?.message ||
          "An unexpected signup error occurred. Please try again."
      );
    } finally {
      setSending(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const [showConformPassword, setShowConformPassword] = useState(false);
  const toggleConformPasswordVisibility = () => {
    setShowConformPassword((prev) => !prev);
  };

  const navigateToHomes = (event) => {
    event.preventDefault();
    navigate("/");
  };

  const navigateToLogin = (event) => {
    event.preventDefault();
    navigate("/login/admin");
  };

  return (
    <>
      <div className="form-body form-left">
        <div className="iofrm-layout">
          <div className="img-holder text-start">
            <div className="bg" />
            <div className="info-holder">
              <img src={`/assets/images/graphic15.svg`} alt="" />
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
                <form onSubmit={handleSignup}>
                  <input
                    className="form-control"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    required=""
                  />
                  <input
                    className="form-control"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    required=""
                  />
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-control"
                    id="email"
                    placeholder="Enter email address"
                    onKeyDown={(e) => {
                      if (e.key === " ") {
                        e.preventDefault();
                      }
                    }}
                  />
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
                      placeholder="Enter password"
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
                      type={showConformPassword ? "text" : "password"}
                      name="conformPassword"
                      value={formData.conformPassword}
                      onChange={handleChange}
                      required
                      className="form-control pe-5"
                      placeholder="Confirm password"
                    />
                    {showConformPassword ? (
                      <FaEye
                        onClick={toggleConformPasswordVisibility}
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
                        onClick={toggleConformPasswordVisibility}
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
                      type="submit"
                      className="btn btn-primary"
                      disabled={sending}
                      style={{
                        backgroundColor: "#ffc801",
                        borderColor: "#ffc801",
                      }}
                    >
                      {sending ? "Processing..." : "Sign Up"}
                    </button>
                  </div>
                  {/* <Link to="/" onClick={navigateToHomes}>
                    Go to Home
                  </Link> */}
                  <div className=" mt-2 text-center">
                    <Link onClick={navigateToLogin}>
                      If Already Registered, Sign In Here
                    </Link>
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

export default Signup;
