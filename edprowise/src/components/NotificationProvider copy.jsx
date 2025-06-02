// // EdProwise_Frontend\edprowise\src\components\NotificationProvider.js

// import { createContext, useContext, useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import getAPI from "../api/getAPI";

// const NotificationContext = createContext();

// export const NotificationProvider = ({ children, sellerId }) => {
//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     if (sellerId) {
//       fetchNotifications();

//       const newSocket = io(process.env.REACT_APP_API_URL, {
//         transports: ["websocket", "polling"],
//         reconnection: true,
//         reconnectionAttempts: 5,
//         reconnectionDelay: 1000,
//         withCredentials: true,
//       });

//       // Join the seller's room immediately after connection
//       newSocket.on("connect", () => {
//         newSocket.emit("join-seller-room", sellerId);
//         console.log("Socket connected and joined room:", sellerId);
//       });

//       newSocket.on("notification", (notification) => {
//         console.log("Received notification:", notification);
//         setNotifications((prev) => [notification, ...prev]);
//         setUnreadCount((prev) => prev + 1);
//       });

//       newSocket.on("connect_error", (err) => {
//         console.error("Socket connection error:", err);
//       });

//       setSocket(newSocket);

//       return () => {
//         newSocket.disconnect();
//       };
//     }
//   }, [sellerId]);

//   const fetchNotifications = async () => {
//     try {
//       const response = await getAPI(`/seller-notifications`, {}, true);

//       if (!response.hasError && response.data && response.data.data) {
//         setNotifications(response.data.data);
//       } else {
//         console.error("Invalid response format or error in response");
//       }
//     } catch (err) {
//       console.error("Error fetching Seller data:", err);
//     }
//   };

//   const markAsRead = async (notificationId) => {
//     try {
//       await getAPI.patch(`/notifications-read/${notificationId}`, {}, true);
//       setNotifications((prev) =>
//         prev.map((n) => (n._id === notificationId ? { ...n, read: true } : n))
//       );
//       setUnreadCount((prev) => prev - 1);
//     } catch (error) {
//       console.error("Error marking notification as read:", error);
//     }
//   };

//   return (
//     <NotificationContext.Provider
//       value={{ notifications, unreadCount, fetchNotifications, markAsRead }}
//     >
//       {children}
//     </NotificationContext.Provider>
//   );
// };

// export const useNotifications = () => useContext(NotificationContext);

// EdProwise_Frontend\edprowise\src\components\NotificationProvider.js

// import { createContext, useContext, useEffect, useState } from "react";
// import { useCallback } from "react";
// import { io } from "socket.io-client";
// import getAPI from "../api/getAPI";

// const NotificationContext = createContext();

// export const NotificationProvider = ({ children, sellerId }) => {
//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [socket, setSocket] = useState(null);

//   // Calculate initial unread count
//   const calculateUnreadCount = (notifs) => {
//     return notifs.filter((notification) => !notification.read).length;
//   };

//   const fetchNotifications = useCallback(async () => {
//     try {
//       const response = await getAPI(`/seller-notifications`, {}, true);

//       if (!response.hasError && response.data && response.data.data) {
//         setNotifications(response.data.data);
//         setUnreadCount(calculateUnreadCount(response.data.data));
//       } else {
//         console.error("Invalid response format or error in response");
//       }
//     } catch (err) {
//       console.error("Error fetching notifications:", err);
//     }
//   }, []);

//   const markAsRead = async (notificationId) => {
//     try {
//       await getAPI.patch(`/notifications-read/${notificationId}`, {}, true);
//       setNotifications((prev) =>
//         prev.map((n) => (n._id === notificationId ? { ...n, read: true } : n))
//       );
//       // Recalculate unread count from updated notifications
//       setUnreadCount((prev) => prev - 1);
//     } catch (error) {
//       console.error("Error marking notification as read:", error);
//     }
//   };

//   // Add this new function for marking all as read
//   const markAllAsRead = async () => {
//     try {
//       await getAPI.patch("/notifications/mark-all-read", {}, true);
//       setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
//       setUnreadCount(0);
//     } catch (error) {
//       console.error("Error marking all as read:", error);
//     }
//   };

//   // Update the context provider value
//   return (
//     <NotificationContext.Provider
//       value={{
//         notifications,
//         unreadCount,
//         fetchNotifications,
//         markAsRead,
//         markAllAsRead, // Add this to context
//       }}
//     >
//       {children}
//     </NotificationContext.Provider>
//   );
// };

// export const useNotifications = () => useContext(NotificationContext);

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { io } from "socket.io-client";
import getAPI from "../api/getAPI.jsx";
import putAPI from "../api/putAPI.jsx";

const NotificationContext = createContext();

export const NotificationProvider = ({ children, sellerId }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [socket, setSocket] = useState(null);

  const calculateUnreadCount = (notifs) => {
    return notifs.filter((notification) => !notification.read).length;
  };

  const fetchNotifications = useCallback(async () => {
    try {
      const response = await getAPI(`/seller-notifications`, {}, true);

      if (!response.hasError && response.data && response.data.data) {
        setNotifications(response.data.data);

        console.log("Notifications", response.data.data);

        setUnreadCount(calculateUnreadCount(response.data.data));
      }
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  }, []);

  const markAsRead = useCallback(async (notificationId) => {
    try {
      const response = await putAPI(
        `/notifications-read/${notificationId}`,
        {},
        true
      );

      if (!response.hasError) {
        setNotifications((prev) =>
          prev.map((n) => (n._id === notificationId ? { ...n, read: true } : n))
        );
        setUnreadCount((prev) => prev - 1);

        fetchNotifications();
      } else {
        console.error("Failed to mark all as read:", response.message);
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  }, []);

  useEffect(() => {
    if (sellerId) {
      fetchNotifications();

      const newSocket = io(process.env.REACT_APP_API_URL, {
        transports: ["websocket", "polling"],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        withCredentials: true,
      });

      newSocket.on("connect", () => {
        newSocket.emit("join-seller-room", sellerId);
      });

      newSocket.on("notification", (notification) => {
        setNotifications((prev) => [notification, ...prev]);
        setUnreadCount((prev) => prev + 1);
      });

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    }
  }, [sellerId, fetchNotifications]);

  const contextValue = {
    notifications,
    unreadCount,
    fetchNotifications,
    markAsRead,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);

// ========================
// // EdProwise_Frontend\edprowise\src\components\NotificationProvider.js

// import { createContext, useContext, useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import getAPI from "../api/getAPI";

// const NotificationContext = createContext();

// export const NotificationProvider = ({ children, sellerId }) => {
//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     if (sellerId) {
//       fetchNotifications();

//       const newSocket = io(process.env.REACT_APP_API_URL, {
//         transports: ["websocket", "polling"],
//         reconnection: true,
//         reconnectionAttempts: 5,
//         reconnectionDelay: 1000,
//         withCredentials: true,
//       });

//       // Join the seller's room immediately after connection
//       newSocket.on("connect", () => {
//         newSocket.emit("join-seller-room", sellerId);
//         console.log("Socket connected and joined room:", sellerId);
//       });

//       newSocket.on("notification", (notification) => {
//         console.log("Received notification:", notification);
//         setNotifications((prev) => [notification, ...prev]);
//         setUnreadCount((prev) => prev + 1);
//       });

//       newSocket.on("connect_error", (err) => {
//         console.error("Socket connection error:", err);
//       });

//       setSocket(newSocket);

//       return () => {
//         newSocket.disconnect();
//       };
//     }
//   }, [sellerId]);

//   const fetchNotifications = async () => {
//     try {
//       const response = await getAPI(`/seller-notifications`, {}, true);

//       if (!response.hasError && response.data && response.data.data) {
//         setNotifications(response.data.data);
//       } else {
//         console.error("Invalid response format or error in response");
//       }
//     } catch (err) {
//       console.error("Error fetching Seller data:", err);
//     }
//   };

//   const markAsRead = async (notificationId) => {
//     try {
//       await getAPI.patch(`/notifications-read/${notificationId}`, {}, true);
//       setNotifications((prev) =>
//         prev.map((n) => (n._id === notificationId ? { ...n, read: true } : n))
//       );
//       setUnreadCount((prev) => prev - 1);
//     } catch (error) {
//       console.error("Error marking notification as read:", error);
//     }
//   };

//   return (
//     <NotificationContext.Provider
//       value={{ notifications, unreadCount, fetchNotifications, markAsRead }}
//     >
//       {children}
//     </NotificationContext.Provider>
//   );
// };

// export const useNotifications = () => useContext(NotificationContext);

// EdProwise_Frontend\edprowise\src\components\NotificationProvider.js

// import { createContext, useContext, useEffect, useState } from "react";
// import { useCallback } from "react";
// import { io } from "socket.io-client";
// import getAPI from "../api/getAPI";

// const NotificationContext = createContext();

// export const NotificationProvider = ({ children, sellerId }) => {
//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [socket, setSocket] = useState(null);

//   // Calculate initial unread count
//   const calculateUnreadCount = (notifs) => {
//     return notifs.filter((notification) => !notification.read).length;
//   };

//   const fetchNotifications = useCallback(async () => {
//     try {
//       const response = await getAPI(`/seller-notifications`, {}, true);

//       if (!response.hasError && response.data && response.data.data) {
//         setNotifications(response.data.data);
//         setUnreadCount(calculateUnreadCount(response.data.data));
//       } else {
//         console.error("Invalid response format or error in response");
//       }
//     } catch (err) {
//       console.error("Error fetching notifications:", err);
//     }
//   }, []);

//   const markAsRead = async (notificationId) => {
//     try {
//       await getAPI.patch(`/notifications-read/${notificationId}`, {}, true);
//       setNotifications((prev) =>
//         prev.map((n) => (n._id === notificationId ? { ...n, read: true } : n))
//       );
//       // Recalculate unread count from updated notifications
//       setUnreadCount((prev) => prev - 1);
//     } catch (error) {
//       console.error("Error marking notification as read:", error);
//     }
//   };

//   // Add this new function for marking all as read
//   const markAllAsRead = async () => {
//     try {
//       await getAPI.patch("/notifications/mark-all-read", {}, true);
//       setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
//       setUnreadCount(0);
//     } catch (error) {
//       console.error("Error marking all as read:", error);
//     }
//   };

//   // Update the context provider value
//   return (
//     <NotificationContext.Provider
//       value={{
//         notifications,
//         unreadCount,
//         fetchNotifications,
//         markAsRead,
//         markAllAsRead, // Add this to context
//       }}
//     >
//       {children}
//     </NotificationContext.Provider>
//   );
// };

// export const useNotifications = () => useContext(NotificationContext);
