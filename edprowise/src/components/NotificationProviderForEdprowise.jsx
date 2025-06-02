// import {
//   createContext,
//   useContext,
//   useState,
//   useCallback,
//   useEffect,
// } from "react";
// import getAPI from "../api/getAPI";
// import putAPI from "../api/putAPI";
// import { useSocket } from "./SocketContext";

// const NotificationContext = createContext();

// export const NotificationProviderForEdprowise = ({ children, edprowiseId }) => {
//   const [notifications, setNotifications] = useState([]);
//   const socket = useSocket();

//   useEffect(() => {
//     if (!socket) return;

//     const handleNewNotification = (newNotification) => {
//       setNotifications((prev) => [newNotification, ...prev]);
//     };

//     socket.on("notification", handleNewNotification);

//     return () => {
//       socket.off("notification", handleNewNotification);
//     };
//   }, [socket]);

//   const fetchNotifications = useCallback(async () => {
//     try {
//       const response = await getAPI(`/edprowise-notifications`, {}, true);

//       if (!response.hasError && response.data && response.data.data) {
//         setNotifications(response.data.data);
//       }
//     } catch (err) {
//       console.error("Error fetching notifications:", err);
//     }
//   }, []);

//   const markNotificationRead = useCallback(async (notificationId) => {
//     try {
//       const response = await putAPI(
//         `/mark-read-for-edprowise/${notificationId}`,
//         {},
//         true
//       );

//       if (!response.hasError && response.data) {
//         setNotifications((prevNotifications) =>
//           prevNotifications.map((notification) =>
//             notification._id === notificationId
//               ? { ...notification, read: true }
//               : notification
//           )
//         );
//       }
//     } catch (err) {
//       console.error("Error marking notification read:", err);
//     }
//   }, []);

//   const contextValue = {
//     notifications,
//     fetchNotifications,
//     markNotificationRead,
//   };

//   return (
//     <NotificationContext.Provider value={contextValue}>
//       {children}
//     </NotificationContext.Provider>
//   );
// };

// export const useNotifications = () => useContext(NotificationContext);

// In NotificationProviderForEdprowise.js
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import getAPI from "../api/getAPI.jsx";
import putAPI from "../api/putAPI.jsx";
import { useSocket } from "./SocketContext.jsx";

const NotificationContext = createContext();

export const NotificationProviderForEdprowise = ({ children, edprowiseId }) => {
  const [notifications, setNotifications] = useState([]);
  const socket = useSocket();

  // Add this useEffect to listen for new notifications
  useEffect(() => {
    if (!socket) {
      console.log("Socket not initialized yet");
      return;
    }

    console.log("Setting up notification listener...");

    const handleNewNotification = (newNotification) => {
      console.log("New notification received:", newNotification);
      setNotifications((prev) => {
        // Check if notification already exists to avoid duplicates
        const exists = prev.some((n) => n._id === newNotification._id);
        return exists ? prev : [newNotification, ...prev];
      });
    };

    socket.on("notification", handleNewNotification);
    socket.on("connect", () => {
      console.log("Socket connected, ready to receive notifications");
    });

    return () => {
      socket.off("notification", handleNewNotification);
      socket.off("connect");
    };
  }, [socket]);

  const fetchNotifications = useCallback(async () => {
    try {
      const response = await getAPI(`/edprowise-notifications`, {}, true);
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
        `/mark-read-for-edprowise/${notificationId}`,
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
