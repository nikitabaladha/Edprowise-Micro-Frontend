// EdProwise_Frontend\edprowise\src\components\DashboardMainForSeller\SellerDashboardHeader.jsimport React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";
import { IoKeyOutline } from "react-icons/io5";
import { ThemeContext } from "../ThemeProvider.jsx";
import getAPI from "../../api/getAPI.jsx";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../../useLogout.jsx";
import { useContext } from "react";

import { useEffect, useState } from "react";
import { useNotifications } from "../NotificationProviderForSeller.jsx";
import patchAPI from "../../api/patchAPI.jsx";
import putAPI from "../../api/putAPI.jsx";

const SellerDashboardHeader = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const [sellerProfile, setSellerProfile] = useState(null);

  const fetchSellerProfileData = async () => {
    try {
      const response = await getAPI(`/seller-profile`, {}, true);

      if (!response.hasError && response.data && response.data.data) {
        setSellerProfile(response.data.data);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching Seller data:", err);
    }
  };

  useEffect(() => {
    fetchSellerProfileData();
  }, []);
  const toggleSidebar = () => {
    const htmlElement = document.documentElement;
    const bodyElement = document.body;

    htmlElement.classList.toggle("sidebar-enable");

    if (htmlElement.classList.contains("sidebar-enable")) {
      bodyElement.style.overflow = "hidden";

      if (!document.querySelector(".offcanvas-backdrop")) {
        const backdrop = document.createElement("div");
        backdrop.className = "offcanvas-backdrop fade show";
        bodyElement.appendChild(backdrop);
      }
    } else {
      bodyElement.style.overflow = "";

      const backdrop = document.querySelector(".offcanvas-backdrop");
      if (backdrop && backdrop.parentNode) {
        backdrop.parentNode.removeChild(backdrop);
      }
    }
  };

  const handleDocumentClick = (event) => {
    const htmlElement = document.documentElement;
    const mainNav = document.querySelector(".main-nav");

    if (
      htmlElement.classList.contains("sidebar-enable") &&
      mainNav &&
      !mainNav.contains(event.target) &&
      !event.target.closest(".button-toggle-menu")
    ) {
      htmlElement.classList.remove("sidebar-enable");
      document.body.style.overflow = "";

      const backdrop = document.querySelector(".offcanvas-backdrop");
      if (backdrop) backdrop.remove();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const navigateToViewSellerProfile = (event, _id) => {
    event.preventDefault();
    navigate("/seller-dashboard/view-seller-profile", {
      state: { _id },
    });
  };

  const navigateToChangeSellerPassword = (event, sellerProfile) => {
    event.preventDefault();
    navigate("/seller-dashboard/change-seller-password", {
      state: { sellerProfile },
    });
  };

  const { notifications, unreadCount, fetchNotifications, markAsRead } =
    useNotifications();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  return (
    <>
      <header className="topbar">
        <div className="container-fluid">
          <div className="navbar-header">
            <div className="d-flex align-items-center">
              <div className="topbar-item">
                <button
                  type="button"
                  className="button-toggle-menu me-2"
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleSidebar();
                  }}
                >
                  <iconify-icon
                    icon="solar:hamburger-menu-broken"
                    className="fs-24 align-middle"
                  />
                </button>
              </div>
              {/* Menu Toggle Button */}
              <div className="topbar-item">
                <h4 className="fw-bold topbar-button pe-none text-uppercase mb-0">
                  Welcome! {sellerProfile?.companyName}
                </h4>
              </div>
            </div>
            <div className="d-flex align-items-center gap-1">
              {/* Notification Dropdown */}
              {/* i want all notification to same background and have fixed size have fixed height but want scrolling functionality
               */}
              <div className="dropdown topbar-item">
                <button
                  type="button"
                  className="topbar-button position-relative"
                  id="page-header-notifications-dropdown"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  onClick={(e) => {
                    e.preventDefault();
                    markAsRead();
                  }}
                >
                  <iconify-icon
                    icon="solar:bell-bing-bold-duotone"
                    className="fs-24 align-middle"
                  />
                  {unreadCount > 0 && (
                    <span className="position-absolute topbar-badge fs-10 translate-middle badge bg-danger rounded-pill">
                      {unreadCount}
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  )}
                </button>
                <div
                  className="dropdown-menu py-0 dropdown-lg dropdown-menu-end"
                  aria-labelledby="page-header-notifications-dropdown"
                >
                  <div className="p-3 border-top-0 border-start-0 border-end-0 border-dashed border">
                    <div className="row align-items-center">
                      <div className="col">
                        <h6 className="m-0 fs-16 fw-semibold">Notifications</h6>
                      </div>
                    </div>
                  </div>
                  <div className="notification-scroll-area">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div
                          className="dropdown-item py-3 border-bottom text-wrap"
                          key={notification._id}
                          // onClick={() => markAsRead(notification._id)}
                        >
                          <div className="d-flex">
                            <div className="flex-shrink-0">
                              <div className="avatar-sm me-2">
                                <span className="avatar-title bg-soft-primary text-primary fs-20 rounded-circle">
                                  <iconify-icon icon="solar:bell-bing-bold-duotone" />
                                </span>
                              </div>
                            </div>

                            <div className="flex-grow-1">
                              <p className="mb-0 fw-semibold">
                                {notification.title}
                              </p>
                              <p className="mb-0 text-wrap">
                                {notification.message}
                              </p>
                              <small className="text-muted">
                                {new Date(
                                  notification.createdAt
                                ).toLocaleString()}
                              </small>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="dropdown-item py-3 text-center">
                        <p className="mb-0">No notifications found</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* User */}
              <div className="dropdown topbar-item">
                <Link
                  type="button"
                  className="topbar-button"
                  id="page-header-user-dropdown"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="d-flex align-items-center">
                    <img
                      src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${sellerProfile?.sellerProfile}`}
                      className="rounded-circle"
                      alt="logo light"
                      style={{ objectFit: "cover" }}
                    />
                  </span>
                </Link>
                <div className="dropdown-menu dropdown-menu-end">
                  <Link
                    className="dropdown-item"
                    onClick={(event) =>
                      navigateToViewSellerProfile(event, sellerProfile?._id)
                    }
                  >
                    <CgProfile className="bx bx-user-circle text-muted fs-18 align-middle me-1" />
                    <span className="align-middle">
                      {sellerProfile?.companyName}
                    </span>
                  </Link>

                  <Link
                    className="dropdown-item"
                    onClick={(event) =>
                      navigateToChangeSellerPassword(event, sellerProfile)
                    }
                  >
                    <IoKeyOutline className="bx bx-message-dots text-muted fs-18 align-middle me-1" />
                    <span className="align-middle">Change Password</span>
                  </Link>

                  <div className="dropdown-divider my-1" />
                  <Link className="dropdown-item text-danger">
                    <BiLogOut className="bx bx-log-out fs-18 align-middle me-1" />
                    <span className="align-middle" onClick={logout}>
                      Logout
                    </span>
                  </Link>
                </div>
              </div>
              {/* App Search*/}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default SellerDashboardHeader;
