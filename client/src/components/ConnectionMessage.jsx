import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import io from "socket.io-client";

function WebSocketStatus() {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const socket = io(process.env.REACT_APP_SERVER_URL, {
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      setIsConnected(true);
      toast.info("WebSocket connected", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      {!isConnected && (
        <div className="bg-red-500 text-white p-2 fixed top-0 left-0 right-0">
          No WebSocket connection... Chat will not work
        </div>
      )}
    </div>
  );
}

export default WebSocketStatus;
