import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import LogoutIcon from "../assets/icons/logout.png";
import { logout } from "../store/app/actions";

const StyledLink = styled(NavLink)`
  width: max-content;
  color: #151515 !important;
  text-decoration: none !important;
  cursor: pointer !important;
  &:hover {
    width: max-content;
    color: #151515 !important;
    text-decoration: none !important;
    cursor: pointer !important;
  }
  &.active {
    width: max-content;
    color: #151515 !important;
    text-decoration: none !important;
    cursor: pointer !important;
  }
`;

const Breadcrumb = () => {
  const dispatch = useDispatch();
  return (
    <div className="breadcrumb">
      <StyledLink
        to="/admin/dashboard"
        key="home"
        style={{
          margin: 0,
          height: "3.5em",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontSize: "18px",
            lineHeight: "22.77px",
            fontWeight: 900,
            fontFamily: "Circular Std",
            display: "flex",
            alignItems: "center",
          }}
        >
          Dashboard
        </div>
      </StyledLink>

      <div onClick={() => dispatch(logout())} style={{ cursor: "pointer" }}>
        <span
          style={{
            fontSize: "16px",
            fontWeight: "900",
            lineHeight: "20.24px",
            fontFamily: "Circular Std",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src={LogoutIcon}
            alt="logout-icon"
            style={{ maxWidth: "1.5em", margin: "1em 0.5em" }}
          />
          Logout
        </span>
      </div>
    </div>
  );
};

export default Breadcrumb;
