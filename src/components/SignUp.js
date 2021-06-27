import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Form, Input, notification } from "antd";
import StyledLink from "../components/common/NavLink";
import LoadingButton from "../components/common/LoadingButton";
import FormContainer from "./common/FormContainer";
import { signup } from "../store/app/actions";

const SignUp = () => {
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const formRef = useRef();

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
      delete values.confirmPassword;
      dispatch(signup(values, onFinishSuccess, onFinishFailed));
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
          Sign Up
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
              color: "#151515",
              boxShadow: "none",
              height: "48px",
            }}
          />
        </Form.Item>
        <Form.Item
          label="PASSWORD"
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
              boxShadow: "none",
              height: "48px",
            }}
          />
        </Form.Item>
        <Form.Item>
          <div
            style={{
              marginTop: "24px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <LoadingButton
              btnClass="btn-sm-black"
              submitting={submitting}
              label="SIGN UP"
            />
            <StyledLink to="/login" className="btn-sm-yellow">
              SIGN IN
            </StyledLink>
          </div>
        </Form.Item>
      </Form>
    </FormContainer>
  );
};

export default SignUp;
