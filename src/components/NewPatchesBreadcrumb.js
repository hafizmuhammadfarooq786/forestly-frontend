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

const NewPatchesBreadcrumb = (props) => {
  const {
    location: { pathname, key, search },
  } = props;

  const patchName = window.localStorage.getItem("patch-name");
  const searchPath = search.replaceAll("?", "");
  const subPath = `${pathname}/${searchPath}`;

  const checkPath = () => {
    if (pathname === "/dashboard/patches/new") {
      return false;
    } else if (pathname === "/dashboard/patches/new/details") {
      return true;
    }
  };

  return (
    <div className="breadcrumb">
      {checkPath() ? (
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
                display: "flex",
                alignItems: "center",
              }}
            >
              <h4
                style={{ fontWeight: 900, color: "#2196F3" }}
              >{`Forest Units`}</h4>
            </StyledLink>

            <img
              src={ArrowRight}
              alt={ArrowRight}
              height={24}
              width={24}
              style={{ margin: "0 10px" }}
            />

            <StyledLink
              to={`/dashboard/patches/new`}
              key={key}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <h4
                style={{
                  fontWeight: 900,
                  color: "#2196F3",
                }}
              >{`New Forests`}</h4>
            </StyledLink>

            <img
              src={ArrowRight}
              alt={ArrowRight}
              height={24}
              width={24}
              style={{ margin: "0 10px" }}
            />
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
              <h3
                style={{ color: "#ffffff", marginRight: 16 }}
              >{`Your Cart`}</h3>
              <img
                src={ArrowRightWhite}
                alt="ArrowRight"
                height={32}
                width={32}
              />
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
      ) : (
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
                display: "flex",
                alignItems: "center",
              }}
            >
              <h4
                style={{ fontWeight: 900, color: "#2196F3" }}
              >{`Forest Units`}</h4>
            </StyledLink>

            <img
              src={ArrowRight}
              alt={ArrowRight}
              height={24}
              width={24}
              style={{ margin: "0 10px" }}
            />

            <StyledLink
              to={`/dashboard/patches/new`}
              key={key}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <h4
                style={{
                  fontWeight: 900,
                  color: "#274B28",
                }}
              >{`New Forests`}</h4>
            </StyledLink>
          </div>
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
              <h3
                style={{ color: "#ffffff", marginRight: 16 }}
              >{`Your Cart`}</h3>
              <img
                src={ArrowRightWhite}
                alt="ArrowRight"
                height={32}
                width={32}
              />
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
      )}
    </div>
  );
};

export default NewPatchesBreadcrumb;
