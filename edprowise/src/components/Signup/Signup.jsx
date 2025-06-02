import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import postAPI from "../../api/postAPI.jsx";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    conformPassword: "",
    role: "",
  });

  const navigateToHomes = (event) => {
    event.preventDefault();
    navigate("/");
  };

  const navigateToLogin = (event) => {
    event.preventDefault();
    navigate("/login");
  };

  const [generalError, setGeneralError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setGeneralError("");
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
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
        "/user-signup",
        {
          userId: formData.userId,
          password: formData.password,
          role: formData.role,
        },
        false
      );

      if (!response.hasError) {
        toast.success("Signup successful!");

        setTimeout(() => {
          handleLoginRedirect();
        }, 2000);

        setFormData({
          userId: "",
          password: "",
          role: "",
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

  const [showConformPassword, setShowConformPassword] = useState(false);
  const toggleConformPasswordVisibility = () => {
    setShowConformPassword((prev) => !prev);
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
                    name="userId"
                    value={formData.userId}
                    onChange={handleChange}
                    placeholder="User ID"
                    required=""
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
                      placeholder="Enter Password"
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
                      placeholder="Confirm Password"
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

                  <div
                    style={{
                      position: "relative",
                      display: "inline-block",
                      width: "80%",
                    }}
                  >
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      required=""
                      className="form-control pe-5"
                      style={{
                        border: "none",
                        backgroundColor: "#F7F7F7",
                        color: formData.role === "" ? "#534650" : "#000",
                      }}
                    >
                      <option value="">Select Role</option>
                      <option value="School">School</option>
                      <option value="Seller">Seller</option>
                    </select>
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
