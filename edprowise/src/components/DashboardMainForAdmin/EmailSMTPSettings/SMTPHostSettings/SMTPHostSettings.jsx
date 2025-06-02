import React, { useState, useEffect } from "react";
import postAPI from "../../../../api/postAPI.jsx";
import getAPI from "../../../../api/getAPI.jsx";
import { toast } from "react-toastify";

const SMTPHostSettings = () => {
  const [showModal, setShowModal] = useState(false);
  const [testEmail, setTestEmail] = useState("");
  const [sending, setSending] = useState(false);

  const [formData, setFormData] = useState({
    mailType: "",
    mailHost: "",
    mailPort: "",
    mailUsername: "",
    mailPassword: "",
    mailEncryption: "",
    mailFromAddress: "",
    mailFromName: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await getAPI(
          `${process.env.REACT_APP_EMAIL_SERVICE}/get-smtp-email-settings`,
          {},
          true
        );

        if (!response.hasError) {
          setFormData({
            mailType: response.data.data.mailType || "",
            mailHost: response.data.data.mailHost || "",
            mailPort: response.data.data.mailPort || "",
            mailUsername: response.data.data.mailUsername || "",
            mailPassword: response.data.data.mailPassword || "",
            mailEncryption: response.data.data.mailEncryption || "",
            mailFromAddress: response.data.data.mailFromAddress || "",
            mailFromName: response.data.data.mailFromName || "",
          });
        }
      } catch (err) {
        toast.error("Error fetching email settings: " + err.message);
      }
    };

    fetchSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postAPI(
        `${process.env.REACT_APP_EMAIL_SERVICE}/post-smtp-email-settings`,
        formData,
        true
      );

      if (!response.hasError) {
        toast.success("SMTP settings updated successfully!");
      } else {
        toast.error("Failed to update SMTP settings. Please try again.");
      }
    } catch (error) {
      toast.error("Error updating SMTP settings: " + error.message);
    }
  };

  const handleTestMail = async (e) => {
    e.preventDefault();

    if (!testEmail) {
      toast.error("Please enter a test email.");
      return;
    }

    setSending(true);

    try {
      const response = await postAPI(
        "email/test-smtp-email-settings",
        { email: testEmail },
        true
      );

      if (!response.hasError) {
        toast.success("Test email sent successfully!");
        setShowModal(false);
        setTestEmail("");
      } else {
        toast.error("Failed to send test email. Please try again.");
      }
    } catch (error) {
      toast.error("Error sending test email: " + error.message);
    } finally {
      setSending(false); // Ensure state is reset no matter what
    }
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
                    SMTP Email setting
                  </h4>
                </div>
              </div>
              {/* onSubmit={handleSubmit} */}
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="mailType" className="form-label">
                        Type <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="mailType"
                        name="mailType"
                        className="form-control"
                        value={formData.mailType}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="mailHost" className="form-label">
                        Mail Host <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="mailHost"
                        name="mailHost"
                        className="form-control"
                        value={formData.mailHost}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="mailPort" className="form-label">
                        Mail Port <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="mailPort"
                        name="mailPort"
                        className="form-control"
                        value={formData.mailPort}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="mailUsername" className="form-label">
                        Mail Username <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="mailUsername"
                        name="mailUsername"
                        className="form-control"
                        value={formData.mailUsername}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="mailPassword" className="form-label">
                        Mail Password <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="mailPassword"
                        name="mailPassword"
                        className="form-control"
                        value={formData.mailPassword}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="mailEncryption" className="form-label">
                        Mail Encryption <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="mailEncryption"
                        name="mailEncryption"
                        className="form-control"
                        value={formData.mailEncryption}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="mailFromAddress" className="form-label">
                        Mail From Address <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="mailFromAddress"
                        name="mailFromAddress"
                        className="form-control"
                        value={formData.mailFromAddress}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="mailFromName" className="form-label">
                        Mail From Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="mailFromName"
                        name="mailFromName"
                        className="form-control"
                        value={formData.mailFromName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  <div className="mr-2">
                    <button
                      type="button"
                      className="btn btn-primary custom-submit-button"
                      onClick={() => setShowModal(true)}
                    >
                      Test Mail
                    </button>
                  </div>
                  <div className="text" style={{ marginLeft: "1rem" }}>
                    <button
                      type="submit"
                      className="btn btn-primary custom-submit-button"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h5 className="text-center">Send Test Email</h5>
            <div className="col-md-6">
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="d-flex justify-content-end mt-3">
              {/* {sending && <label><i className="fas fa-clock"></i> Sending...</label>} */}
              <button
                className="btn btn-secondary mr-2"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              {/* <button className="btn btn-primary" style={{ marginLeft: "1rem" }} onClick={handleTestMail}>Send</button> */}
              <button
                className="btn btn-primary"
                style={{ marginLeft: "1rem" }}
                onClick={handleTestMail}
                disabled={sending}
              >
                {sending ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SMTPHostSettings;
