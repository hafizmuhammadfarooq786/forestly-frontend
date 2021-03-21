import React from "react";
import LoadingOverlay from "react-loading-overlay";

const Loading = () => (
  <div
    style={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background: "#274B2870",
    }}
  >
    <LoadingOverlay active className="loader" spinner text="Loading..." />
  </div>
);

export default Loading;
