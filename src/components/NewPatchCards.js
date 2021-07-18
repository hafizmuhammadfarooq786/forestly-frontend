import React from "react";
import Slider from "./common/new-small-carousel/Slider";
import ViewDetailsIcon from "../assets/icons/open-in-new.svg";
import CartPlus from "../assets/icons/cart-plus.svg";
import { history } from "../index";
import CartDetails from "./common/CartDetails";

const NewPatchCards = ({ setOpen, setSource, dataSource }) => {
  const getUrlPath = (str) => {
    return str.split(" ").join("-").toLowerCase();
  };

  const isExist = CartDetails[0]["forests"].length > 0 ? true : false;

  return (
    dataSource && (
      <>
        {dataSource.map((forests, index) => (
          <div className="row" key={index + 1}>
            {forests.map((forest, subIndex) => (
              <div className="col" key={subIndex + 1}>
                <div style={{ height: 164 }}>
                  <Slider dataSource={forest.sliders} />
                </div>
                <div
                  style={{
                    background: "#ffffff",
                    borderBottomLeftRadius: 12,
                    borderBottomRightRadius: 12,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginTop: 16,
                      padding: "16px 24px 0",
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      <h4
                        style={{
                          color: "#274B28",
                          marginRight: 16,
                          fontWeight: 900,
                        }}
                      >
                        {forest.name}
                      </h4>
                      <img
                        src={ViewDetailsIcon}
                        alt={ViewDetailsIcon}
                        height={24}
                        width={24}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          window.localStorage.setItem(
                            "patch-name",
                            forest.name
                          );
                          const urlPath = getUrlPath(forest.name);
                          history.push(
                            `/dashboard/patches/new/details?${urlPath}`
                          );
                        }}
                      />
                    </div>
                    <p
                      className="small-p"
                      style={{
                        color: "#757575",
                        margin: "8px 0 0",
                        fontWeight: 700,
                      }}
                    >
                      {forest.country}
                      <span style={{ margin: "0 6px" }}>|</span>
                      {forest.area}
                    </p>
                  </div>

                  {isExist ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "16px 24px 0",
                      }}
                    >
                      <h2 style={{ color: "#424242", fontWeight: 900 }}>
                        {`${forest.sqMeters} sq `}
                        <span
                          style={{
                            fontSize: 18,
                            lineHeight: "22px",
                            color: "#757575",
                            fontWeight: "normal",
                          }}
                        >
                          available
                        </span>
                      </h2>

                      <div
                        style={{
                          background:
                            forest.sqMeters > 10000 ? "#8BC34A" : "#FF9800",
                          borderRadius: "100px",
                          margin: "8px 0 16px",
                          width: 80,
                          height: 8,
                        }}
                      />
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "16px 24px 0",
                      }}
                    >
                      <h2 style={{ color: "#424242", fontWeight: 900 }}>
                        {`US $${forest.unitPrice}.00`}
                      </h2>

                      <p
                        className="small-p"
                        style={{ color: "#9E9E9E", margin: "4px 0 0" }}
                      >
                        {`per square meter`}
                      </p>
                    </div>
                  )}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "16px 24px",
                    }}
                  >
                    <div
                      style={{
                        background: "#F1FFF2",
                        border: "1px solid #274B28",
                        borderRadius: 100,
                        padding: "14px 24px",
                        width: "100%",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setSource(forest.id);
                        setOpen();
                      }}
                    >
                      <h3 style={{ color: "#274B28" }}>Buy Now</h3>
                    </div>

                    <div
                      style={{
                        marginLeft: 24,
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setSource(forest.id);
                        setOpen();
                      }}
                    >
                      <img
                        src={CartPlus}
                        alt={CartPlus}
                        height={44}
                        width={44}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </>
    )
  );
};

export default NewPatchCards;
