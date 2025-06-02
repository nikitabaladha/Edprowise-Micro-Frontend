import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import postAPI from "../../api/postAPI.jsx";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../../AuthContext.jsx";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [generalError, setGeneralError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setGeneralError("");
  };

  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      const response = await postAPI(
        `${process.env.REACT_APP_USER_AND_PROFILE_SERVICE}/admin-login`,
        formData,
        false
      );

      if (!response.hasError) {
        const { token, userDetails } = response.data;
        login(token, userDetails);
        localStorage.setItem("accessToken", JSON.stringify(token));
        localStorage.setItem("userDetails", JSON.stringify(userDetails));

        console.log("User Status:", userDetails.status);
        console.log("Condition Check:", userDetails.status === "Pending");

        toast.success("Login successful!");

        if (userDetails?.role === "Admin") {
          navigate(
            userDetails.status === "Pending"
              ? "/complete-admin-profile"
              : "/admin-dashboard"
          );
        }
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

  const navigateToHome = (event) => {
    event.preventDefault();
    navigate("/");
  };
  const navigateToSignup = (event) => {
    event.preventDefault();
    navigate("/signup/admin");
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
                  <Link to="" className="custom-link">
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
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="E-mail Address"
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

                  {/* <Link to="/" onClick={navigateToHome}>
                    {" "}
                    Go to Home{" "}
                  </Link> */}
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

export default AdminLogin;
