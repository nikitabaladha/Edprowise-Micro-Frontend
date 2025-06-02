import { useEffect } from "react";
import { useNotifications } from "../../../NotificationProviderForEdprowise.jsx";

const DashboardConversions = () => {
  const { notifications, fetchNotifications } = useNotifications();

  console.log("notifications", notifications);

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <>
      <div className="col-xl-4">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h4 className="card-title">Recent Notification</h4>
          </div>
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
                      <div className="simplebar-content">
                        {notifications.length > 0 ? (
                          notifications.map((notification) => (
                            <div
                              key={notification._id}
                              className="form-check form-todo py-2 my-2 ps-3 border-bottom"
                            >
                              <div className="d-flex align-items-center">
                                <div className="avatar-sm me-3 flex-shrink-0">
                                  <span className="avatar-title bg-soft-primary text-primary fs-20 rounded-circle">
                                    <iconify-icon icon="solar:bell-bing-bold-duotone" />
                                  </span>
                                </div>
                                <div className="flex-grow-1">
                                  <label
                                    className="form-check-label"
                                    htmlFor={`notification-${notification._id}`}
                                  >
                                    {notification.message}
                                  </label>
                                  <div className="text-muted small mt-1">
                                    {new Date(
                                      notification.createdAt
                                    ).toLocaleString()}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-3">
                            No notifications found
                          </div>
                        )}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardConversions;
