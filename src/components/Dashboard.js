import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Layout } from "antd";
import Sidebar from "./Sidebar";
import PatchBreadcrumb from "./PatchBreadcrumb";
import NewPatchesBreadcrumb from "./NewPatchesBreadcrumb";
import CartBreadcrumb from "./CartBreadcrumb";
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

  const checkPath = () => {
    if (pathname === "/dashboard/home") {
      return true;
    } else if (pathname === "/dashboard/patches") {
      return true;
    } else if (pathname === "/dashboard/payments") {
      return true;
    } else if (pathname === "/dashboard/settings") {
      return true;
    }
  };

  const checkForNewForestPaths = () => {
    if (pathname === "/dashboard/patches/new") {
      return true;
    } else if (pathname === "/dashboard/patches/new/details") {
      return true;
    }
  };

  const checkForCartPaths = () => {
    if (pathname === "/dashboard/patches/cart/review") {
      return true;
    } else if (pathname === "/dashboard/patches/cart/personal-information") {
      return true;
    } else if (pathname === "/dashboard/patches/cart/payment") {
      return true;
    } else if (pathname === "/dashboard/congratulations") {
      return true;
    }
  };

  const checkForOnlyCartPaths = () => {
    if (pathname === "/dashboard/patches/cart/review") {
      return true;
    } else if (pathname === "/dashboard/patches/cart/personal-information") {
      return true;
    } else if (pathname === "/dashboard/patches/cart/payment") {
      return true;
    }
  };
  const { Component } = step.step;

  return (
    <Layout style={{ backgroundColor: "#ffffff" }} hasSider>
      <Notification
        {...notification}
        onClose={() => dispatch(removeNotification())}
      />
      {!checkForCartPaths() && <Sidebar {...props} />}
      <Content className={checkForCartPaths() ? "content-for-card" : "content"}>
        {pathname === "/dashboard/patch/details" && (
          <PatchBreadcrumb {...props} />
        )}

        {checkPath() && <Breadcrumb {...props} />}

        {checkForNewForestPaths() && <NewPatchesBreadcrumb {...props} />}

        {checkForOnlyCartPaths() && <CartBreadcrumb {...props} />}
        <div
          style={{
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
