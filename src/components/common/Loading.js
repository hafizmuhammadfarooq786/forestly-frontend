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
      background: "#274B28",
    }}
  >
    <LoadingOverlay
      active={props.active}
      className="loader"
      spinner={<HashLoader size={90} color="#fff" />}
    >
      {props.children}
    </LoadingOverlay>
  </div>
);

export default Loading;
