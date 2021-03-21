import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Form, Input, notification } from "antd";
import StyledLink from "../components/common/NavLink";
import FormContainer from "./common/FormContainer";
import LoadingButton from "../components/common/LoadingButton";
import { forgotPassword } from "../store/app/actions";

const ForgotPassword = () => {
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef();
  const dispatch = useDispatch();

  const onFinishFailed = (error) => {
    setSubmitting(false);
    notification.error({
      message: error,
      duration: 6,
      style: {
        backgroundColor: "#fff",
        color: "#274B28",
      },
    });
  };

  const onFinishSuccess = () => {
    setSubmitting(false);
  };

  const onFinish = async (values) => {
    if (values) {
      setSubmitting(true);
      dispatch(forgotPassword(values, onFinishSuccess, onFinishFailed));
    }
  };

  return (
    <FormContainer>
      <Form
        ref={formRef}
        layout="vertical"
        style={{ width: "100%" }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="EMAIL"
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter valid email address",
            },
          ]}
          required={false}
        >
          <Input
            type="email"
            style={{
              borderRadius: 5,
              border: "2px solid #274B28",
              color: "#151515",
              boxShadow: "none",
              fontFamily: "Circular Std",
              height: "48px",
            }}
          />
        </Form.Item>
        <Form.Item>
          <LoadingButton
            btnClass="btn-lg-black"
            submitting={submitting}
            label="CONFIRM EMAIL"
          />
          <StyledLink
            to="/login"
            className="btn-sm-yellow"
            style={{ marginTop: "1rem", width: "100%", height: "3rem" }}
          >
            BACK
          </StyledLink>
        </Form.Item>
      </Form>
    </FormContainer>
  );
};

export default ForgotPassword;
