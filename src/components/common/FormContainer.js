import React from "react";
import { Row, Col, Card } from "antd";
import { isMobileHook } from "./Responsive";

const FormContainer = (props) => {
  const isMobile = isMobileHook();

  return (
    <Row className="signing-form">
      <Col
        style={{
          width: isMobile ? "96%" : "520px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card className="card">{props.children}</Card>
      </Col>
    </Row>
  );
};

export default FormContainer;
