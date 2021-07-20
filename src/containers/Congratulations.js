import React, { useState, useEffect } from "react";
import { Button } from "antd";
import LoadingImageGif from "../assets/loader.gif";
import CongratsIllustration from "../assets/illustration/congrats-illustration.png";
import { history } from "../index";

const Congratulations = () => {
  const [pageLoading, setPageLoading] = useState(false);

  const finishLoading = () => {
    setPageLoading(false);
  };
  const stopPageLoading = () => {
    setTimeout(finishLoading, 1000);
  };

  useEffect(() => {
    setPageLoading(true);
    stopPageLoading();
  }, []);

  return pageLoading ? (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fffff",
      }}
    >
      <img src={LoadingImageGif} alt="loading-gif" height={120} width={120} />
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        height: "100%",
        width: "100%",
        textAlign: "center",
        margin: "auto",
      }}
    >
      <div
        style={{
          maxHeight: 760,
          minHeight: 625,
          maxWidth: 992,
          background: "#ffffff",
          borderRadius: 12,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 32,
        }}
      >
        <img
          src={CongratsIllustration}
          alt="congrats-illustration"
          width={220}
          height={164}
        />
        <div style={{ marginTop: 32 }}>
          <h1 style={{ color: "#274B28" }}>Congratulations</h1>
          <p
            style={{ color: "#9E9E9E", textAlign: "center", margin: "24px 0" }}
          >
            You have successfully purchased 3 forest units and have made a
            positive impact on the world
          </p>
          <Button
            className="green-button"
            onClick={() => {
              window.localStorage.removeItem("submit1");
              window.localStorage.removeItem("submit2");
              window.localStorage.removeItem("submit3");
              window.localStorage.removeItem("patch-name");
              window.localStorage.removeItem("editTab");
              window.localStorage.removeItem("gift");
              history.push("/dashboard/patches");
            }}
          >
            See your forest units
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Congratulations;
