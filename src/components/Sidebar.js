import React from "react";
import { useDispatch } from "react-redux";
import { Layout } from "antd";
import { withRouter, NavLink } from "react-router-dom";
import styled from "styled-components";
import LogoTextual from "../assets/logo.svg";
import SignOut from "../assets/icons/logout.png";
import { logout } from "../store/app/actions";

const StyledLink = styled(NavLink)`
  width: 100%;
  color: rgba(255, 255, 255, 0.65) !important;
  text-decoration: none !important;
  cursor: pointer !important;
  &:hover {
    width: 80% !important;
    background-color: rgba(0, 0, 0, 0.24) !important;
    color: rgba(255, 255, 255, 1) !important;
    border-radius: 0px 50px 50px 0px !important;
    text-decoration: none !important;
    cursor: pointer !important;
  }
  &.active {
    width: 80%;
    background-color: rgba(0, 0, 0, 0.24) !important;
    color: rgba(255, 255, 255, 1) !important;
    border-radius: 0px 50px 50px 0px !important;
    text-decoration: none !important;
  }
`;

const { Sider } = Layout;

const Sidebar = (props) => {
  const dispatch = useDispatch();
  const {
    location: { pathname },
  } = props;
  const checkActivePath = (navPath) => {
    if (pathname === navPath) {
      return true;
    }
    return false;
  };
  return (
    <Sider
      width="272px"
      breakpoint="xs"
      style={{ flex: "0 0 248px", position: "fixed", zIndex: 100 }}
    >
      <div
        style={{ height: "100vh", borderRight: 0, backgroundColor: "#274B28" }}
      >
        <div
          style={{
            padding: "24px 0 56px 32px",
          }}
        >
          <img src={LogoTextual} alt="forest-logo" />
        </div>
        <StyledLink
          to="/dashboard/home"
          key="home"
          style={{
            margin: "0.3em 0",
            height: "3.5em",
            display: "flex",
            alignItems: "center",
            paddingLeft: 32,
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 5.69L17 10.19V18H15V12H9V18H7V10.19L12 5.69ZM12 3L2 12H5V20H11V14H13V20H19V12H22L12 3Z"
              fill="#F1FFF2"
              fillOpacity={checkActivePath("/dashboard/home") ? "1.0" : "0.5"}
            />
          </svg>
          <div
            style={{
              fontSize: 16,
              lineHeight: "20.24px",
              display: "flex",
              alignItems: "center",
              marginLeft: 16,
            }}
          >
            Dashboard
          </div>
        </StyledLink>
        <StyledLink
          to="/dashboard/patches"
          key="patches"
          style={{
            margin: "0.3em 0",
            height: "3.5em",
            display: "flex",
            alignItems: "center",
            paddingLeft: 32,
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 21V18H3L8 13H5L10 8H7L12 3L17 8H14L19 13H16L21 18H14V21H10Z"
              fill="#F1FFF2"
              fillOpacity={
                checkActivePath("/dashboard/patches") ? "1.0" : "0.5"
              }
            />
          </svg>

          <div
            style={{
              fontSize: 16,
              lineHeight: "20.24px",
              display: "flex",
              alignItems: "center",
              marginLeft: 16,
            }}
          >
            Forest Patches
          </div>
        </StyledLink>
        <StyledLink
          to="/dashboard/payments"
          key="payments"
          style={{
            margin: "0.3em 0",
            height: "3.5em",
            display: "flex",
            alignItems: "center",
            paddingLeft: 32,
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 8H4V6H20V8ZM20 18H4V12H20V18ZM20 4H4C2.89 4 2 4.89 2 6V18C2 18.5304 2.21071 19.0391 2.58579 19.4142C2.96086 19.7893 3.46957 20 4 20H20C20.5304 20 21.0391 19.7893 21.4142 19.4142C21.7893 19.0391 22 18.5304 22 18V6C22 4.89 21.1 4 20 4Z"
              fill="#F1FFF2"
              fillOpacity={
                checkActivePath("/dashboard/payments") ? "1.0" : "0.5"
              }
            />
          </svg>

          <div
            style={{
              fontSize: 16,
              lineHeight: "20.24px",
              display: "flex",
              alignItems: "center",
              marginLeft: 16,
            }}
          >
            Payment Plans
          </div>
        </StyledLink>
        <StyledLink
          to="/dashboard/settings"
          key="settings"
          style={{
            margin: "0.3em 0",
            height: "3.5em",
            display: "flex",
            alignItems: "center",
            paddingLeft: 32,
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 15.5C11.0718 15.5 10.1815 15.1313 9.52515 14.4749C8.86877 13.8185 8.50002 12.9283 8.50002 12C8.50002 11.0717 8.86877 10.1815 9.52515 9.52513C10.1815 8.86875 11.0718 8.5 12 8.5C12.9283 8.5 13.8185 8.86875 14.4749 9.52513C15.1313 10.1815 15.5 11.0717 15.5 12C15.5 12.9283 15.1313 13.8185 14.4749 14.4749C13.8185 15.1313 12.9283 15.5 12 15.5ZM19.43 12.97C19.47 12.65 19.5 12.33 19.5 12C19.5 11.67 19.47 11.34 19.43 11L21.54 9.37C21.73 9.22 21.78 8.95 21.66 8.73L19.66 5.27C19.54 5.05 19.27 4.96 19.05 5.05L16.56 6.05C16.04 5.66 15.5 5.32 14.87 5.07L14.5 2.42C14.46 2.18 14.25 2 14 2H10C9.75002 2 9.54002 2.18 9.50002 2.42L9.13002 5.07C8.50002 5.32 7.96002 5.66 7.44002 6.05L4.95002 5.05C4.73002 4.96 4.46002 5.05 4.34002 5.27L2.34002 8.73C2.21002 8.95 2.27002 9.22 2.46002 9.37L4.57002 11C4.53002 11.34 4.50002 11.67 4.50002 12C4.50002 12.33 4.53002 12.65 4.57002 12.97L2.46002 14.63C2.27002 14.78 2.21002 15.05 2.34002 15.27L4.34002 18.73C4.46002 18.95 4.73002 19.03 4.95002 18.95L7.44002 17.94C7.96002 18.34 8.50002 18.68 9.13002 18.93L9.50002 21.58C9.54002 21.82 9.75002 22 10 22H14C14.25 22 14.46 21.82 14.5 21.58L14.87 18.93C15.5 18.67 16.04 18.34 16.56 17.94L19.05 18.95C19.27 19.03 19.54 18.95 19.66 18.73L21.66 15.27C21.78 15.05 21.73 14.78 21.54 14.63L19.43 12.97Z"
              fill="#F1FFF2"
              fillOpacity={
                checkActivePath("/dashboard/settings") ? "1.0" : "0.5"
              }
            />
          </svg>

          <div
            style={{
              fontSize: 16,
              lineHeight: "20.24px",
              display: "flex",
              alignItems: "center",
              marginLeft: 16,
            }}
          >
            Settings
          </div>
        </StyledLink>
        <div className="logout" onClick={() => dispatch(logout())}>
          <div
            style={{
              fontSize: 16,
              lineHeight: "20.24px",
              display: "flex",
              alignItems: "center",
              marginLeft: 16,
            }}
          >
            <img
              src={SignOut}
              alt="logout_icon"
              style={{ maxWidth: "1.5em", margin: "1em" }}
            />
            Logout
          </div>
        </div>
        <p
          style={{
            letterSpacing: 1,
            fontWeight: 700,
            fontSize: 12,
            color: "#ffffff",
            position: "absolute",
            bottom: 8,
            right: 16,
            margin: 0,
            opacity: 0.5,
          }}
        >
          v 1.0.0
        </p>
      </div>
    </Sider>
  );
};

export default withRouter(Sidebar);
