import React from "react";
import LoadingImageGif from "../../assets/loader.gif";

const LoadingGif = () => (
  <div
    style={{
      width: "calc(100vw - 320px)",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fffff",
    }}
  >
    <img src={LoadingImageGif} alt="loading-gif" height={140} width={140} />
  </div>
);

export default LoadingGif;
