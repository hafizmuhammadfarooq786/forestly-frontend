import React from "react";
import LoadingImageGif from "../../assets/loader.gif";

const LoadingGif = () => (
  <div
    style={{
      width: "calc(100vw - 272px)",
      height: "calc(100vh - 72px)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fffff",
    }}
  >
    <img src={LoadingImageGif} alt="loading-gif" height={200} width={200} />
  </div>
);

export default LoadingGif;
