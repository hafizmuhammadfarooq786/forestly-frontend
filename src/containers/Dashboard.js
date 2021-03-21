import React from "react";
import { useSelector } from "react-redux";
import LoadingOverlay from "react-loading-overlay";

const Dashboard = () => {
  const user = useSelector((state) => state.app.user);

  return (
    <LoadingOverlay active={false} className="loader" spinner text="Loading...">
      <h1 className="heading-text">WELCOME TO THE HOME PAGE</h1>
      <p className="description">{user.email}</p>
    </LoadingOverlay>
  );
};

export default Dashboard;
