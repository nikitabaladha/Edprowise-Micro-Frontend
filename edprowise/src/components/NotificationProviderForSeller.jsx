import { createContext, useContext, useState, useCallback } from "react";
import getAPI from "../api/getAPI.jsx";
import putAPI from "../api/putAPI.jsx";

const NotificationContext = createContext();

export const NotificationProvider = ({ children, sellerId }) => {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = useCallback(async () => {
    try {
      const response = await getAPI(`/seller-notifications`, {}, true);

      if (!response.hasError && response.data && response.data.data) {
        setNotifications(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  }, []);

  const markNotificationRead = useCallback(async (notificationId) => {
    try {
      const response = await putAPI(
        `/mark-read-for-seller/${notificationId}`,
        {},
        true
      );

      if (!response.hasError && response.data) {
        setNotifications((prevNotifications) =>
          prevNotifications.map((notification) =>
            notification._id === notificationId
              ? { ...notification, read: true }
              : notification
          )
        );
      }
    } catch (err) {
      console.error("Error marking notification read:", err);
    }
  }, []);

  const contextValue = {
    notifications,
    fetchNotifications,
    markNotificationRead,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
