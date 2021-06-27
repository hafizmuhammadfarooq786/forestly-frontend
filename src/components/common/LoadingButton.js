import React from "react";
import { Button } from "antd";
import Loader from "react-loader-spinner";

const LoadingButton = ({ label, btnClass, submitting, status }) => (
  <Button className={btnClass} htmlType="submit" disabled={status}>
    {submitting ? (
      <Loader type="TailSpin" height={24} color="#ffffff" />
    ) : (
      label
    )}
  </Button>
);

export default LoadingButton;
