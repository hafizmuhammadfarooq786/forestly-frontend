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

const PatchBreadcrumb = (props) => {
  const {
    location: { pathname, key, search },
  } = props;

  const patchName = window.localStorage.getItem("patch-name");
  const searchPath = search.replaceAll("?", "");
  const subPath = `${pathname}/${searchPath}`;

  return (
    <div className="breadcrumb">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div style={{ display: "flex" }}>
          <StyledLink
            to={`/dashboard/patches`}
            key={key}
            style={{
              marginRight: 8,
              display: "flex",
              width: 105,
              alignItems: "center",
            }}
          >
            <h4
              style={{ fontWeight: 900, color: "#2196F3" }}
            >{`Forest Units`}</h4>
          </StyledLink>

          <img src={ArrowRight} alt={ArrowRight} height={24} width={24} />

          <StyledLink
            to={subPath}
            key={search}
            style={{
              marginLeft: 12,
              display: "flex",
              alignItems: "center",
            }}
          >
            <h4 style={{ fontWeight: 900, color: "#274B28" }}>{patchName}</h4>
          </StyledLink>
        </div>
        <div
          style={{
            background: "#F1FFF2",
            padding: 23,
            width: 215,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <img src={CartIcon} alt="CartIcon" height={24} width={24} />
          <h3 style={{ color: "#274B28" }}>{`Your Cart`}</h3>
          <img src={ArrowRight} alt="ArrowRight" height={24} width={24} />
        </div>
      </div>
    </div>
  );
};

export default PatchBreadcrumb;
