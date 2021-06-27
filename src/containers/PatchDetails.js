import React, { useState, useEffect } from "react";
import ComponentLoading from "../components/common/ComponentLoading";
import NoData from "../components/common/NoData";
import NoDataIllustration from "../assets/illustration/undraw_a_moment_to_relax_bbpa.svg";
import PatchData from "../components/common/PatchDetails";
import LargeSlider from "../components/common/large-carousel/Slider";
import MapWithCircles from "../assets/graph-images/map-with-circles.svg";
import Tooltip from "../assets/illustration/tooltip.svg";
import Slider from "../components/common/patch-details-carousel/Slider";

const PatchDetails = () => {
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
    setTimeout(finishLoading, 1000);
  };

  useEffect(() => {
    setPageLoading(true);
    setData(true);
    setPatches(PatchData);
    stopPageLoading();
  }, []);
  return (
    <ComponentLoading loading={pageLoading}>
      {data ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div className="patch-details">
            {patches &&
              patches.map((patch, index) => (
                <>
                  {patch.name === patchName && (
                    <LargeSlider
                      key={`patch-${index + 1}`}
                      dataSource={patch}
                    />
                  )}
                </>
              ))}
          </div>

          {patches &&
            patches.map((patch, index) => (
              <>
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
              </>
            ))}
        </div>
      ) : (
        <NoData source={noData} />
      )}
    </ComponentLoading>
  );
};

export default PatchDetails;
