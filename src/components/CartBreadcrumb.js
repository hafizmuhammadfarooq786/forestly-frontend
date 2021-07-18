import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import LeftArrow from "../assets/icons/chevron-left.svg";

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

const CartBreadcrumb = (props) => {
  const {
    location: { key },
  } = props;

  return (
    <div className="breadcrumb-for-cart">
      <StyledLink
        to="/dashboard/patches"
        key={key}
        style={{
          margin: 0,
          height: "3.5em",
          display: "flex",
          alignItems: "center",
          position: "absolute",
          left: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          <img
            src={LeftArrow}
            alt={LeftArrow}
            height={32}
            width={32}
            style={{ margin: "0 10px" }}
          />
          <h4 style={{ fontWeight: 700, color: "#274B28" }}>{`Go Back`}</h4>
        </div>
      </StyledLink>

      <h4
        style={{
          fontWeight: 900,
          color: "#274B28",
          width: "100%",
          textAlign: "center",
        }}
      >{`Your Cart`}</h4>
    </div>
  );
};

export default CartBreadcrumb;
