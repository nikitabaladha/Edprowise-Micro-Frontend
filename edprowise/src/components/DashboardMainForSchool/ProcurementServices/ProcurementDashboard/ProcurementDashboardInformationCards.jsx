import React from "react";
import { IoNewspaperOutline } from "react-icons/io5";
import { PiShoppingCartBold } from "react-icons/pi";
import { GiMoneyStack } from "react-icons/gi";
import { PiMoneyWavyBold } from "react-icons/pi";
import { PiStudentFill } from "react-icons/pi";
import { PiStudent } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const DashboardInformationCards = ({ totalCounts }) => {
  const navigate = useNavigate();

  const navigateToTrackQuote = (event) => {
    event.preventDefault();
    navigate("/school-dashboard/procurement-services/track-quote");
  };

  const navigateToOrders = (event) => {
    event.preventDefault();
    navigate("/school-dashboard/procurement-services/track-order-history");
  };
  const cardData = [
    {
      icon: <PiStudentFill className="fs-36 text-warning" />,
      value: totalCounts.totalStudents || 0,
      label: "Total Students",
      badgeClass: "badge-soft-danger",
      badgeIcon: "ti ti-arrow-badge-down",
      widgetIcon: <PiStudent className="widget-icon" />,
      textColor: "text-purple",
    },
    {
      icon: <IoNewspaperOutline className="fs-36 text-info" />,
      value: totalCounts.totalQuoteRequest || 0,
      label: "Total Quotes",
      badgeClass: "badge-soft-success",
      badgeIcon: "ti ti-arrow-badge-up",
      widgetIcon: <IoNewspaperOutline className="widget-icon" />,
      textColor: "text-info",
      onClick: navigateToTrackQuote,
    },
    {
      icon: <PiShoppingCartBold className="fs-36 text-success" />,
      value: totalCounts.totalOrder || 0,
      label: "Total Orders",
      badgeClass: "badge-soft-danger",
      badgeIcon: "ti ti-arrow-badge-down",
      widgetIcon: <PiShoppingCartBold className="widget-icon" />,
      textColor: "text-success",
      onClick: navigateToOrders,
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
          <div
            className="card cursor-pointer"
            onClick={card.onClick}
            style={{ cursor: "pointer" }}
          >
            <div className="card-body overflow-hidden position-relative">
              <div className="text-center">
                {card.icon}

                <h3 className="mb-0 fw-bold mt-3 mb-1">{card.value}</h3>
                <p className="text-muted">{card.label}</p>
              </div>

              {card.widgetIcon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardInformationCards;
