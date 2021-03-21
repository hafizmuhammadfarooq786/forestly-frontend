import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Form, Input, notification } from "antd";
import StyledLink from "../components/common/NavLink";
import FormContainer from "./common/FormContainer";
import LoadingButton from "../components/common/LoadingButton";
import { resetPassword } from "../store/app/actions";

const ResetPassword = () => {
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const formRef = useRef();
  const email = window.localStorage.getItem("forgotEmail") || "";

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
    setSubmitting(true);
    if (values) {
      values.email = email;
      delete values.confirmPassword;
      dispatch(resetPassword(values, onFinishSuccess, onFinishFailed));
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
          label="NEW PASSWORD"
          name="password"
          rules={[
            {
              required: true,
              message: "Password is required",
            },
          ]}
          required={false}
        >
          <Input.Password
            style={{
              borderRadius: 5,
              border: "2px solid #274B28",
              color: "#151515",
              fontFamily: "Circular Std",
              boxShadow: "none",
              height: "48px",
            }}
          />
        </Form.Item>
        <Form.Item
          label="CONFIRM PASSWORD"
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: "Confirm Password is required",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  "The two passwords that you entered do not match!"
                );
              },
            }),
          ]}
          required={false}
        >
          <Input.Password
            style={{
              borderRadius: 5,
              border: "2px solid #274B28",
              color: "#151515",
              fontFamily: "Circular Std",
              boxShadow: "none",
              height: "48px",
            }}
          />
        </Form.Item>
        <Form.Item>
          <LoadingButton
            btnClass="btn-lg-black"
            submitting={submitting}
            label="RESET PASSWORD"
          />
          <StyledLink
            to="/login"
            className="btn-sm-yellow"
            style={{ marginTop: "1rem", width: "100%", height: "3rem" }}
          >
            CANCEL
          </StyledLink>
        </Form.Item>
      </Form>
    </FormContainer>
  );
};

export default ResetPassword;
