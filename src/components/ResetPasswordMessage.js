import React from "react";

const ResetPasswordMessage = () => {
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
          Password Recovery Email Sent
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
          A message has been sent to your email address with instructions to
          reset your password.
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordMessage;
