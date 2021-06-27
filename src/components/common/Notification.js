import React, { useEffect } from "react";
import TickIcon from "../../assets/icons/done.png";
import AlertIcon from "../../assets/icons/alert.png";

const Notification = ({ open, onClose, type, message, timeout }) => {
  useEffect(() => {
    if (open && timeout > 0) {
      setTimeout(onClose, timeout);
    }
  }, [open]);

  return (
    open && (
      <div
        className={type}
        style={{
          display: "flex",
          flexDirection: "row",
          height: "60px",
          alignItems: "center",
          position: "fixed",
          top: "0px",
          width: "100%",
          zIndex: 1000000,
          justifyContent: "center",
        }}
      >
        <img
          src={type === "success-toast" ? TickIcon : AlertIcon}
          alt="notification-icon"
          style={{
            height: type === "success-toast" ? null : "24px",
            width: type === "success-toast" ? null : "32px",
          }}
        />
        <p
          style={{
            textAlign: "center",
            fontSize: "16px",
            lineHeight: "20px",
            color: "#ffffff",
            margin: "0px 24px",
          }}
        >
          {message}
        </p>
      </div>
    )
  );
};

export default Notification;
