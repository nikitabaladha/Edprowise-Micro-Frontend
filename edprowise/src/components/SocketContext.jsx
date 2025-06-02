// EdProwise_Frontend\edprowise\src\components\SocketContext.js
import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const SocketContext = createContext();

export const SocketProvider = ({ children, userId, userType }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!userId || !userType) return;
    const socketUrl = process.env.REACT_APP_API_URL.replace(/^http/, "ws");
    const newSocket = io(socketUrl, {
      path: "/socket.io",
      transports: ["websocket"],
      query: { userId, userType },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      secure: process.env.NODE_ENV === "production",
    });

    newSocket.on("connect", () => {
      console.log("Socket connected with ID:", newSocket.id);
    });

    // Add this notification listener
    newSocket.on("notification", (data) => {
      console.log("New notification received:", data);
    });

    newSocket.on("connect_error", (err) => {
      console.error("Connection error:", err.message);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [userId, userType]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
export const useSocket = () => useContext(SocketContext);
