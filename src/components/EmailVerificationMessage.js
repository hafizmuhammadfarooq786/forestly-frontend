import React from "react";

const EmailVerificationMessage = () => {
  return (
    <div className="container">
      <div className="container_404">
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
          PLEASE CONFRIM YOUR EMAIL ADDRESS
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
          A verification link has been sent to your email address.Please click
          on the link that has just been sent to your email account to verify
          your email and finish the registeration process.
        </p>
      </div>
    </div>
  );
};

export default EmailVerificationMessage;
