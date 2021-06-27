import React from "react";
import ArrowLeft from "../../assets/icons/arrow-left.png";
import AlertCircle from "../../assets/icons/alert-circle.png";

const MessageBox = (props) => (
  <div className="container">
    <div className="container_404">
      <img
        src={AlertCircle}
        alt="warning-icon"
        style={{ margin: "0.5em", maxWidth: "8rem" }}
      />
      <p
        style={{
          color: "rgb(1, 1, 1)",
          fontWeight: 700,
          fontSize: 32,
          lineHeight: "120%",
          textTransform: "uppercase",
          marginTop: 24,
        }}
      >
        WARNING
      </p>
      <p
        style={{
          padding: 0,
          margin: "20px 0px",
          color: "rgb(1, 1, 1)",
          fontSize: 20,
          lineHeight: "156%",
        }}
      >
        Your account is awaiting for approval. if this does not get resolved in
        24h please contact us: <br />
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
