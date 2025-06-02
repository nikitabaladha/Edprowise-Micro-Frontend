import React from "react";

import { useNotifications } from "../../../NotificationProviderForEdprowise.jsx";
// insted of this dummy notification i want to show notification coming from backend

const notifications = [
  { label: "Review system logs for any reported errors", checked: false },
  { label: "Conduct user testing to identify potential bugs", checked: false },
  { label: "Gather feedback from stakeholders", checked: false },
  { label: "Review system logs for any reported errors", checked: false },
  { label: "Conduct user testing to identify potential bugs", checked: false },
  { label: "Gather feedback from stakeholders", checked: false },
  { label: "Review system logs for any reported errors", checked: false },
  { label: "Conduct user testing to identify potential bugs", checked: false },
  { label: "Gather feedback from stakeholders", checked: false },
  { label: "Review system logs for any reported errors", checked: false },
  { label: "Conduct user testing to identify potential bugs", checked: false },
  { label: "Gather feedback from stakeholders", checked: false },
];

const DashboardConversions = () => {
  return (
    <>
      <div className="col-xl-4">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h4 className="card-title">Recent Notification</h4>
          </div>{" "}
          {/* end card-header*/}
          <div className="card-body p-0 pb-3">
            <div
              className="p-3"
              data-simplebar="init"
              style={{ maxHeight: 386 }}
            >
              <div className="simplebar-wrapper" style={{ margin: "-24px" }}>
                <div className="simplebar-height-auto-observer-wrapper">
                  <div className="simplebar-height-auto-observer" />
                </div>
                <div className="simplebar-mask">
                  <div
                    className="simplebar-offset"
                    style={{ right: 0, bottom: 0 }}
                  >
                    <div
                      className="simplebar-content-wrapper"
                      tabIndex={0}
                      role="region"
                      aria-label="scrollable content"
                      style={{ height: "auto", overflow: "hidden scroll" }}
                    >
                      <div
                        className="simplebar-content"
                        style={{ padding: 24 }}
                      >
                        {notifications.map((notification, index) => (
                          <div
                            key={index}
                            className="form-check form-todo py-1 my-2 ps-4"
                          >
                            <input
                              type="checkbox"
                              className="form-check-input rounded-circle mt-0 fs-18"
                              defaultChecked={notification.checked}
                              id={`customCheck${index + 1}`}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`customCheck${index + 1}`}
                            >
                              {notification.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="simplebar-placeholder"
                  style={{ width: "auto", height: 573 }}
                />
              </div>
              <div
                className="simplebar-track simplebar-horizontal"
                style={{ visibility: "hidden" }}
              >
                <div
                  className="simplebar-scrollbar"
                  style={{
                    width: 0,
                    display: "none",
                    transform: "translate3d(0px, 0px, 0px)",
                  }}
                />
              </div>
              <div
                className="simplebar-track simplebar-vertical"
                style={{ visibility: "visible" }}
              >
                <div
                  className="simplebar-scrollbar"
                  style={{
                    height: 260,
                    transform: "translate3d(0px, 0px, 0px)",
                    display: "block",
                  }}
                />
              </div>
            </div>
          </div>{" "}
          {/* end card body */}
        </div>{" "}
        {/* end card*/}
      </div>
    </>
  );
};

export default DashboardConversions;

// import { useEffect } from "react";
// import { useNotifications } from "../../../NotificationProviderForEdprowise.js";

// const DashboardConversions = () => {
//   const { notifications, fetchNotifications } = useNotifications();

//   console.log("notifications", notifications);

//   useEffect(() => {
//     fetchNotifications();
//   }, []);

//   return (
//     <>
// <div className="col-xl-4">
//   <div className="card">
//     <div className="card-header d-flex justify-content-between align-items-center">
//       <h4 className="card-title">Recent Notification</h4>
//     </div>
//     <div className="card-body p-0 pb-3">
//       <div
//         className="p-3"
//         data-simplebar="init"
//         style={{ maxHeight: 386 }}
//       >
//         <div className="simplebar-wrapper" style={{ margin: "-24px" }}>
//           <div className="simplebar-height-auto-observer-wrapper">
//             <div className="simplebar-height-auto-observer" />
//           </div>
//           <div className="simplebar-mask">
//             <div
//               className="simplebar-offset"
//               style={{ right: 0, bottom: 0 }}
//             >
//               <div
//                 className="simplebar-content-wrapper"
//                 tabIndex={0}
//                 role="region"
//                 aria-label="scrollable content"
//                 style={{ height: "auto", overflow: "hidden scroll" }}
//               >
//                 <div
//                   className="simplebar-content"
//                   style={{ padding: 24 }}
//                 >
//                   {notifications.length > 0 ? (
//                     notifications.map((notification) => (
//                       <div
//                         key={notification._id}
//                         className="form-check form-todo py-1 my-2 ps-4"
//                       >
//                         <input
//                           type="checkbox"
//                           className="form-check-input rounded-circle mt-0 fs-18"
//                           defaultChecked={false}
//                           id={`notification-${notification._id}`}
//                         />
//                         <label
//                           className="form-check-label"
//                           htmlFor={`notification-${notification._id}`}
//                         >
//                           {notification.message}
//                         </label>
//                         <div className="text-muted small mt-1">
//                           {new Date(
//                             notification.createdAt
//                           ).toLocaleString()}
//                         </div>
//                       </div>
//                     ))
//                   ) : (
//                     <div className="text-center py-3">
//                       No notifications found
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div
//             className="simplebar-placeholder"
//             style={{ width: "auto", height: 573 }}
//           />
//         </div>
//         <div
//           className="simplebar-track simplebar-horizontal"
//           style={{ visibility: "hidden" }}
//         >
//           <div
//             className="simplebar-scrollbar"
//             style={{
//               width: 0,
//               display: "none",
//               transform: "translate3d(0px, 0px, 0px)",
//             }}
//           />
//         </div>
//         <div
//           className="simplebar-track simplebar-vertical"
//           style={{ visibility: "visible" }}
//         >
//           <div
//             className="simplebar-scrollbar"
//             style={{
//               height: 260,
//               transform: "translate3d(0px, 0px, 0px)",
//               display: "block",
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
//     </>
//   );
// };

// export default DashboardConversions;
