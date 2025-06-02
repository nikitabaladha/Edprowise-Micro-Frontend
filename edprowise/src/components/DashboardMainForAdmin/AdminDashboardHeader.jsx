import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";
import { IoKeyOutline } from "react-icons/io5";

import { ThemeContext } from "../ThemeProvider.jsx";
import { useLogout } from "../../useLogout.jsx";

import { useNotifications } from "../NotificationProviderForEdprowise.jsx";

import getAPI from "../../api/getAPI.jsx";
import { useNavigate } from "react-router-dom";

const AdminDashboardHeader = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
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

  const [adminProfile, setAdminProfile] = useState(null);

  const fetchEdprowiseProfileData = async () => {
    try {
      const response = await getAPI(
        `${process.env.REACT_APP_USER_AND_PROFILE_SERVICE}/edprowise-profile`,
        {},
        true
      );

      if (!response.hasError && response.data && response.data.data) {
        setAdminProfile(response.data.data);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching Admin data:", err);
    }
  };

  useEffect(() => {
    fetchEdprowiseProfileData();
    fetchNotifications();
  }, []);

  const navigateToViewAdminProfile = (event, _id) => {
    event.preventDefault();
    navigate("/admin-dashboard/view-admin-profile", {
      state: { _id },
    });
  };

  const navigateToChangeAdminPassword = (event, adminProfile) => {
    event.preventDefault();
    navigate("/admin-dashboard/change-edprowise-admin-password", {
      state: { adminProfile },
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
                `/admin-dashboard/procurement-services/view-requested-quote`,
                {
                  state: { searchEnquiryNumber: result.text },
                }
              );
            } else if (result.type === "orderFromBuyer") {
              navigate(
                `/admin-dashboard/procurement-services/view-order-history`,
                {
                  state: { searchOrderNumber: result.text },
                }
              );
            } else if (result.type === "school") {
              if (result.exactMatchForSchoolName) {
                if (result.isSingleMatch) {
                  navigate(`/admin-dashboard/schools/view-school`, {
                    state: { schoolId: result.schoolId || result.text },
                  });
                } else {
                  navigate(`/admin-dashboard/schools`, {
                    state: { filterSchoolName: result.text },
                  });
                }
              } else {
                navigate(`/admin-dashboard/schools/view-school`, {
                  state: { schoolId: result.schoolId || result.text },
                });
              }
            } else if (result.type === "seller") {
              if (result.exactMatchForCompanyName) {
                if (result.isSingleMatch) {
                  navigate(`/admin-dashboard/sellers/view-seller`, {
                    state: { sellerId: result.sellerId || result.id },
                  });
                } else {
                  navigate(`/admin-dashboard/sellers`, {
                    state: { filterCompanyName: result.text },
                  });
                }
              } else {
                navigate(`/admin-dashboard/sellers/view-seller`, {
                  state: { sellerId: result.sellerId || result.id },
                });
              }
            }
          } else {
            setSearchResults([
              { type: "noResults", text: "No matching records found" },
            ]);
            setShowResults(true);
          }
        }
      } catch (err) {
        console.error("Search error:", err);
        setSearchResults([
          { type: "error", text: "Search failed. Please try again." },
        ]);
        setShowResults(true);
      }
    }
  };

  const handleResultClick = (result) => {
    if (result.type === "quoteRequest") {
      navigate(`/admin-dashboard/procurement-services/view-requested-quote`, {
        state: { searchEnquiryNumber: result.text },
      });
    } else if (result.type === "orderFromBuyer") {
      navigate(`/admin-dashboard/procurement-services/view-order-history`, {
        state: { searchOrderNumber: result.text },
      });
    } else if (result.type === "school") {
      if (result.exactMatchForSchoolName && !result.isSingleMatch) {
        navigate(`/admin-dashboard/schools`, {
          state: { filterSchoolName: result.text },
        });
      } else {
        navigate(`/admin-dashboard/schools/view-school`, {
          state: { schoolId: result.schoolId || result.text },
        });
      }
    } else if (result.type === "seller") {
      if (result.exactMatchForCompanyName && !result.isSingleMatch) {
        navigate(`/admin-dashboard/sellers`, {
          state: { filterCompanyName: result.text },
        });
      } else {
        navigate(`/admin-dashboard/sellers/view-seller`, {
          state: { sellerId: result.sellerId || result.id },
        });
      }
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
        navigate("/admin-dashboard/procurement-services/view-requested-quote", {
          state: {
            searchEnquiryNumber: notification.metadata.enquiryNumber,
          },
        });
      }
      if (notification.entityType === "QuoteProposal From Edprowise") {
        navigate("/admin-dashboard/procurement-services/view-quote", {
          state: {
            searchEnquiryNumber: notification.metadata.enquiryNumber,
            searchSellerId: notification.metadata.sellerId,
          },
        });
      }
      if (notification.entityType === "QuoteProposal From Seller") {
        navigate("/admin-dashboard/procurement-services/view-quote", {
          state: {
            searchEnquiryNumber: notification.metadata.enquiryNumber,
            searchSellerId: notification.senderId,
          },
        });
      }
      if (notification.entityType === "QuoteProposal Reject") {
        navigate("/admin-dashboard/procurement-services/view-quote-table", {
          state: {
            searchEnquiryNumber: notification.metadata.enquiryNumber,
          },
        });
      }
      if (
        notification.entityType === "Order From Buyer" ||
        notification.entityType === "TDS Update" ||
        notification.entityType === "Order Cancel" ||
        notification.entityType === "Delivery Date Changed" ||
        notification.entityType === "Order Progress"
      ) {
        navigate("/admin-dashboard/procurement-services/view-order-history", {
          state: {
            searchOrderNumber: notification.metadata.orderNumber,
          },
        });
      }
      if (notification.entityType === "School Registred") {
        navigate("/admin-dashboard/schools/view-school", {
          state: {
            schoolId: notification.metadata.schoolId,
          },
        });
      }
      if (notification.entityType === "Seller Registred") {
        navigate("/admin-dashboard/sellers/view-seller", {
          state: {
            sellerId: notification.metadata.sellerId,
          },
        });
      }
      if (notification.entityType === "School Subscription") {
        navigate("/admin-dashboard/subscriptions/view-subscriptions", {
          state: {
            subscriptionId: notification?.metadata?.subscriptionId,
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
                  Welcome! {userDetails?.firstName} {userDetails?.lastName}
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
              {/* Notification */}
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
                    {/* here i want to show image  */}
                    <img
                      src={`${process.env.REACT_APP_API_URL_FOR_USER_IMAGE}${adminProfile?.edprowiseProfile}`}
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
                      navigateToViewAdminProfile(event, adminProfile?._id)
                    }
                  >
                    <CgProfile className="bx bx-user-circle text-muted fs-18 align-middle me-1" />
                    <span className="align-middle">
                      {userDetails?.firstName} {userDetails?.lastName}
                      {adminProfile?.edprowiseProfile}
                    </span>
                  </Link>

                  <Link
                    className="dropdown-item"
                    onClick={(event) =>
                      navigateToChangeAdminPassword(event, adminProfile)
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
                          {/* School*/}
                          {result.type === "school" && (
                            <>
                              <iconify-icon
                                icon="solar:school-outline"
                                className="me-2"
                              />
                              {result.exactMatchForSchoolEmail ? (
                                <>Email: {result.text}</>
                              ) : result.exactMatchForSchoolMobileNumber ? (
                                <>Mobile Number: {result.text}</>
                              ) : result.exactMatchForSchoolId ? (
                                <>School ID: {result.text}</>
                              ) : result.exactMatchForSchoolName ? (
                                <>School Name: {result.text}</>
                              ) : (
                                <>{result.text}</>
                              )}
                            </>
                          )}
                          {/* Seller */}
                          {result.type === "seller" && (
                            <>
                              <iconify-icon
                                icon="solar:school-outline"
                                className="me-2"
                              />
                              {result.exactMatchForSellerEmail ? (
                                <>Email: {result.text}</>
                              ) : result.exactMatchForSellerMobileNumber ? (
                                <>Mobile Number: {result.text}</>
                              ) : result.exactMatchForCompanyName ? (
                                <>Comapny Name: {result.text}</>
                              ) : result.exactMatchForSellerRandomId ? (
                                <>Random Id: {result.text}</>
                              ) : (
                                <>{result.text}</>
                              )}
                            </>
                          )}

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

export default AdminDashboardHeader;
