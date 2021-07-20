import React from "react";
import LoadingOverlay from "react-loading-overlay";
// import { HashLoader } from "react-spinners";
import LoadingImageGif from "../../assets/loader.gif";

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
      spinner={
        <img src={LoadingImageGif} alt="loading-gif" height={120} width={120} />
      }
    >
      {props.children}
    </LoadingOverlay>
  </div>
);

export default Loading;
