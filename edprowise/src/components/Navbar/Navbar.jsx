import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { RiCloseLargeFill } from "react-icons/ri";
import Topbar from "./Topbar.jsx";

const menuData = [
  { name: "Home", link: "/", subMenu: [] },

  {
    name: "Services",
    subMenu: [
      {
        name: "Digital Services",
        link: "/services/digital-services",
      },
      { name: "Acadmic & Admin", link: "/services/academic-admin-services" },
      {
        name: "Get Goods For Your School",
        link: "/services/get-goods-for-school",
      },
      { name: "Hire School Teacher", link: "/services/hire-teacher" },
    ],
  },
  { name: "Orders", link: "/order", subMenu: [] },
  {
    name: "About Us",
    link: "/about-us",
    subMenu: [],
  },
  {
    name: "Community Connect",
    subMenu: [
      { name: "Gallery", link: "/community-connect/gallery" },
      { name: "EdProwise Talks", link: "/community-connect/edprowise-talks" },
      { name: "Student Zone", link: "/community-connect/student-zone" },
      { name: "Educator Zone", link: "/community-connect/educator-zone" },
    ],
  },
  { name: "Contact Us", link: "/contact-us", subMenu: [] },
];

const Header = () => {
  const location = useLocation();

  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const toggleSubMenu = (index) => {
    setOpenSubMenu(openSubMenu === index ? null : index);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prevState) => !prevState);
  };

  const handleMenuClick = (menu, index, e) => {
    if (menu.subMenu.length === 0) {
      toggleMobileMenu();
    } else {
      e.preventDefault();
      toggleSubMenu(index);
    }
  };

  const handleSubMenuClick = (subItem, e) => {
    toggleMobileMenu();
  };

  const isActive = (path, subMenu) => {
    if (location.pathname === path) {
      return true;
    }

    if (subMenu && subMenu.length > 0) {
      return subMenu.some((subItem) => location.pathname === subItem.link);
    }

    return false;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100 && !isSticky) {
        setIsSticky(true);
      } else if (window.scrollY <= 100 && isSticky) {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isSticky]);

  const navigate = useNavigate();

  const handleSignIn = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const accessToken = localStorage.getItem("accessToken");
    const userDetails = localStorage.getItem("userDetails");

    if (!accessToken || !userDetails) return navigate("/login");

    const user = JSON.parse(userDetails);
    let route = "";

    switch (user.role) {
      case "School":
        route =
          user.status === "Pending"
            ? "/complete-school-profile"
            : "/school/go-to-dashboard";
        break;

      case "Seller":
        route =
          user.status === "Pending"
            ? "/complete-seller-profile"
            : "/seller-dashboard/procurement-services/dashboard";
        break;

      case "Admin":
        route =
          user.status === "Pending"
            ? "/complete-seller-profile"
            : "/admin-dashboard";
        break;

      case "Auditor":
        route = "/auditor-dashboard";
        break;

      case "User":
        route = "/user-dashboard";
        break;

      default:
        route = "/login";
    }

    return navigate(route);
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    event.stopPropagation();

    localStorage.removeItem("accessToken");
    localStorage.removeItem("userDetails");

    navigate(`/signup`);
  };

  const toggleMobileNavigation = (e) => {
    var navbar = window.$(".navigation-holder");
    var openBtn = window.$(".mobail-menu .open-btn");
    var xbutton = window.$(" .navbar-toggler");

    navbar.toggleClass("slideInn");
    xbutton.toggleClass("x-close");
    return false;
  };

  const handleHomePageRender = (event) => {
    event.preventDefault();
    event.stopPropagation();
    navigate(`/`);
  };

  // const handleLogout = () => {
  //   localStorage.removeItem("accessToken");
  //   localStorage.removeItem("userDetails");
  //   window.location.href = "/login";
  // };

  const handleLogout = (event) => {
    try {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }

      localStorage.removeItem("accessToken");
      localStorage.removeItem("userDetails");

      setTimeout(() => {
        window.location.href = "/login";
      }, 50);
    } catch (error) {
      console.error("Logout error:", error);
      window.location.href = "/login";
    }
  };

  return (
    <header id="header">
      {location.pathname === "/" && <Topbar />}
      <div className="wpo-site-header wpo-header-style-2">
        <nav
          className={`navigation navbar navbar-expand-lg navbar-light ${
            isSticky ? "sticky-header sticky-on" : ""
          }`}
        >
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-lg-3 col-3 d-lg-none dl-block">
                <div className="mobail-menu">
                  {isMobileMenuOpen ? (
                    <>
                      <button
                        type="button"
                        className="menu-close "
                        onClick={toggleMobileMenu}
                        style={{ borderRadius: "0.75rem" }}
                      >
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar first-angle"></span>
                        <span className="icon-bar middle-angle"></span>
                        <span className="icon-bar last-angle"></span>
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      className="navbar-toggler open-btn"
                      onClick={toggleMobileNavigation}
                      style={{ borderRadius: "0.75rem" }}
                    >
                      <span className="sr-only">Toggle navigation</span>
                      <span className="icon-bar first-angle"></span>
                      <span className="icon-bar middle-angle"></span>
                      <span className="icon-bar last-angle"></span>
                    </button>
                  )}
                </div>
              </div>
              <div className="col-lg-2 col-9">
                <div className="navbar-header">
                  <Link
                    onClick={(event) => handleHomePageRender(event)}
                    className="navbar-brand fw-bold logo"
                  >
                    <img
                      src="/assets/website-images/EdProwise New Logo-1.png"
                      alt="logo"
                    />
                  </Link>
                </div>
              </div>
              <div className="col-lg-8 col-md-1 col-0">
                <div
                  id="navbar"
                  className={`collapse navbar-collapse navigation-holder ${
                    isMobileMenuOpen ? "show" : ""
                  }`}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="sidebar-logo">
                      <div className="navbar-header">
                        <Link
                          onClick={(event) => handleHomePageRender(event)}
                          className="navbar-brand fw-bold logo"
                        >
                          <img
                            src="/assets/website-images/EdProwise New Logo White-1.png"
                            alt="logo"
                          />
                        </Link>
                      </div>
                    </div>
                    <button className="menu-close" onClick={toggleMobileMenu}>
                      <RiCloseLargeFill className="close-icon" />
                    </button>
                  </div>

                  <ul className="nav navbar-nav mb-2 mb-lg-0">
                    {menuData.map((menu, index) => (
                      <li
                        key={index}
                        className={` ${
                          menu.subMenu.length > 0
                            ? "menu-item-has-children"
                            : ""

                          // menu-item
                        }`}
                      >
                        <Link
                          to={menu.link}
                          // onClick={(e) => handleMenuClick(menu, index, e)}

                          onClick={
                            window.innerWidth <= 992
                              ? (e) => handleMenuClick(menu, index, e)
                              : undefined
                          }
                          className={`nav-item ${
                            isActive(menu.link, menu.subMenu) ? "active" : ""
                          }`}
                        >
                          {menu.name}
                        </Link>
                        {/* && openSubMenu === index  */}
                        {window.innerWidth <= 992 ? (
                          <>
                            {menu.subMenu.length > 0 &&
                              window.innerWidth <= 992 &&
                              openSubMenu === index && (
                                <ul className="sub-menu">
                                  {menu.subMenu.map((subItem, subIndex) => (
                                    <li key={subIndex}>
                                      <Link
                                        to={subItem.link}
                                        onClick={(e) =>
                                          handleSubMenuClick(subItem, e)
                                        }
                                        className={`${
                                          isActive(subItem.link) ? "active" : ""
                                        }`}
                                      >
                                        {subItem.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                          </>
                        ) : (
                          <>
                            {menu.subMenu.length > 0 && (
                              <ul className="sub-menu">
                                {menu.subMenu.map((subItem, subIndex) => (
                                  <li key={subIndex}>
                                    <Link
                                      to={subItem.link}
                                      onClick={(e) =>
                                        handleSubMenuClick(subItem, e)
                                      }
                                      className={`${
                                        isActive(subItem.link) ? "active" : ""
                                      }`}
                                    >
                                      {subItem.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </>
                        )}
                      </li>
                    ))}
                    {localStorage.getItem("accessToken") &&
                    localStorage.getItem("userDetails") ? (
                      <>
                        <li className="menu-item sign-up-in-mobile">
                          <Link
                            to="/dashboard"
                            onClick={(event) => handleSignIn(event)}
                          >
                            Dashboard
                          </Link>
                        </li>
                        <li className="menu-item sign-up-in-mobile">
                          <Link onClick={handleLogout}>Logout</Link>
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="menu-item sign-up-in-mobile">
                          <Link to="/signup">Sign Up</Link>
                        </li>
                        <li className="menu-item sign-up-in-mobile">
                          <Link to="/login">Sign In</Link>
                        </li>
                      </>
                    )}
                  </ul>
                  {/* Signup Login Button */}
                </div>
              </div>
              <div className="col-lg-2 col-md-3 col-0">
                <div className="header-right">
                  {localStorage.getItem("accessToken") &&
                  localStorage.getItem("userDetails") ? (
                    <>
                      <div className="close-form">
                        <Link
                          className="login"
                          onClick={(event) => handleSignIn(event)}
                        >
                          <span className="text font-family-web login-weight">
                            Dashboard
                          </span>
                          <span className="mobile">
                            <i className="fi flaticon-charity"></i>
                          </span>
                        </Link>

                        <Link className="theme-btn" onClick={handleLogout}>
                          <span className="text font-family-web login-weight">
                            Logout
                          </span>
                          <span className="mobile">
                            <i className="fi flaticon-charity"></i>
                          </span>
                        </Link>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="close-form">
                        <Link
                          className="login"
                          onClick={(event) => handleSignUp(event)}
                        >
                          <span className="text font-family-web login-weight">
                            Sign Up
                          </span>
                          <span className="mobile">
                            <i className="fi flaticon-charity"></i>
                          </span>
                        </Link>

                        <Link
                          className="theme-btn"
                          onClick={(event) => handleSignIn(event)}
                        >
                          <span className="text font-family-web login-weight">
                            Sign In
                          </span>
                          <span className="mobile">
                            <i className="fi flaticon-charity"></i>
                          </span>
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
