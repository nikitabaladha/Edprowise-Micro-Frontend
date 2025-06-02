import React, { useState } from "react";
import { TbSortAZ } from "react-icons/tb";
import { GiCutDiamond } from "react-icons/gi";
import { MdOutlineManageHistory } from "react-icons/md";
import { HiLightBulb } from "react-icons/hi";
import { BsRocketFill } from "react-icons/bs";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { LuBoxes } from "react-icons/lu";
import { FaShippingFast } from "react-icons/fa";

const WhyChooseUs = () => {
  const [activeTab, setActiveTab] = useState("buyer");

  const chooseDataBuyer = [
    {
      id: 1,
      iconClass: <TbSortAZ />,
      title: "A to Z Services",
      description: "Marketplace for school. Whatever You Need, We Provide",
      classNameS: "s1",
    },
    {
      id: 2,
      iconClass: <GiCutDiamond />,
      title: "Specialization",
      description:
        "Deep expertise & understanding of the unique needs & challenges faced by educational institutions .",
      classNameS: "s2",
    },
    {
      id: 3,
      iconClass: <MdOutlineManageHistory />,
      title: "Efficient Operation",
      description: "Streamlining operations with efficient management systems.",
      classNameS: "s3",
    },
    {
      id: 4,
      iconClass: <HiLightBulb />,
      title: "Innovative Approach",
      description: "Innovative school management ERP & Dedicated to fostering.",
      classNameS: "s4",
    },
  ];

  const chooseDataSupplier = [
    {
      id: 1,
      iconClass: <BsRocketFill />,
      title: "Grow Your Business",
      description: "Get access to a global buyer base and grow 3X and more.",
      classNameS: "s1",
    },
    {
      id: 2,
      iconClass: <FaMoneyBillTransfer />,
      title: "Advance Payments",
      description:
        "Get your payments upfront and let us worry about the credit.",
      classNameS: "s2",
    },
    {
      id: 3,
      iconClass: <LuBoxes />,
      title: "High Order Volumes",
      description: "Get bigger order volumes from our large global buyer base.",
      classNameS: "s3",
    },
    {
      id: 4,
      iconClass: <FaShippingFast />,
      title: "Fulfillment Services",
      description: "End-to-end managed logistics while you focus on business.",
      classNameS: "s4",
    },
  ];

  return (
    <>
      <section className="wpo-courses-section-s2 section-padding section-background-box-shadow pt-2 pb-1">
        <div className="container">
          <div className="row-web">
            <div className="col-12">
              <div className="wpo-section-title-s2">
                <h2 className="font-family-web">
                  Maximizing Value for Buyers & Sellers
                </h2>
              </div>
            </div>
          </div>
          <div className="tabs">
            <button
              id="buyerTab"
              className={` theme-choose-btn ${
                activeTab === "buyer" ? "active" : ""
              }`}
              onClick={() => setActiveTab("buyer")}
            >
              Buyer
            </button>
            <button
              id="supplierTab"
              className={` theme-choose-btn ${
                activeTab === "supplier" ? "active" : ""
              }`}
              onClick={() => setActiveTab("supplier")}
            >
              Supplier
            </button>
          </div>
          <div
            className={`show-tab ${activeTab === "buyer" ? "active" : ""}`}
            id="buyerSection"
          >
            <div className="row-web wpo-courses-wrap">
              {chooseDataBuyer.map((item) => (
                <div
                  key={item.id}
                  className={`category-items col-lg-3 col-md-6 col-6 grid-web ${item.classNameS}`}
                >
                  <div className="wpo-courses-item category-itemm">
                    <div className="wpo-courses-text">
                      <div className="courses-icon category-icons">
                        {item.iconClass}
                        {/* <i className={item.iconClass}></i> */}
                      </div>
                      <h2 className="category-h2 font-weight-web-h2">
                        <a>{item.title}</a>
                      </h2>
                      <p className="category-text font-family-web ">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            className={`show-tab ${activeTab === "supplier" ? "active" : ""}`}
            id="supplierSection"
          >
            <div className="row-web wpo-courses-wrap">
              {chooseDataSupplier.map((item) => (
                <div
                  key={item.id}
                  className={`category-items col-lg-3 col-md-6 col-6 grid-web ${item.classNameS}`}
                >
                  <div className="wpo-courses-item category-itemm">
                    <div className="wpo-courses-text">
                      <div className="courses-icon category-icons">
                        {item.iconClass}
                        {/* <i className={item.iconClass}></i> */}
                      </div>
                      <h2 className="category-h2 font-weight-web-h2">
                        <a>{item.title}</a>
                      </h2>
                      <p className="category-text font-family-web">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="shape-1">
          <img src="assets/website-images/shape/1.svg" alt="Shape 1" />
        </div>
        <div className="shape-2">
          <img src="assets/website-images/shape/2.svg" alt="Shape 2" />
        </div>
        <div className="shape-3">
          <img src="assets/website-images/shape/3.svg" alt="Shape 3" />
        </div>
        <div className="shape-4">
          <img src="assets/website-images/shape/4.svg" alt="Shape 4" />
        </div>
      </section>
      <section className="wpo-courses-section-s2 section-padding section-background-box-shadow pt-2 pb-3">
        <div className="container">
          <div className="row-web">
            <div className="col-12">
              <div className="wpo-section-title-s2">
                {/* <small>Our Courses</small> */}
                <h2 className="font-family-web">Served Best Institute</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="slider">
          <div className="slide-track">
            <div className="slide">
              <img
                className="serve-school-img"
                src="/assets/website-images/carmel-school.png"
                height="100"
                width="250"
                alt=""
              />
            </div>
            <div className="slide">
              <img
                className="serve-school-img"
                src="/assets/website-images/francis-de-sales-school.jpeg"
                height="100"
                width="250"
                alt=""
              />
            </div>
            <div className="slide">
              <img
                className="serve-school-img"
                src="/assets/website-images/christ-raja-school.jpg"
                height="100"
                width="250"
                alt=""
              />
            </div>
            <div className="slide">
              <img
                className="serve-school-img"
                src="/assets/website-images/Mount-collage-logo.png"
                height="100"
                width="250"
                alt=""
              />
            </div>
            <div className="slide">
              <img
                className="serve-school-img"
                src="/assets/website-images/thomas-convent-school.jpeg"
                height="100"
                width="250"
                alt=""
              />
            </div>
            <div className="slide">
              <img
                className="serve-school-img"
                src="/assets/website-images/trinity-convent-school.jpeg"
                height="100"
                width="250"
                alt=""
              />
            </div>
            <div className="slide">
              <img
                className="serve-school-img"
                src="/assets/website-images/carmel-school.png"
                height="100"
                width="250"
                alt=""
              />
            </div>
            <div className="slide">
              <img
                className="serve-school-img"
                src="/assets/website-images/francis-de-sales-school.jpeg"
                height="100"
                width="250"
                alt=""
              />
            </div>
            <div className="slide">
              <img
                className="serve-school-img"
                src="/assets/website-images/christ-raja-school.jpg"
                height="100"
                width="250"
                alt=""
              />
            </div>
            <div className="slide">
              <img
                className="serve-school-img"
                src="/assets/website-images/Mount-collage-logo.png"
                height="100"
                width="250"
                alt=""
              />
            </div>
            <div className="slide">
              <img
                className="serve-school-img"
                src="/assets/website-images/thomas-convent-school.jpeg"
                height="100"
                width="250"
                alt=""
              />
            </div>
            <div className="slide">
              <img
                className="serve-school-img"
                src="/assets/website-images/trinity-convent-school.jpeg"
                height="100"
                width="250"
                alt=""
              />
            </div>
            <div className="slide">
              <img
                className="serve-school-img"
                src="/assets/website-images/carmel-school.png"
                height="100"
                width="250"
                alt=""
              />
            </div>
            <div className="slide">
              <img
                className="serve-school-img"
                src="/assets/website-images/francis-de-sales-school.jpeg"
                height="100"
                width="250"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyChooseUs;
