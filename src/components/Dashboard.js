import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Layout } from "antd";
import Sidebar from "./Sidebar";
import PatchBreadcrumb from "./PatchBreadcrumb";
import Breadcrumb from "./Breadcrumb";
import AllSteps from "./DashboardSteps";
import { removeNotification } from "../store/app/actions";
import Notification from "../components/common/Notification";

const Dashboard = (props) => {
  const { Content } = Layout;
  const { pathname } = useSelector((state) => state.router.location);
  const { notification } = useSelector((state) => state.app);
  let step = {};
  const dispatch = useDispatch();

  step = AllSteps.find((data) => data.step.path === pathname);
  if (step === undefined || step === null || !step) {
    return <Redirect to="/404" />;
  }

  const { Component } = step.step;

  return (
    <Layout style={{ backgroundColor: "#ffffff" }} hasSider>
      <Notification
        {...notification}
        onClose={() => dispatch(removeNotification())}
      />
      <Sidebar {...props} />
      <Content className="content">
        {pathname === "/dashboard/patch/details" ? (
          <PatchBreadcrumb {...props} />
        ) : (
          <Breadcrumb {...props} />
        )}
        <div
          style={{
            marginTop: 72,
            padding: "24px 48px",
            width: "100%",
          }}
        >
          <Component {...props} />
        </div>
      </Content>
    </Layout>
  );
};
export default Dashboard;
