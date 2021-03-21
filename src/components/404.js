import React from "react";
import ArrowLeft from "../assets/icons/arrow-left.png";
import AlertCircle from "../assets/icons/info.png";
import { history } from "../index";

const PageNotFound = () => (
  <div className="container">
    <div className="container_404">
      <img
        src={AlertCircle}
        alt="warning-icon"
        style={{ margin: "0.5em", maxWidth: "8rem" }}
      />
      <p className="black-title">WRONG PLACE</p>
      <p className="error-description">
        Not sure how you got here but this place doesn&apos;t exist
      </p>
      <button
        type="button"
        onClick={() => history.push("/admin/dashboard")}
        className="btn-back"
      >
        <img src={ArrowLeft} alt="back-arrow" style={{ margin: "0.5em" }} />
        Back
      </button>
    </div>
  </div>
);
export default PageNotFound;
