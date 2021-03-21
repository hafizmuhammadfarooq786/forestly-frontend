import React from "react";
import { Layout, Menu } from "antd";
import { withRouter, NavLink } from "react-router-dom";
import styled from "styled-components";
import HomeIcon from "../assets/icons/home.png";
import PatchesIcon from "../assets/icons/patches.png";
import PaymentIcon from "../assets/icons/payment.png";
import SettingIcon from "../assets/icons/settings.png";

const StyledLink = styled(NavLink)`
  width: 100%;
  color: rgba(255, 255, 255, 0.65) !important;
  text-decoration: none !important;
  cursor: pointer !important;
  &:hover {
    width: 80% !important;
    background-color: rgba(0, 0, 0, 0.24) !important;
    color: rgba(255, 255, 255, 0.65) !important;
    border-radius: 0px 50px 50px 0px !important;
    text-decoration: none !important;
    cursor: pointer !important;
  }
  &.active {
    width: 80%;
    background-color: rgba(0, 0, 0, 0.24) !important;
    color: rgba(255, 255, 255, 0.65) !important;
    border-radius: 0px 50px 50px 0px !important;
    text-decoration: none !important;
  }
`;

const { Sider } = Layout;

const Sidebar = () => {
  return (
    <Sider
      width="272px"
      breakpoint="xs"
      style={{ flex: "0 0 248px", position: "fixed", zIndex: 100 }}
    >
      <Menu
        mode="inline"
        style={{ height: "100vh", borderRight: 0, backgroundColor: "#274B28" }}
        theme="dark"
      >
        <div
          style={{
            marginTop: "3em",
            marginBottom: "5em",
            paddingLeft: "2.5em",
          }}
        >
          <h1
            style={{
              maxWidth: "6em",
              color: "#ffffff",
              fontSize: "22px",
              lineHeight: "27.83px",
              fontFamily: "Circular Std",
            }}
          >
            FOREST.LY
          </h1>
        </div>
        <StyledLink
          to="/admin/dashboard"
          key="home"
          style={{
            margin: "0.3em 0",
            height: "3.5em",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: "16px",
              lineHeight: "20.24px",
              fontFamily: "Circular Std",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src={HomeIcon}
              alt="home-icon"
              style={{ maxWidth: "1.5em", margin: "1em" }}
            />
            Dashboard
          </div>
        </StyledLink>
        <StyledLink
          to="/admin/forest-patches"
          key="home"
          style={{
            margin: "0.3em 0",
            height: "3.5em",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: "16px",
              lineHeight: "20.24px",
              fontFamily: "Circular Std",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src={PatchesIcon}
              alt="home-icon"
              style={{ maxWidth: "1.5em", margin: "1em" }}
            />
            Forest Patches
          </div>
        </StyledLink>
        <StyledLink
          to="/admin/payment-plans"
          key="home"
          style={{
            margin: "0.3em 0",
            height: "3.5em",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: "16px",
              lineHeight: "20.24px",
              fontFamily: "Circular Std",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src={PaymentIcon}
              alt="home-icon"
              style={{ maxWidth: "1.5em", margin: "1em" }}
            />
            Payment Plans
          </div>
        </StyledLink>
        <StyledLink
          to="/admin/settings"
          key="home"
          style={{
            margin: "0.3em 0",
            height: "3.5em",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: "16px",
              lineHeight: "20.24px",
              fontFamily: "Circular Std",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src={SettingIcon}
              alt="home-icon"
              style={{ maxWidth: "1.5em", margin: "1em" }}
            />
            Settings
          </div>
        </StyledLink>
      </Menu>
    </Sider>
  );
};

export default withRouter(Sidebar);
