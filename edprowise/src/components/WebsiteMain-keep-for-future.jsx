// /* global $ */

// import React, { useEffect, useState } from "react";
// import Navbar from "./Navbar/Navbar";
// import DashboardFooter from "./DashboardFooter/DashboardFooter";
// import { Outlet } from "react-router-dom";

// const WebsiteMain = () => {
//   useEffect(() => {
//     const scriptElements = [];

//     const loadScript = (src) => {
//       return new Promise((resolve, reject) => {
//         const script = document.createElement("script");
//         script.src = src;
//         script.async = true;
//         script.onload = () => {
//           scriptElements.push(script);
//           resolve();
//         };
//         script.onerror = () =>
//           reject(new Error(`Failed to load script: ${src}`));
//         document.body.appendChild(script);
//       });
//     };

//     const loadScripts = async () => {
//       try {
//         await loadScript(
//           `${process.env.PUBLIC_URL}/assets/website-js/jquery.min.js`
//         );
//         await loadScript(
//           `${process.env.PUBLIC_URL}/assets/website-js/jquery.nice-select.min.js`
//         );
//         await loadScript(
//           `${process.env.PUBLIC_URL}/assets/website-js/bootstrap.bundle.min.js`
//         );
//         await loadScript(
//           `${process.env.PUBLIC_URL}/assets/website-js/script.js`
//         );

//         $(document).ready(() => {
//           $(".select").niceSelect();
//         });
//       } catch (error) {
//         console.error(error);
//         console.error("Error loading scripts:", error);
//       }
//     };

//     loadScripts();

//     return () => {
//       // Cleanup scripts on component unmount
//       scriptElements.forEach((script) => {
//         document.body.removeChild(script);
//       });
//     };
//   }, []);

//   const [showBackToTop, setShowBackToTop] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setShowBackToTop(window.scrollY > 500);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <>
//       <div className="font-family-web">
//         <Navbar />
//         <div className="page-wrapper">
//           <Outlet />
//         </div>
//         <DashboardFooter />
//       </div>

//       {/* {showBackToTop && (
//         <button
//           className="back-to-top"
//           onClick={scrollToTop}
//           style={{
//             position: "fixed",
//             bottom: "20px",
//             right: "20px",
//             zIndex: "1000",
//             backgroundColor: "#007bff",
//             color: "white",
//             border: "2px solid blue",
//             borderRadius: "50%",
//             width: "50px",
//             height: "50px",
//             cursor: "pointer",
//             boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             opacity: 0.9,
//           }}
//         >
//           ↑
//         </button>
//       )} */}
//     </>
//   );
// };

// export default WebsiteMain;

import React, { useEffect, useState } from "react";
import Navbar from "./Navbar/Navbar";
import DashboardFooter from "./DashboardFooter/DashboardFooter";
import { Outlet } from "react-router-dom";
/* global $ */

const WebsiteMain = () => {
  useEffect(() => {
    const scriptElements = [];
    const linkElements = [];

    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = () => {
          scriptElements.push(script);
          resolve();
        };
        script.onerror = () =>
          reject(new Error(`Failed to load script: ${src}`));
        document.body.appendChild(script);
      });
    };

    const loadCSS = (href) => {
      return new Promise((resolve) => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        link.onload = () => {
          linkElements.push(link);
          resolve();
        };
        document.head.appendChild(link);
      });
    };

    const loadAssets = async () => {
      try {
        // Load CSS files
        await loadCSS(
          `${process.env.PUBLIC_URL}/assets/website-css/themify-icons.css`
        );
        await loadCSS(
          `${process.env.PUBLIC_URL}/assets/website-css/flaticon.css`
        );
        await loadCSS(
          `${process.env.PUBLIC_URL}/assets/website-css/font-awesome.min.css`
        );
        await loadCSS(
          `${process.env.PUBLIC_URL}/assets/website-css/bootstrap.min.css`
        );
        await loadCSS(
          `${process.env.PUBLIC_URL}/assets/website-css/animate.css`
        );
        await loadCSS(
          `${process.env.PUBLIC_URL}/assets/website-css/owl.carousel.css`
        );
        await loadCSS(
          `${process.env.PUBLIC_URL}/assets/website-css/owl.theme.css`
        );
        await loadCSS(`${process.env.PUBLIC_URL}/assets/website-css/slick.css`);
        await loadCSS(
          `${process.env.PUBLIC_URL}/assets/website-css/slick-theme.css`
        );
        await loadCSS(
          `${process.env.PUBLIC_URL}/assets/website-css/swiper.min.css`
        );
        await loadCSS(
          `${process.env.PUBLIC_URL}/assets/website-css/owl.transitions.css`
        );
        await loadCSS(
          `${process.env.PUBLIC_URL}/assets/website-css/jquery.fancybox.css`
        );
        await loadCSS(
          `${process.env.PUBLIC_URL}/assets/website-css/odometer-theme-default.css`
        );
        await loadCSS(`${process.env.PUBLIC_URL}/assets/sass/style.css`);

        // Load JS files
        await loadScript(
          `${process.env.PUBLIC_URL}/assets/website-js/jquery.min.js`
        );
        await loadScript(
          `${process.env.PUBLIC_URL}/assets/website-js/jquery.nice-select.min.js`
        );
        await loadScript(
          `${process.env.PUBLIC_URL}/assets/website-js/bootstrap.bundle.min.js`
        );
        await loadScript(
          `${process.env.PUBLIC_URL}/assets/website-js/script.js`
        );

        $(document).ready(() => {
          $(".select").niceSelect();
        });
      } catch (error) {
        console.error("Error loading assets:", error);
      }
    };

    loadAssets();

    return () => {
      scriptElements.forEach((script) => {
        document.body.removeChild(script);
      });

      linkElements.forEach((link) => {
        document.head.removeChild(link);
      });
    };
  }, []);

  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="font-family-web">
        <Navbar />
        <div className="page-wrapper">
          <Outlet />
        </div>
        <DashboardFooter />
      </div>
    </>
  );
};

export default WebsiteMain;
