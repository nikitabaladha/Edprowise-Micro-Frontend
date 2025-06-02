import React from "react";
import { useNavigate } from "react-router-dom";
import { TbTruckDelivery } from "react-icons/tb";

const OrderDetailsWebSitePage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login"); // Redirect to the login page
  };

  return (
    <>
      <section className="wpo-page-title service-sub-page-title">
        <div className="container">
          <div className="row">
            <div className="col col-xs-12">
              <div className="wpo-breadcumb-wrap">
                <h2>Order</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="shape-1">
          <img src="assets/website-images/shape/1.svg" alt="" />
        </div>
        <div className="shape-2">
          <img src="assets/website-images/shape/2.svg" alt="" />
        </div>
        <div className="shape-3">
          <img src="assets/website-images/shape/3.svg" alt="" />
        </div>
        <div className="shape-4">
          <img src="assets/website-images/shape/4.svg" alt="" />
        </div>
      </section>
      <section
        className="wpo-blog-section section-padding"
        id="blog"
        style={{ background: "#ffffff" }}
      >
        <div className="container">
          <div className="tracking-details-outer-container">
            <div className="tracking-details-container">
              <h1>Tracking Details</h1>
              <div className="order-web-icon">
                <TbTruckDelivery />
              </div>
              <p>Login to see the Tracking Details</p>
              <button onClick={handleLoginClick}>Login</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderDetailsWebSitePage;
