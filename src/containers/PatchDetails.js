import React, { useState, useEffect } from "react";
import LoaderGif from "../components/common/LoaderGif";
import NoData from "../components/common/NoData";
import NoDataIllustration from "../assets/illustration/undraw_a_moment_to_relax_bbpa.svg";
import PatchData from "../components/common/PatchDetails";
import NewPatchDetails from "../components/common/NewPatchDetails";
import LargeSlider from "../components/common/large-carousel/Slider";
import MapWithCircles from "../assets/graph-images/map-with-circles.svg";
import Tooltip from "../assets/illustration/tooltip.svg";
import Slider from "../components/common/patch-details-carousel/Slider";
import MapView from "../assets/illustration/map-view.jpg";
import MapCheckOutline from "../assets/icons/map-check-outline.svg";
import Iceland from "../assets/icons/island.svg";

const PatchDetails = ({ newPatch }) => {
  const [pageLoading, setPageLoading] = useState(false);
  const [patches, setPatches] = useState(null);
  const [data, setData] = useState();
  const patchName = window.localStorage.getItem("patch-name");

  const noData = {
    title: "No Forest Units",
    message:
      "You have no forest units. Purchase forest units to see their details",
    imgSrc: NoDataIllustration,
    buttonText: "Buy Forest Units",
  };

  const finishLoading = () => {
    setPageLoading(false);
  };
  const stopPageLoading = () => {
    setTimeout(finishLoading, 2000);
  };

  useEffect(() => {
    setPageLoading(true);
    setData(true);
    const dataFor = newPatch ? NewPatchDetails : PatchData;
    setPatches(dataFor);
    stopPageLoading();
  }, []);
  return pageLoading ? (
    <LoaderGif />
  ) : data ? (
    <div className="content-body">
      <div className="patch-details">
        {patches &&
          patches.map((patch, index) => (
            <>
              {patch.name === patchName && (
                <LargeSlider
                  key={`patch-${index + 1}`}
                  dataSource={patch}
                  newPatch={newPatch}
                />
              )}
            </>
          ))}
      </div>

      {!newPatch &&
        patches &&
        patches.map((patch, index) => (
          <div key={index + 1}>
            {patch.name === patchName && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: 48,
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <h2 style={{ color: "#274B28", fontWeight: 900 }}>
                    Your Patch Location
                  </h2>

                  <div
                    style={{
                      position: "relative",
                      marginTop: 24,
                    }}
                  >
                    <img
                      src={MapWithCircles}
                      alt={`map-with-circles-illustraion`}
                      width={620}
                      height={433}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-40%, -40%)",
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ position: "relative" }}>
                        <img
                          src={Tooltip}
                          alt={`tooltip-illustraion`}
                          width={240}
                          height={120}
                        />

                        <div
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            padding: "12px 0 0",
                          }}
                        >
                          <h6 style={{ color: "#274B28" }}>
                            {patch.description}
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: 390,
                    marginLeft: 32,
                  }}
                >
                  <h2 style={{ color: "#274B28", fontWeight: 900 }}>
                    Did you know?
                  </h2>
                  <div style={{ marginTop: 24 }}>
                    <Slider dataSource={patch} />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

      {newPatch &&
        patches &&
        patches.map((patch, index) => (
          <div key={index + 1}>
            {patch.name === patchName && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 48,
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    maxWidth: 768,
                  }}
                >
                  <h2 style={{ color: "#274B28", fontWeight: 900 }}>
                    Benefits of buying forest patch
                  </h2>
                  <p
                    style={{
                      color: "#757575",
                      marginTop: 8,
                      fontSize: 18,
                      lineHeight: "23px",
                    }}
                  >
                    You can see detailed breakdown of the positive impacts
                  </p>
                  <div
                    style={{
                      width: "100%",
                      background: "#ffffff",
                      borderRadius: 8,
                      height: "100%",
                      padding: "32px 0 8px",
                    }}
                  >
                    {patch.benefits &&
                      patch.benefits.map((value, index) => (
                        <div
                          key={index + 1}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "start",
                            padding: "0px 32px 24px",
                          }}
                        >
                          <div style={{ display: "flex" }}>
                            <div
                              style={{
                                background: value.bgColor,
                                padding: 16,
                                borderRadius: 26,
                              }}
                            >
                              {value.imgSrc === "map-check-outline" && (
                                <img
                                  src={MapCheckOutline}
                                  alt={value.imgSrc}
                                  height={24}
                                  width={24}
                                />
                              )}
                              {value.imgSrc === "island" && (
                                <img
                                  src={Iceland}
                                  alt={value.imgSrc}
                                  height={24}
                                  width={24}
                                />
                              )}
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                marginLeft: 16,
                              }}
                            >
                              <h3 style={{ color: "#274B28" }}>
                                {value.title}
                              </h3>
                              <p className="small-p" style={{ marginTop: 8 }}>
                                {value.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img src={MapView} alt="MapView" height={374} width={478} />
                </div>
              </div>
            )}
          </div>
        ))}
    </div>
  ) : (
    <NoData source={noData} />
  );
};

export default PatchDetails;
