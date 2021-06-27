import React from "react";
import LoadingOverlay from "react-loading-overlay";
import { HashLoader } from "react-spinners";

const ComponentLoading = (props) => (
  <LoadingOverlay
    active={props.loading}
    className="component-loading"
    spinner={<HashLoader size={90} color="#274B28" />}
  >
    {props.children}
  </LoadingOverlay>
);

export default ComponentLoading;
