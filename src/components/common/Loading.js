import React from "react";
import LoadingOverlay from "react-loading-overlay";
import { HashLoader } from "react-spinners";

const Loading = (props) => (
  <div
    style={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background: "#fffff",
    }}
  >
    <LoadingOverlay
      active
      className="loader"
      spinner={<HashLoader size={90} color="#274B28" />}
    >
      {props.children}
    </LoadingOverlay>
  </div>
);

export default Loading;
