import React from "react";
import { Row, Col } from "antd";
import Logo from "../../assets/logo.png";
import LogoTextual from "../../assets/logo.svg";

const FormContainer = (props) => {
  return (
    <Row style={{ height: "100vh", width: "100vw", background: "#274B28" }}>
      <Col
        span={16}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#274B28",
        }}
      >
        <img src={Logo} alt="forest-logo" style={{ height: 220, width: 220 }} />
        <img src={LogoTextual} alt="forest-logo" style={{ marginTop: 32 }} />
      </Col>
      <Col
        span={8}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#ffffff",
          boxShadow: "0 8px 24px 8px rgb(0 0 0 / 35%)",
        }}
      >
        {props.children}
      </Col>
    </Row>
  );
};

export default FormContainer;
