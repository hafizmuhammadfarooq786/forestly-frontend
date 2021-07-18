import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import CartIcon from "../assets/icons/cart-outline.svg";
import CartIconWhite from "../assets/icons/cart-outline-blank.svg";
import ArrowRight from "../assets/icons/chevron-right.svg";
import ArrowRightWhite from "../assets/icons/chevron-right-white.svg";
import CartDetails from "./common/CartDetails";
import { history } from "../index";

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
        </div>
      </StyledLink>
      {CartDetails[0]["forests"].length > 0 ? (
        <div
          style={{
            background: "#274B28",
            padding: "16px 32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => history.push("/dashboard/patches/cart/review")}
        >
          <img src={CartIconWhite} alt="CartIcon" height={32} width={32} />
          <div
            style={{
              background: "#F1FFF2",
              borderRadius: "50%",
              margin: "0 16px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 40,
              width: 40,
            }}
          >
            <h3 style={{ color: "#274B28" }}>
              {CartDetails[0]["forests"].length}
            </h3>
          </div>
          <h3 style={{ color: "#ffffff", marginRight: 16 }}>{`Your Cart`}</h3>
          <img src={ArrowRightWhite} alt="ArrowRight" height={32} width={32} />
        </div>
      ) : (
        <div
          style={{
            background: "#F1FFF2",
            padding: 23,
            width: 215,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => history.push("/dashboard/patches/cart/review")}
        >
          <img src={CartIcon} alt="CartIcon" height={24} width={24} />
          <h3 style={{ color: "#274B28" }}>{`Your Cart`}</h3>
          <img src={ArrowRight} alt="ArrowRight" height={24} width={24} />
        </div>
      )}
    </div>
  );
};

export default Breadcrumb;
