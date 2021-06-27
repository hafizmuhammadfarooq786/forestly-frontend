import React from "react";
import { Button } from "antd";
import Loader from "react-loader-spinner";

const LoadingFormButton = ({
  label,
  click,
  submitting,
  className,
  status,
  ...rest
}) => (
  <Button
    htmlType="submit"
    disabled={status}
    className={className}
    onClick={click}
    {...rest}
  >
    {submitting ? (
      <Loader type="TailSpin" height={24} color="#ffffff" />
    ) : (
      <h4 style={{ margin: 0 }}>{label}</h4>
    )}
  </Button>
);

export default LoadingFormButton;
