import React from "react";
import ArrowLeft from "../../assets/icons/arrow-left.png";
import AlertCircle from "../../assets/icons/info.png";

const MessageBox = (props) => (
  <div className="container">
    <div className="container_404">
      <img
        src={AlertCircle}
        alt="warning-icon"
        style={{ margin: "0.5em", maxWidth: "8rem" }}
      />
      <p className="black-title">WARNING</p>
      <p className="support-description">
        Your account is awaiting for approval. if this does not get resolved in
        24h please contact us:
        <span>
          <a
            href="mailto:email_address@domain.com"
            target="_blank"
            rel="noreferrer"
          >
            email_address@domain.com
          </a>
        </span>
      </p>
      <button
        type="button"
        onClick={() => props.history.push("/login")}
        className="btn-back"
      >
        <img src={ArrowLeft} alt="back-arrow" style={{ margin: "0.5em" }} />
        Back
      </button>
    </div>
  </div>
);

export default MessageBox;
