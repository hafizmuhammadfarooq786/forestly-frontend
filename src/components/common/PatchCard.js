import React, { useState, useEffect } from "react";
import PerformanceIcon from "../../assets/icons/green-arrow-performance.svg";
import BulbIcon from "../../assets/icons/lightbulb-on-outline.svg";
import ThreeDots from "../../assets/icons/dots-vertical.svg";
import Slider from "./small-carousel/Slider";
import { history } from "../../index";

const PatchCard = ({ searchActive, searchedSource, dataSource }) => {
  const [patches, setPatches] = useState(null);
  const getUrlPath = (str) => {
    return str.split(" ").join("-").toLowerCase();
  };

  useEffect(() => {
    setPatches(dataSource);
  }, []);

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      {patches &&
        patches.map((patch, index) => (
          <div className="patch-card" key={`patch-` + index + 1}>
            <div style={{ display: "flex", width: "100%" }}>
              <div style={{ height: 164, width: 280 }}>
                <Slider dataSource={patch.sliders} />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  minWidth: 400,
                  marginLeft: 32,
                  marginTop: 16,
                }}
              >
                <h2 style={{ color: "#274B28" }}>{patch.name}</h2>
                <h4 style={{ color: "#757575", margin: "16px 0" }}>
                  {patch.description}
                </h4>
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      background: "#EEFBEF",
                      border: "1px solid #E0E0E0",
                      borderRadius: 100,
                      padding: "7px 14px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={PerformanceIcon}
                      alt={PerformanceIcon}
                      height={18}
                      width={18}
                    />
                    <p
                      className="small-p"
                      style={{
                        color: "#274B28",
                        marginLeft: 10,
                        fontWeight: 700,
                      }}
                    >
                      {patch.patchPerformance}
                    </p>
                  </div>
                  <div
                    style={{
                      background: "#FFF3E0",
                      border: "1px solid #E0E0E0",
                      borderRadius: 100,
                      padding: "7px 14px",
                      marginLeft: 16,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img src={BulbIcon} alt={BulbIcon} height={18} width={18} />
                    <p
                      className="small-p"
                      style={{
                        color: "#274B28",
                        marginLeft: 4,
                        fontWeight: 700,
                      }}
                    >
                      <strong style={{ color: "#000000" }}>
                        {`${patch.species}  `}
                      </strong>
                      Species
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  alignItems: "end",
                  width: "100%",
                  height: 140,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "flex-end",
                  }}
                >
                  <div
                    style={{
                      background: "#F1FFF2",
                      border: "1px solid #274B28",
                      borderRadius: 100,
                      padding: "14px 24px 12px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      window.localStorage.setItem("patch-name", patch.name);
                      const urlPath = getUrlPath(patch.name);
                      history.push(`/dashboard/patch/details?${urlPath}`);
                    }}
                  >
                    <h3 style={{ color: "#274B28" }}>View Details</h3>
                  </div>

                  <div
                    style={{
                      marginLeft: 16,
                      border: "1px solid #274B28",
                      background: "#ffffff",
                      borderRadius: 100,
                      padding: "12px",
                      height: "max-content",
                    }}
                  >
                    <img
                      src={ThreeDots}
                      alt={ThreeDots}
                      height={20}
                      width={20}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PatchCard;
