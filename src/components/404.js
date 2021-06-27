import React from "react";
import ArrowLeft from "../assets/icons/arrow-left.png";
import AlertCircle from "../assets/icons/alert-circle.png";
import { history } from "../index";

const PageNotFound = () => (
  <div className="container">
    <div className="container_404">
      <img
        src={AlertCircle}
        alt="warning-icon"
        style={{ margin: "0.5em", maxWidth: "8rem" }}
      />
      <h1
        style={{
          color: "rgb(1, 1, 1)",
          fontWeight: 700,
          fontSize: 32,
          lineHeight: "120%",
          textTransform: "uppercase",
          marginTop: 24,
        }}
      >
        WRONG PLACE
      </h1>
      <p
        style={{
          padding: 0,
          margin: "20px 0px",
          color: "rgb(1, 1, 1)",
          fontSize: 20,
          lineHeight: "156%",
        }}
      >
        Not sure how you got here but this place doesn&apos;t exist
      </p>
      <button
        type="button"
        onClick={() => history.push("/dashboard/home")}
        className="btn-back"
      >
        <img src={ArrowLeft} alt="back-arrow" style={{ margin: "0.5em" }} />
        Back
      </button>
    </div>
  </div>
);
export default PageNotFound;
