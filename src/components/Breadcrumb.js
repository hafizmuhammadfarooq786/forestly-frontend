import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import CartIcon from "../assets/icons/cart-outline.svg";
import ArrowRight from "../assets/icons/chevron-right.svg";

const StyledLink = styled(NavLink)`
  width: max-content;
  text-decoration: none !important;
  cursor: pointer !important;
  &:hover {
    width: max-content;
    text-decoration: none !important;
    cursor: pointer !important;
  }
  &.active {
    width: max-content;
    text-decoration: none !important;
    cursor: pointer !important;
  }
`;

const Breadcrumb = (props) => {
  const {
    location: { pathname, key },
  } = props;

  const checkPath = () => {
    let title = "";
    if (pathname === "/dashboard/home") {
      title = "Dashboard";
    } else if (pathname === "/dashboard/patches") {
      title = "Forest Units";
    } else if (pathname === "/dashboard/payments") {
      title = "Payment Plans";
    } else if (pathname === "/dashboard/settings") {
      title = "Settings";
    }
    return title;
  };
  return (
    <div className="breadcrumb">
      <StyledLink
        to={pathname}
        key={key}
        style={{
          margin: 0,
          height: "3.5em",
          display: "flex",
          width: "100%",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <h4 style={{ fontWeight: 900, color: "#274B28" }}>
            {checkPath(pathname)}
          </h4>

          <div
            style={{
              background: "#F1FFF2",
              padding: "22px 24px",
              width: 215,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <img src={CartIcon} alt="CartIcon" height={24} width={24} />
            <h3 style={{ color: "#274B28" }}>{`Your Cart`}</h3>
            <img src={ArrowRight} alt="ArrowRight" height={28} width={28} />
          </div>
        </div>
      </StyledLink>
    </div>
  );
};

export default Breadcrumb;
