import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const userRole = userDetails?.role || "Guest";
  const email = userDetails?.email;
  const [isCollapsed, setIsCollapsed] = useState(false);
  useEffect(() => {
    if (userRole === "Admin" || userRole === "Seller") {
      localStorage.removeItem("sidebartab");
    }
  }, [userRole]);

  useEffect(() => {
    const htmlTag = document.documentElement;
    const menuSize = htmlTag.getAttribute("data-menu-size");
    setIsCollapsed(menuSize === "sm-hover");

    const updateMenuState = () => {
      const current = htmlTag.getAttribute("data-menu-size");
      setIsCollapsed(
        current === "sm-hover" && !htmlTag.querySelector(".main-nav:hover")
      );
    };

    const updateMenuSize = () => {
      if (window.innerWidth >= 770) {
        htmlTag.setAttribute("data-menu-size", "sm-hover-active");
      } else {
        htmlTag.setAttribute("data-menu-size", "hidden");
      }
      updateMenuState();
    };

    updateMenuSize();
    window.addEventListener("resize", updateMenuSize);
    const observer = new MutationObserver(updateMenuState);
    observer.observe(htmlTag, { attributes: true });

    const mainNav = document.querySelector(".main-nav");
    const handleHover = () => updateMenuState();
    mainNav?.addEventListener("mouseenter", handleHover);
    mainNav?.addEventListener("mouseleave", handleHover);

    return () => {
      window.removeEventListener("resize", updateMenuSize);
      observer.disconnect();
      mainNav?.removeEventListener("mouseenter", handleHover);
      mainNav?.removeEventListener("mouseleave", handleHover);
    };
  }, []);

  const handleIconClick = () => {
    const htmlElement = document.documentElement;
    const current = htmlElement.getAttribute("data-menu-size");

    if (current === "sm-hover") {
      htmlElement.setAttribute("data-menu-size", "sm-hover-active");
    } else if (current === "sm-hover-active") {
      htmlElement.setAttribute("data-menu-size", "sm-hover");
    }
  };

  const menuConfig = {
    Admin: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: "solar:widget-5-bold-duotone",
        link: "/admin-dashboard",
      },
      ...(email === "edprowise@gmail.com"
        ? [
            {
              id: "admin",
              label: "Admins",
              icon: "solar:users-group-rounded-bold-duotone",
              link: "/admin-dashboard/admins",
            },
          ]
        : []),
      {
        id: "school",
        label: "Schools",
        icon: "solar:users-group-rounded-bold-duotone",
        link: "/admin-dashboard/schools",
      },
      {
        id: "seller",
        label: "Sellers",
        icon: "solar:users-group-rounded-bold-duotone",
        link: "/admin-dashboard/sellers",
      },
      {
        id: "subscriptions",
        label: "Subscriptions",
        icon: "solar:wallet-money-bold",
        link: "/admin-dashboard/subscriptions",
      },

      {
        id: "procurementServices",
        label: "Procurement Services",
        icon: "solar:wallet-money-bold",
        children: [
          {
            label: "Dashboard",
            link: "/admin-dashboard/procurement-services/dashboard",
            icon: "solar:users-group-rounded-bold-duotone",
          },
          {
            label: "Quotes",
            link: "/admin-dashboard/procurement-services/track-quote",
            icon: "solar:users-group-rounded-bold-duotone",
          },
          {
            label: "Track Order & Order History",
            link: "/admin-dashboard/procurement-services/track-order-history",
            icon: "solar:users-group-rounded-bold-duotone",
          },
          {
            label: "Define Goods & Services",
            link: "/admin-dashboard/procurement-services/good-services",
            icon: "solar:users-group-rounded-bold-duotone",
          },
          {
            label: "Bank Details",
            link: "/admin-dashboard/procurement-services/bank-details",
            icon: "solar:users-group-rounded-bold-duotone",
          },
        ],
      },
      {
        id: "payrollModule",
        label: "Payroll Module",
        icon: "solar:wallet-money-bold",
        children: [
          {
            id: "employeeSelfService",
            label: "Employee Self Service",
            icon: "solar:book-bookmark-bold-duotone",
            children: [
              {
                label: "Update Details",
                link: "/admin-dashboard/payroll-module/employee-services/update-details",
              },
              {
                label: "Salary Slip",
                link: "/admin-dashboard/payroll-module/employee-services/salary-slip",
              },
              {
                id: "incomeTax",
                label: "Income Tax",
                // icon: "bx-cog",
                children: [
                  {
                    label: "IT Declaration",
                    link: "/admin-dashboard/payroll-module/employee-services/income-tax/it-declaration",
                  },
                  {
                    label: "Income Tax Computation Sheet",
                    link: "/admin-dashboard/payroll-module/employee-services/income-tax/income-tax-computation-sheet",
                  },
                  {
                    label: "Form 16",
                    link: "/admin-dashboard/payroll-module/employee-services/income-tax/form16",
                  },
                  {
                    label: "Previous Employment Income",
                    link: "/admin-dashboard/payroll-module/employee-services/income-tax/previous-employment-income",
                  },
                ],
              },
              {
                label: "Request for Loan",
                link: "/admin-dashboard/payroll-module/employee-services/request-for-loan",
              },
              {
                label: "My Loan Statement",
                link: "/admin-dashboard/payroll-module/employee-services/loan-summary",
              },

              {
                label: "My Attendance Report",
                link: "/admin-dashboard/payroll-module/employee-services/my-attendance-report",
              },
              {
                label: "Apply for Leave",
                link: "/admin-dashboard/payroll-module/employee-services/apply-for-leave",
              },
              {
                id: "exit",
                label: "Exit",
                // icon: "bx-cog",
                children: [
                  {
                    label: "Employee Resignation",
                    link: "/admin-dashboard/payroll-module/employee-services/exit/employee-resignation-form",
                  },
                  {
                    label: "Exit Interview",
                    link: "/admin-dashboard/payroll-module/employee-services/exit/exit-interview",
                  },
                ],
              },
              {
                label: "Letter & Documents",
                link: "/admin-dashboard/payroll-module/employee-services/letter-documents",
              },
              {
                label: "Awards & Achievement",
                link: "/admin-dashboard/payroll-module/employee-services/award-achievement",
              },
              {
                label: "Promotion Nomination",
                link: "/admin-dashboard/payroll-module/employee-services/promotion-nomination",
              },
            ],
          },
          {
            id: "employer",
            label: "Employer",
            icon: "solar:book-bookmark-bold-duotone",
            children: [
              {
                label: "Employee Registration",
                link: "/admin-dashboard/payroll-module/employer/registration",
              },
              {
                // LWD Details
                label: "Employee Update",
                link: "/admin-dashboard/payroll-module/employer/update-employee-details",
              },
              {
                label: "CTC Update",
                link: "/admin-dashboard/payroll-module/employer/ctc-update",
              },
              {
                label: "Process Payroll",
                link: "/admin-dashboard/payroll-module/employer/payroll-process",
              },

              {
                id: "salaryIncrement",
                label: "Salary Increment",
                // icon: "bx-cog",
                children: [
                  {
                    label: "Bulk Employee Increment",
                    link: "/admin-dashboard/payroll-module/employer/salary-increment/bulk-employee-increment",
                    // icon: "bx-hash",
                  },
                  {
                    label: "Single Employee Increment",
                    link: "/admin-dashboard/payroll-module/employer/salary-increment/single-employee-increment",
                    // icon: "bx-hash",
                  },
                ],
              },

              {
                label: "Generate Appointment",
                link: "/admin-dashboard/payroll-module/employer/generate-appointment-ctc-letter",
              },
              {
                label: "Form 16 (Upload)",
                link: "/admin-dashboard/payroll-module/employer/form-16-list",
              },
              {
                label: "Supporting Submitted for Tax",
                link: "/admin-dashboard/payroll-module/employer/supporting-tax-submitted",
              },
              {
                id: "loanToEmployees",
                label: "Loan To Employees",
                // icon: "bx-cog",
                children: [
                  {
                    label: "Pay Loan",
                    link: "/admin-dashboard/payroll-module/employer/loan-to-employees/pay-loan",
                  },
                  {
                    label: "Loan Statement",
                    link: "/admin-dashboard/payroll-module/employer/loan-to-employees/loan-statement",
                  },
                ],
              },

              {
                label: "Overtime Allowance",
                link: "/admin-dashboard/payroll-module/employer/overtime-allowance",
              },
              {
                label: "Performance Tracking",
                link: "/admin-dashboard/payroll-module/employer/performance-tracking",
              },
              {
                label: "Resignation Approval",
                link: "/admin-dashboard/payroll-module/employer/resignation",
              },
            ],
          },
          {
            id: "adminSetting",
            label: "Admin Setting",
            icon: "solar:book-bookmark-bold-duotone",
            children: [
              {
                label: "Freeze IT Declaration",
                link: "/admin-dashboard/payroll-module/admin-setting/freeze-it-declaration",
              },
              {
                label: "Annual Leave Update",
                link: "/admin-dashboard/payroll-module/admin-setting/annual-leave-update",
              },
              {
                label: "Overtime Allowance Rate",
                link: "/admin-dashboard/payroll-module/admin-setting/overtime-allowance-rate",
              },
              {
                label: "CTC Components",
                link: "/admin-dashboard/payroll-module/admin-setting/ctc-components",
              },
              {
                label: "Grade",
                link: "/admin-dashboard/payroll-module/admin-setting/define-grade",
              },
              {
                label: "Job Designation",
                link: "/admin-dashboard/payroll-module/admin-setting/define-job-designation",
              },
              {
                label: "Category",
                link: "/admin-dashboard/payroll-module/admin-setting/define-category",
              },
              {
                label: "School Details",
                // link: ""
              },
            ],
          },
        ],
      },
      {
        id: "requestDemo",
        label: "Request For Demo",
        icon: "solar:wallet-money-bold",
        link: "/admin-dashboard/request-for-demo",
      },
      {
        id: "contact",
        label: "Enquiry",
        icon: "solar:wallet-money-bold",
        link: "/admin-dashboard/enquiry",
      },
      {
        id: "emailSettings",
        label: "Email Settings",
        icon: "solar:wallet-money-bold",
        children: [
          {
            label: "SMTP Settings",
            link: "/admin-dashboard/email/smtp-setting",
            icon: "solar:users-group-rounded-bold-duotone",
          },
          {
            label: "Marketing",
            link: "/admin-dashboard/email/marketing",
            icon: "solar:book-bookmark-bold-duotone",
          },
        ],
      },
    ],

    School: [
      {
        id: "procurementServices",
        label: "Procurement Services",
        icon: "solar:wallet-money-bold",
        children: [
          {
            label: "Dashboard",
            link: "/school-dashboard/procurement-services/dashboard",
            icon: "solar:widget-3-bold-duotone",
          },
          {
            label: "Quotes",
            link: "/school-dashboard/procurement-services/track-quote",
            icon: "solar:file-text-bold-duotone",
          },
          {
            label: "Track & Order History",
            link: "/school-dashboard/procurement-services/track-order-history",
            icon: "solar:delivery-bold-duotone",
          },
          {
            label: "Pay To EdProwise",
            link: "/school-dashboard/procurement-services/pay-to-edprowise",
            icon: "solar:card-bold-duotone",
          },
        ],
      },
      {
        id: "feesmodule",
        label: "Fees module",
        icon: "solar:file-text-bold",
        children: [
          {
            id: "form",
            label: "Form",
            icon: "bx-receipt",
            children: [
              {
                label: "Registration Form",
                link: "/school-dashboard/fees-module/form/registration",
                icon: "bx-receipt",
              },
              {
                label: "Admission Form",
                link: "/school-dashboard/fees-module/form/admission",
                icon: "solar:users-group-rounded-bold-duotone",
              },
              {
                label: "TC Form",
                link: "/school-dashboard/fees-module/form/trasfer-certificate-list",
                icon: "solar:users-group-rounded-bold-duotone",
              },
              {
                label: "Concession Form",
                link: "/school-dashboard/fees-module/form/concession-table",
                icon: "solar:users-group-rounded-bold-duotone",
              },
            ],
          },
          {
            id: "feesReceipts",
            label: "Fees Receipts",
            icon: "solar:bill-list-bold-duotone",
            children: [
              {
                label: "School Fees",
                link: "/school-dashboard/fees-module/fees-receipts/school-fees",
                icon: "solar:users-group-rounded-bold-duotone",
              },
              {
                label: "Board Registration Fees",
                link: "/school-dashboard/fees-module/fees-receipts/board-registration-fees",
                icon: "solar:users-group-rounded-bold-duotone",
              },
              {
                label: "Board Exam fees",
                link: "/school-dashboard/fees-module/fees-receipts/board-exam-fees",
                icon: "solar:users-group-rounded-bold-duotone",
              },
            ],
          },
          {
            id: "adminSetting",
            label: "Admin Setting",
            icon: "bx-cog",
            children: [
              {
                label: "Prefix Settings",
                icon: "bx-edit",
                children: [
                  {
                    label: "Registration",
                    link: "/school-dashboard/fees-module/admin-setting/prefix-setting/registartion-prefix",
                    icon: "bx-hash",
                  },
                  {
                    label: "Admission",
                    link: "/school-dashboard/fees-module/admin-setting/prefix-setting/admission-prefix",
                    icon: "bx-hash",
                  },
                ],
              },
              {
                label: "Grade",
                icon: "bx-clipboard",
                children: [
                  {
                    label: "Shift",
                    link: "/school-dashboard/fees-module/admin-setting/grade/shifts",
                    icon: "bx-alarm",
                  },
                  {
                    label: "Class & Section",
                    link: "/school-dashboard/fees-module/admin-setting/grade/class-section",
                    icon: "bx-chalkboard",
                  },
                ],
              },
              {
                label: "Fees Structure",
                icon: "bx-collection",
                children: [
                  {
                    label: "Fees Types",
                    link: "/school-dashboard/fees-module/admin-setting/fees-structure/fees-type-list",
                    icon: "bx-list-ul",
                  },
                  {
                    label: "School Fees",
                    link: "/school-dashboard/fees-module/admin-setting/fees-structure/school-fees",
                    icon: "bx-spreadsheet",
                  },
                  {
                    label: "One Time Fees",
                    link: "/school-dashboard/fees-module/admin-setting/fees-structure/one-time-fees",
                    icon: "bx-money-withdraw",
                  },
                  {
                    label: "Fine",
                    link: "/school-dashboard/fees-module/admin-setting/fees-structure/fine",
                    icon: "bx-money",
                  },
                ],
              },
              {
                label: "Board Fees",
                icon: "bx-clipboard",
                children: [
                  {
                    label: "Registartion Fees",
                    link: "/school-dashboard/fees-module/admin-setting/board-fees/registration-fees",
                    icon: "bx-alarm",
                  },
                  {
                    label: "Exam Fees",
                    link: "/school-dashboard/fees-module/admin-setting/board-fees/exam-fees",
                    icon: "bx-chalkboard",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    Seller: [
      {
        id: "procurementServices",
        label: "Procurement Services",
        icon: "solar:wallet-money-bold",
        children: [
          {
            label: "Dashboard",
            link: "/seller-dashboard/procurement-services/dashboard",
            icon: "solar:users-group-rounded-bold-duotone",
          },
          {
            label: "Quote Enquiry",
            link: "/seller-dashboard/procurement-services/track-quote",
            icon: "solar:users-group-rounded-bold-duotone",
          },
          {
            // label: "Track Order & Order History",
            label: "Track & Order History",
            link: "/seller-dashboard/procurement-services/track-order-history",
            icon: "solar:users-group-rounded-bold-duotone",
          },
          {
            label: "Pay To EdProwise",
            link: "/seller-dashboard/procurement-services/pay-to-edprowise",
            icon: "solar:users-group-rounded-bold-duotone",
          },
        ],
      },
    ],
    Guest: [
      { id: "login", label: "Login", icon: "solar:login-bold", link: "/login" },
    ],
  };

  let currentMenu = menuConfig[userRole] || menuConfig.Guest;

  const sidebarTab = localStorage.getItem("sidebartab");
  if (sidebarTab === "ProcurementService") {
    currentMenu = currentMenu.filter(
      (item) => item.id === "procurementServices"
    );
  } else if (sidebarTab === "FeesModule") {
    currentMenu = currentMenu.filter((item) => item.id === "feesmodule");
  }

  const getActivePaths = () => {
    const activePaths = new Set();

    const checkActive = (items) => {
      items.forEach((item) => {
        if (item.link && currentPath.startsWith(item.link)) {
          activePaths.add(item.link);
        }
        if (item.children) {
          checkActive(item.children);
        }
      });
    };

    checkActive(currentMenu);
    return Array.from(activePaths);
  };

  const findDeepestActivePath = () => {
    const activePaths = getActivePaths();
    if (activePaths.length === 0) return null;

    return activePaths.reduce((longest, current) =>
      current.length > longest.length ? current : longest
    );
  };

  const isPathActive = (link) => {
    const deepestPath = findDeepestActivePath();
    return link === deepestPath;
  };

  const hasActiveChild = (items) => {
    const deepestPath = findDeepestActivePath();
    if (!deepestPath) return false;

    return items.some((item) => {
      if (item.link && deepestPath.startsWith(item.link)) {
        return true;
      }
      if (item.children) {
        return hasActiveChild(item.children);
      }
      return false;
    });
  };

  const renderMenuItems = (items, level = 0) =>
    items.map((item) => {
      // Only apply the sidebarTab filtering for School role
      if (
        userRole === "School" &&
        (sidebarTab === "ProcurementService" || sidebarTab === "FeesModule") &&
        level === 0
      ) {
        if (
          (sidebarTab === "ProcurementService" &&
            item.id === "procurementServices" &&
            item.children) ||
          (sidebarTab === "FeesModule" &&
            item.id === "feesmodule" &&
            item.children)
        ) {
          return (
            <React.Fragment key={item.id || item.label}>
              {renderMenuItems(item.children, level + 1)}
            </React.Fragment>
          );
        }
        return null;
      }

      const isActive = item.link ? isPathActive(item.link) : false;
      const hasChildren = item.children && item.children.length > 0;
      const isExpanded = hasChildren && hasActiveChild(item.children);
      const collapseId = `sidebar-${
        item.id || item.label.replace(/\s+/g, "-")
      }`;

      if (hasChildren) {
        return (
          <li className="nav-item" key={item.id || item.label}>
            <a
              className="nav-link "
              href={`#${collapseId}`}
              data-bs-toggle="collapse"
              role="button"
              aria-expanded={isExpanded}
              aria-controls={collapseId}
              style={{
                justifyContent: isCollapsed ? "center" : "flex-start",
                paddingLeft: isCollapsed ? "0" : level > 0 ? "1rem" : "",
                paddingRight: isCollapsed ? "0" : "",
              }}
            >
              <span className="nav-icon">
                <Icon icon={item.icon} />
              </span>
              {!isCollapsed && (
                <>
                  <span className="nav-text">{item.label}</span>
                  <span className="nav-arrow ms-auto">
                    <Icon
                      icon={isExpanded ? "bi:chevron-down" : "bi:chevron-right"}
                      width="12"
                    />
                  </span>
                </>
              )}
            </a>
            <div
              className={`collapse ${isExpanded ? "show" : ""}`}
              id={collapseId}
            >
              <ul className={`nav flex-column ${level > 0 ? "ms-3" : ""}`}>
                {renderMenuItems(item.children, level + 1)}
              </ul>
            </div>
          </li>
        );
      } else {
        return (
          <li className="nav-item" key={item.id || item.label}>
            <Link
              className={`nav-link ${isActive ? "active" : ""}`}
              to={item.link}
              style={{
                justifyContent: isCollapsed ? "center" : "flex-start",
                paddingLeft: isCollapsed ? "0" : level > 0 ? "1rem" : "",
                paddingRight: isCollapsed ? "0" : "",
              }}
            >
              <span className="nav-icon">
                <Icon icon={item.icon} />
              </span>
              {!isCollapsed && (
                <>
                  <span className="nav-text">{item.label}</span>
                  <span style={{ width: "16px" }}></span>
                </>
              )}
            </Link>
          </li>
        );
      }
    });

  return (
    <div className="main-nav nav-radius">
      <div className="logo-box">
        <Link to="/" className="logo-dark">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/EdProwiseFavicon.png`}
            className="logo-sm"
          />
          {!isCollapsed && (
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/EdProwiseLogoWhite.png`}
              className="logo-lg"
              style={{ width: "80%" }}
            />
          )}
        </Link>
        <Link to="/" className="logo-light">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/EdProwiseFavicon.png`}
            className="logo-sm"
          />
          {!isCollapsed && (
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/EdProwiseLogoWhite.png`}
              className="logo-lg"
              style={{ width: "80%" }}
            />
          )}
        </Link>
      </div>

      <button
        type="button"
        className="button-sm-hover"
        aria-label="Show Full Sidebar"
        onClick={handleIconClick}
      >
        <Icon
          icon="solar:double-alt-arrow-right-bold-duotone"
          className="button-sm-hover-icon"
        />
      </button>

      <div className="scrollbar " data-simplebar style={{ margin: "10px" }}>
        <ul className="navbar-nav" id="navbar-nav">
          {renderMenuItems(currentMenu)}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
