import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Form, Input, notification } from "antd";
import StyledLink from "../components/common/NavLink";
import FormContainer from "./common/FormContainer";
import LoadingButton from "../components/common/LoadingButton";
import { login } from "../store/app/actions";

const SignIn = () => {
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef();
  const dispatch = useDispatch();

  const onFinishFailed = (error) => {
    setSubmitting(false);
    notification.error({
      message: error,
      duration: 30,
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
      dispatch(login(values, onFinishSuccess, onFinishFailed));
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
              boxShadow: "none",
              color: "#151515",
              fontFamily: "Circular Std",
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
              fontFamily: "Circular Std",
              height: "48px",
            }}
          />
        </Form.Item>
        <Form.Item>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "24px",
            }}
          >
            <LoadingButton
              btnClass="btn-sm-black"
              submitting={submitting}
              label="SIGN IN"
            />
            <StyledLink to="/register" className="btn-sm-yellow">
              SIGN UP
            </StyledLink>
          </div>
          <StyledLink to="/forgot-password" className="btn-forgot">
            FORGOT PASSWORD?
          </StyledLink>
        </Form.Item>
      </Form>
    </FormContainer>
  );
};

export default SignIn;
