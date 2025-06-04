import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import postAPI from "../../api/postAPI.jsx";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ForgotUserId = (e) => {
  const [formData, setFormData] = useState({ email: "", verificationCode: "" });
  const [step, setStep] = useState(1);
  const [generalError, setGeneralError] = useState("");
  const [userid, setUserId] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const navigate = useNavigate();

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

  const handleSubmitUserId = async (e) => {
    e.preventDefault();
    try {
      const response = await postAPI(
        `${process.env.REACT_APP_EMAIL_SERVICE}/send-verification-code-onemail`,
        { email: formData.email },
        false
      );
      console.log("responce: ", response);

      if (!response.hasError) {
        toast.success(" Verification code sent on Register Email.");
        const userId = response?.data?.userId;
        setUserId(userId);
        console.log(userId);
        setStep(2);
        setTimeLeft(60);
        setCanResend(false);
      } else {
        setGeneralError(response.data.message);
      }
    } catch (error) {
      setGeneralError("An error occurred. Please try again.");
    }
  };

  const handleSubmitCode = async (e) => {
    e.preventDefault();
    try {
      const response = await postAPI(
        `${process.env.REACT_APP_EMAIL_SERVICE}/verify-code`,
        {
          userId: userid,
          verificationCode: formData.verificationCode,
        },
        false
      );

      if (!response.hasError) {
        toast.success("Verification successful! .");
        navigate("/forgot-userId/new-userId", { state: { userId: userid } });
      } else {
        toast.error(response.data.message);
        setGeneralError(response.data.message);
      }
    } catch (error) {
      const errorMsg =
        error?.response?.data?.message || "Invalid code. Please try again.";
      toast.error(errorMsg);
      setGeneralError(errorMsg);
      // setGeneralError("Invalid code. Please try again.");
    }
  };

  const handleResendCode = async () => {
    try {
      const response = await postAPI(
        `${process.env.REACT_APP_EMAIL_SERVICE}/send-verification-code`,
        { userId: userid },
        false
      );
      if (!response.hasError) {
        toast.success("Verification code resent successfully.");
        const userId = response?.data?.userId;
        setUserId(userId);
        setTimeLeft(60);
        setCanResend(false);
      } else {
        setGeneralError(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to resend the code. Please try again.");
    }
  };

  useEffect(() => {
    let timer;
    if (step === 2 && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (step === 2 && timeLeft === 0) {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [timeLeft, step]);

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
                {step === 1 && (
                  <form onSubmit={handleSubmitUserId}>
                    <p style={{ fontSize: "1rem" }}>
                      {" "}
                      Enter the email which associated with your Edprowise
                      account.
                    </p>
                    <input
                      className="form-control"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter Email"
                      required=""
                      onKeyDown={(e) => {
                        if (e.key === " ") {
                          e.preventDefault();
                        }
                      }}
                    />

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
                )}

                {step === 2 && (
                  <form onSubmit={handleSubmitCode}>
                    <p style={{ fontSize: "1rem" }}>
                      {" "}
                      Your verification code send on {formData.email}.
                    </p>
                    <input
                      className="form-control"
                      type="text"
                      name="verificationCode"
                      value={formData.verificationCode}
                      onChange={handleChange}
                      placeholder="Verification code"
                      required=""
                      onKeyDown={(e) => {
                        if (e.key === " ") {
                          e.preventDefault();
                        }
                      }}
                    />

                    {generalError && (
                      <div className="alert alert-danger mt-3">
                        {generalError}
                      </div>
                    )}

                    {!canResend ? (
                      <p style={{ fontSize: "1rem" }}>
                        Verification code valid for{" "}
                        <strong>{timeLeft} seconds</strong>.
                      </p>
                    ) : (
                      <p style={{ fontSize: "1rem" }}>
                        Didn’t get the code?{" "}
                        <button
                          type="button"
                          onClick={handleResendCode}
                          className="btn btn-link p-0"
                          style={{
                            color: "#ffc801",
                            textDecoration: "underline",
                            fontWeight: "bold",
                          }}
                        >
                          Resend Code
                        </button>
                      </p>
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
                        Verify
                      </button>
                    </div>
                  </form>
                )}

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

export default ForgotUserId;
