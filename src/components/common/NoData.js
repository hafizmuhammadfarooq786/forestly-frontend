import React from "react";
import { Button } from "antd";

const NoData = ({ source }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        margin: "auto",
        width: "100%",
        maxWidth: 576,
        textAlign: "center",
        marginTop: 80,
      }}
    >
      <img src={source.imgSrc} alt="no-data-illustration" width="" height="" />
      <div style={{ marginTop: 32 }}>
        <h1 style={{ color: "#274B28" }}>{source.title}</h1>
        <p style={{ color: "#9E9E9E", textAlign: "center" }}>
          {source.message}
        </p>
        <Button
          className="green-button"
          onClick={() => console.log("called from")}
        >
          {source.buttonText}
        </Button>
      </div>
    </div>
  );
};

export default NoData;
