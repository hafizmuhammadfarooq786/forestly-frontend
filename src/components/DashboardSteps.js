import React from "react";
import Dashboard from "../containers/Dashboard";

const HomeStep = {
  id: "dashboard",
  step: {
    id: "dashboard",
    path: "/admin/dashboard",
    label: "Dashboard",
    Component: (props) => <Dashboard {...props} />,
  },
};

const AllSteps = [HomeStep];

export default AllSteps;
