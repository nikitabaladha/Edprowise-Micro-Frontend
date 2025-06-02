import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import postAPI from "../../api/postAPI.jsx";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../../AuthContext.jsx";

const UserLogin = () => {
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
  });

  const [generalError, setGeneralError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

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

  const navigateToForgotPassword = (event) => {
    event.preventDefault();

    navigate("/forgot-password");
  };

  const navigateToSignup = (event) => {
    event.preventDefault();
    navigate("/signup");
  };

  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSending(true);

    try {
      const response = await postAPI("/user-login", formData, false);

      if (!response.hasError) {
        const { token, userDetails } = response.data;

        login(token, userDetails);

        localStorage.setItem("accessToken", JSON.stringify(token));
        localStorage.setItem("userDetails", JSON.stringify(userDetails));

        toast.success("Login successful!");

        setTimeout(() => {
          if (userDetails && userDetails.role === "School") {
            if (userDetails.status === "Pending") {
              return navigate(`/complete-school-profile`);
            } else if (userDetails.status === "Completed") {
              return navigate("/school/go-to-dashboard");
            }
          } else if (userDetails.role === "Auditor") {
            return navigate(
              "/auditor-dashboard/procurement-services/dashboard"
            );
          } else if (userDetails.role === "User") {
            return navigate("/user-dashboard/procurement-services/dashboard");
          } else if (userDetails && userDetails.role === "Seller") {
            if (userDetails.status === "Pending") {
              return navigate(`/complete-seller-profile`);
            } else if (userDetails.status === "Completed") {
              return navigate(
                "/seller-dashboard/procurement-services/dashboard"
              );
            }
          } else {
            toast.error("No dashboard available for your role!");
          }
        }, 2000);
      } else {
        setGeneralError(response.data.message);
      }
    } catch (error) {
      setGeneralError(
        error?.response?.data?.message ||
          "An unexpected login error occurred. Please try again."
      );
    } finally {
      setSending(false);
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
              <img src="/assets/images/graphic15.svg" alt="" />
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
                <form onSubmit={handleSubmit}>
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
                      {sending ? "Processing..." : "Login"}
                    </button>
                  </div>
                  <div className=" text-center">
                    <Link onClick={navigateToForgotPassword}>
                      Forgot Password?{"  "}
                    </Link>
                  </div>
                  {/* <div className=" mt-3 text-center">
                    <Link to="/" onClick={navigateToHome}>
                      {"  "}
                      Go to Home{" "}
                    </Link>
                  </div> */}
                  <div className=" mt-2 text-center">
                    <Link onClick={navigateToSignup}>
                      If you are not Register, Sign Up Here
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

export default UserLogin;
