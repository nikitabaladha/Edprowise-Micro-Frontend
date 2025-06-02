import react from "react";

const TermsPage = () => {
  return (
    <>
      <section className="wpo-page-title service-sub-page-title">
        <div className="container">
          <div className="row">
            <div className="col col-xs-12">
              <div className="wpo-breadcumb-wrap">
                <h2>Terms & Conditions</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="shape-1">
          <img src="/assets/website-images/shape/1.svg" alt="" />
        </div>
        <div className="shape-2">
          <img src="/assets/website-images/shape/2.svg" alt="" />
        </div>
        <div className="shape-3">
          <img src="/assets/website-images/shape/3.svg" alt="" />
        </div>
        <div className="shape-4">
          <img src="/assets/website-images/shape/4.svg" alt="" />
        </div>
      </section>
      <section
        className="wpo-terms-section section-padding"
        style={{ background: "#ffffff" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="wpo-terms-wrap">
                <div className="wpo-terms-img">
                  <img
                    src="/assets/website-images/terms/terms.webp"
                    alt="Terms"
                  />
                </div>
                <div className="wpo-terms-text">
                  <h2>Terms</h2>
                  <p className="text-black">
                    The below terms of use govern the use of all Edprowise Tech
                    Private Limited. By accessing and using any Edprowise ERP
                    software, you agree to abide by these terms and conditions.{" "}
                  </p>
                  <p className="text-black">
                    All Edprowise ERP solutions are the exclusive property of
                    Edprowise Tech Pvt. Ltd. reserves the right to modify,
                    update, or terminate access to any ERP solution without
                    prior notice. Users must periodically review and comply with
                    the "Terms of Use" linked to the software.
                  </p>
                  <p className="text-black">
                    Accessing any Eprowise ERP solution implies agreement to
                    these terms, and any violations will be considered willful.
                    Also, access is limited to Registered Users with valid login
                    credentials. Unauthorised access attempts using invalid,
                    stolen, or borrowed credentials are strictly prohibited.
                  </p>
                  <p className="text-black">
                    Users are confined to the software menu and features
                    displayed on the screen. Unauthorised expansion of access,
                    hacking, or illicit use is strictly forbidden and subject to
                    legal action.
                  </p>
                  <p className="text-black">
                    By accessing any Edprowise ERP software, users implicitly
                    grant permission for Edprowise to monitor all activities
                    within the software for security and compliance.
                  </p>
                  <p className="text-black">
                    These terms are governed by Indian law, and disputes will be
                    resolved in Delhi, India.
                  </p>
                  <p className="text-black">
                    Thank you for choosing Edprowise Tech Pvt. Ltd. for your ERP
                    needs. By using our solutions, you agree to adhere to these
                    terms, ensuring a secure and efficient experience for all
                    users.
                  </p>
                  <p className="text-black">
                    For any questions or concerns, contact our Customer Support
                    for clarification at support@edprowise.com
                  </p>
                  <p className="text-black">
                    The final terms and condition are based on the final service
                    level agreement between Edprowise and customer.
                  </p>
                </div>{" "}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TermsPage;
