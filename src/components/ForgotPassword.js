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
        style={{ width: "75%", textAlign: "center" }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <h1
          style={{
            color: "#274B28",
            marginBottom: 44,
            textTransform: "uppercase",
            fontWeight: 800,
          }}
        >
          Forgot Passowrd
        </h1>
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
              boxShadow: "none",
              height: 48,
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
