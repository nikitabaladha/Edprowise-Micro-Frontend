// EdProwise_Frontend\edprowise\src\components\NotificationProviderForSchool.js
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

export const NotificationProviderForSchool = ({ children, schoolId }) => {
  const [notifications, setNotifications] = useState([]);
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    const handleNewNotification = (newNotification) => {
      console.log("New real-time notification:", newNotification);
      setNotifications((prev) => {
        if (typeof window !== "undefined" && window.Notification) {
          new Notification(newNotification.title, {
            body: newNotification.message,
          });
        }
        return [newNotification, ...prev];
      });
    };

    socket.on("notification", handleNewNotification);

    return () => {
      socket.off("notification", handleNewNotification);
    };
  }, [socket]);

  const fetchNotifications = useCallback(async () => {
    try {
      const response = await getAPI(`/school-notifications`, {}, true);

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
        `/mark-read-for-school/${notificationId}`,
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

// EdProwise_Frontend\edprowise\src\components\NotificationProviderForSchool.js

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

// export const NotificationProviderForSchool = ({ children, schoolId }) => {
//   debugger;
//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const socket = useSocket();

//   useEffect(() => {
//     // Request notification permission when component mounts
//     if (typeof window !== "undefined" && window.Notification) {
//       Notification.requestPermission().then((permission) => {
//         console.log("Notification permission:", permission);
//       });
//     }
//   }, []);

//   useEffect(() => {
//     if (!socket) return;

//     const handleNewNotification = (newNotification) => {
//       console.log("New real-time notification:", newNotification);
//       setNotifications((prev) => {
//         const updatedNotifications = [newNotification, ...prev];
//         // Update unread count (add 1 since it's a new notification)
//         setUnreadCount((count) => count + 1);
//         return updatedNotifications;
//       });

//       // Show browser notification if permission is granted
//       if (
//         typeof window !== "undefined" &&
//         window.Notification &&
//         Notification.permission === "granted"
//       ) {
//         new Notification(newNotification.title, {
//           body: newNotification.message,
//         });
//       }
//     };

//     socket.on("notification", handleNewNotification);

//     return () => {
//       socket.off("notification", handleNewNotification);
//     };
//   }, [socket]);

//   const fetchNotifications = useCallback(async () => {
//     try {
//       const response = await getAPI(`/school-notifications`, {}, true);

//       if (!response.hasError && response.data && response.data.data) {
//         setNotifications(response.data.data);

//         const unread = response.data.data.filter((n) => !n.read).length;
//         setUnreadCount(unread);
//       }
//     } catch (err) {
//       console.error("Error fetching notifications:", err);
//     }
//   }, []);

//   const markNotificationRead = useCallback(async (notificationId) => {
//     try {
//       const response = await putAPI(
//         `/mark-read-for-school/${notificationId}`,
//         {},
//         true
//       );

//       if (!response.hasError && response.data) {
//         setNotifications((prevNotifications) => {
//           const updated = prevNotifications.map((notification) =>
//             notification._id === notificationId
//               ? { ...notification, read: true }
//               : notification
//           );
//           // Update unread count (subtract 1 since we marked one as read)
//           setUnreadCount((count) => count - 1);
//           return updated;
//         });
//       }
//     } catch (err) {
//       console.error("Error marking notification read:", err);
//     }
//   }, []);
//   const contextValue = {
//     notifications,
//     unreadCount,
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
