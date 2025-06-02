import React from "react";
import { IoNewspaperOutline } from "react-icons/io5";
import { PiShoppingCartBold } from "react-icons/pi";
import { AiFillProduct } from "react-icons/ai";
import { AiOutlineProduct } from "react-icons/ai";
import { GiMoneyStack } from "react-icons/gi";
import { PiMoneyWavyBold } from "react-icons/pi";

const DashboardInformationCards = ({ totalCounts }) => {
  const cardData = [
    {
      icon: <IoNewspaperOutline className="fs-36 text-info" />,
      value: totalCounts.totalQuoteRequest || 0,
      label: "Total Quotes",
      badgeClass: "badge-soft-success",
      badgeIcon: "ti ti-arrow-badge-up",
      widgetIcon: <IoNewspaperOutline className="widget-icon" />,
      textColor: "text-info",
    },
    {
      icon: <PiShoppingCartBold className="fs-36 text-success" />,
      value: totalCounts.totalOrder || 0,
      label: "Total Orders",
      badgeClass: "badge-soft-danger",
      badgeIcon: "ti ti-arrow-badge-down",
      widgetIcon: <PiShoppingCartBold className="widget-icon" />,
      textColor: "text-success",
    },

    {
      icon: <AiFillProduct className="fs-36 text-danger" />,
      value: totalCounts.totalSubcategory || 0,
      label: "Total Products",
      badgeClass: "badge-soft-success",
      badgeIcon: "ti ti-arrow-badge-up",
      widgetIcon: <AiOutlineProduct className="widget-icon" />,
      textColor: "text-orange",
    },
    {
      icon: <GiMoneyStack className="fs-36 text-warning" />,
      value: totalCounts.totalRevenue || 0,
      label: "Total Revenue",
      badgeClass: "badge-soft-success",
      badgeIcon: "ti ti-arrow-badge-up",
      widgetIcon: <PiMoneyWavyBold className="widget-icon" />,
      textColor: "text-orange",
    },
  ];
  return (
    <div className="row">
      {cardData.map((card, index) => (
        <div className="col-md-3">
          <div className="card">
            <div className="card-body overflow-hidden position-relative">
              {card.icon}

              <h3 className="mb-0 fw-bold mt-3 mb-1">{card.value}</h3>
              <p className="text-muted">{card.label}</p>

              {card.widgetIcon}
            </div>{" "}
            {/* end card-body */}
          </div>{" "}
          {/* end card */}
        </div>
      ))}
    </div>
  );
};

export default DashboardInformationCards;
