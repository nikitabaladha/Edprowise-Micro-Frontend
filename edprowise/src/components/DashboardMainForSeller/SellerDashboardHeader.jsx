import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";
import { IoKeyOutline } from "react-icons/io5";
import { ThemeContext } from "../ThemeProvider.jsx";
import getAPI from "../../api/getAPI.jsx";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../../useLogout.jsx";

import { useNotifications } from "../NotificationProviderForSeller.jsx";

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
      if (backdrop) backdrop.remove();
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

  const { theme, toggleTheme } = useContext(ThemeContext);

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

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async (event) => {
    if (event.key === "Enter" || event.type === "click") {
      event.preventDefault();

      if (!searchQuery.trim()) {
        setShowResults(false);
        return;
      }

      try {
        const response = await getAPI(
          `/global-search?query=${encodeURIComponent(searchQuery)}`,
          {},
          true
        );

        if (response.data?.success) {
          if (response.data.data.length > 0) {
            const result = response.data.data[0];

            if (result.type === "quoteRequest") {
              navigate(
                `/seller-dashboard/procurement-services/view-requested-quote`,
                {
                  state: { searchEnquiryNumber: result.text },
                }
              );
            }
            if (result.type === "orderFromBuyer") {
              navigate(
                `/seller-dashboard/procurement-services/view-order-history`,
                {
                  state: { searchOrderNumber: result.text },
                }
              );
            }
          } else {
            setSearchResults([
              {
                type: "noResults",
                text: "No matching records found",
              },
            ]);
            setShowResults(true);
          }
        }
      } catch (err) {
        console.error("Search error:", err);
        setSearchResults([
          {
            type: "error",
            text: "Search failed. Please try again.",
          },
        ]);
        setShowResults(true);
      }
    }
  };

  const handleResultClick = (result) => {
    if (result.type === "quoteRequest") {
      navigate(`/seller-dashboard/procurement-services/view-requested-quote`, {
        state: { searchEnquiryNumber: result.text },
      });
    }
    if (result.type === "orderFromBuyer") {
      navigate(`/seller-dashboard/procurement-services/view-order-history`, {
        state: { searchOrderNumber: result.text },
      });
    }
    setShowResults(false);
    setSearchQuery("");
  };

  const { notifications, fetchNotifications, markNotificationRead } =
    useNotifications();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleNotificationClick = async (notification) => {
    await markNotificationRead(notification._id);
    try {
      if (notification.entityType === "QuoteRequest") {
        navigate(
          "/seller-dashboard/procurement-services/view-requested-quote",
          {
            state: {
              searchEnquiryNumber: notification.metadata.enquiryNumber,
            },
          }
        );
      }
      if (
        notification.entityType === "QuoteProposal" ||
        notification.entityType === "QuoteProposal Reject"
      ) {
        navigate(
          "/seller-dashboard/procurement-services/view-requested-quote",
          {
            state: {
              searchEnquiryNumber: notification.metadata.enquiryNumber,
            },
          }
        );
      }
      if (
        notification.entityType === "Order From Buyer" ||
        notification.entityType === "Order Cancel" ||
        notification.entityType === "TDS Update" ||
        notification.entityType === "Delivery Date Changed" ||
        notification.entityType === "Order Progress"
      ) {
        navigate("/seller-dashboard/procurement-services/view-order-history", {
          state: {
            searchOrderNumber: notification.metadata.orderNumber,
            searchEnquiryNumber: notification.enquiryNumber,
          },
        });
      }
    } catch (error) {
      console.error("Error handling notification click:", error);
    }
  };

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
              {/* Theme Color (Light/Dark) */}
              <div className="topbar-item">
                <button
                  type="button"
                  className="topbar-button"
                  id="light-dark-mode"
                  onClick={toggleTheme}
                >
                  <iconify-icon
                    icon="solar:moon-bold-duotone"
                    className="fs-24 align-middle"
                  />
                </button>
              </div>

              <div className="dropdown topbar-item">
                <button
                  type="button"
                  className="topbar-button position-relative"
                  id="page-header-notifications-dropdown"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  onClick={fetchNotifications}
                >
                  <iconify-icon
                    icon="solar:bell-bing-bold-duotone"
                    className="fs-24 align-middle"
                  />
                  {notifications.filter((n) => !n.read).length > 0 && (
                    <span class="position-absolute topbar-badge fs-10 translate-middle badge bg-danger rounded-pill">
                      {notifications.filter((n) => !n.read).length}
                      <span class="visually-hidden">unread messages</span>
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
                          onClick={() => handleNotificationClick(notification)}
                          style={{ cursor: "pointer" }}
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
                              <p
                                className="mb-0 fw-semibold"
                                style={{
                                  color: notification.read ? "#666" : "blue",
                                }}
                              >
                                {notification.title}
                              </p>
                              <p
                                className="mb-0 text-wrap"
                                style={{
                                  color: notification.read ? "#666" : "blue",
                                }}
                              >
                                {notification.message}
                              </p>
                              <small
                                style={{
                                  color: notification.read ? "#666" : "blue",
                                }}
                              >
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
              <form
                className="app-search d-none d-md-block ms-2"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="position-relative">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search..."
                    autoComplete="off"
                    defaultValue=""
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearch}
                  />
                  <iconify-icon
                    icon="solar:magnifer-linear"
                    className="search-widget-icon"
                    onClick={handleSearch}
                    style={{ cursor: "pointer" }}
                  />

                  {showResults && (
                    <div className="search-results-dropdown">
                      {searchResults.map((result) => (
                        <div
                          key={`${result.type}-${result.id}`}
                          className="search-result-item"
                          onClick={() => handleResultClick(result)}
                        >
                          {result.type === "noResults" && (
                            <span className="text-muted">{result.text}</span>
                          )}
                          {result.type === "error" && (
                            <span className="text-danger">{result.text}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default SellerDashboardHeader;
