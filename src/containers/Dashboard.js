import React, { useState, useEffect } from "react";
import LoaderGif from "../components/common/LoaderGif";
import NoData from "../components/common/NoData";
import Selector from "../components/common/Selector";
import CardView from "../components/common/Card";

// Illustration
import NoDataIllustration from "../assets/illustration/no-data-illustration.svg";
// Graph Images
import BioDiversityChart from "../assets/graph-images/BD-Chart.svg";
import MapView from "../assets/graph-images/map.svg";
import HumidityBD from "../assets/graph-images/humidity-BD-chart.svg";
import AirCleanedChart from "../assets/graph-images/air-cleaner-chart.svg";
// Icons
import CountriesIcon from "../assets/icons/map-check-outline.svg";
import LandRestoredIcon from "../assets/icons/island.svg";
import TreeSpeciesIcon from "../assets/icons/view-grid-plus-outline.svg";
import ArrowBD from "../assets/icons/arrow-BD.svg";
import InformationIcon from "../assets/icons/information-outline.svg";
import AirFilter from "../assets/icons/air-filter.svg";
import StairsUp from "../assets/icons/stairs-up.svg";
import TemperaturIcon from "../assets/icons/thermometer-lines.svg";
import WaterCleanedChart from "../assets/icons/water-cleaner-chart.svg";
import ArrowSanitation from "../assets/icons/arrow-sanitation.svg";
import Accounts from "../assets/icons/account-multiple.svg";

const Dashboard = () => {
  const [pageLoading, setPageLoading] = useState(false);
  const [data, setData] = useState();
  const [selectedOption, setSelectedOption] = useState(null);
  const [landLifeValues, setLandLifeValues] = useState(null);
  const [climateValues, setClimateValues] = useState(null);
  const [accountDetails, setAccountDetails] = useState(null);
  const noData = {
    title: "No forest data",
    message:
      "In order to see your forest’s dashboard, you will have to buy some forest units",
    imgSrc: NoDataIllustration,
    buttonText: "Buy Forest Units",
  };
  const [waterAndSanitationValues, setWaterAndSanitationValues] =
    useState(null);

  const finishLoading = () => {
    setPageLoading(false);
  };
  const stopPageLoading = () => {
    setTimeout(finishLoading, 2000);
  };

  const selectorSource = [
    {
      title: "All Units",
      description: "Displays collective data for all patches ",
    },
    { title: "Teutoburg Forest", description: "Block X - 100 sq Patch" },
    { title: "Württemberg Forest", description: "Block X - 100 sq Patch" },
  ];

  useEffect(() => {
    setPageLoading(true);
    setData(true);

    stopPageLoading();

    setLandLifeValues([
      {
        imgSrc: CountriesIcon,
        altText: CountriesIcon,
        bgColor: "rgba(0, 207, 232, 0.12)",
        count: "03",
        title: "Countries",
      },
      {
        imgSrc: LandRestoredIcon,
        altText: LandRestoredIcon,
        bgColor: "#FFF8E1",
        count: "250,000",
        title: "Land Restored",
      },
      {
        imgSrc: TreeSpeciesIcon,
        altText: TreeSpeciesIcon,
        bgColor: "#ECEFF1",
        count: "04",
        title: "Tree Species",
      },
    ]);

    setClimateValues({
      carbonDioxide: 20,
      capturelevel: "+2",
      airCleaned: "300cm",
      temperature: 26.5,
      level: 10,
    });

    setWaterAndSanitationValues({
      liters: 300,
      humidityLevel: 40,
      level: 15,
    });

    setAccountDetails({
      jobs: 30,
      level: 10,
    });
  }, [selectedOption]);

  return pageLoading ? (
    <LoaderGif />
  ) : data ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        height: "100%",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          width: "100%",
        }}
      >
        <h3 style={{ color: "#757575" }}>Viewing Statistics for</h3>
        <Selector
          option={(opt) => setSelectedOption(opt)}
          source={selectorSource}
        />
      </div>

      <div
        style={{
          marginTop: 24,
          display: "flex",
          width: "100%",
          justifyContent: "start",
        }}
      >
        <CardView large={true}>
          <h5 style={{ color: "#101112", marginTop: 18 }}>Life on land</h5>
          <h6 style={{ color: "#757575", marginTop: 8 }}>
            Date related to terrestrial ecosystems
          </h6>
          <div style={{ marginTop: 16, display: "flex", width: "100%" }}>
            <div
              style={{
                border: "1px solid #EEEEEE",
                borderRadius: 4,
                marginRight: 16,
                minWidth: 224,
                width: "100%",
              }}
            >
              {landLifeValues &&
                landLifeValues.map((value, index) => (
                  <div
                    key={index + 1}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "start",
                      padding: 16,
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      <div
                        style={{
                          background: value.bgColor,
                          padding: 14,
                          borderRadius: 26,
                        }}
                      >
                        <img
                          src={value.imgSrc}
                          alt={value.altText}
                          height={24}
                          width={24}
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          marginLeft: 16,
                        }}
                      >
                        <h3 style={{ color: "#274B28" }}>{value.count}</h3>
                        <p className="small-p">{value.title}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div
              style={{
                background: "#5BCD63",
                borderRadius: 4,
                minWidth: 224,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: 24,
              }}
            >
              <img
                src={BioDiversityChart}
                alt="BioDiversityChart"
                height={120}
                width={120}
              />
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  marginTop: 16,
                }}
              >
                <p className="small-p" style={{ color: "#F1FFF2" }}>
                  <strong style={{ color: "#ffffff", marginRight: 4 }}>
                    10%
                  </strong>
                  higher compared to other patches
                </p>
                <img
                  src={ArrowBD}
                  alt="BioDiversityChart"
                  height={24}
                  width={24}
                />
              </div>
            </div>
          </div>
        </CardView>
        <CardView large={true}>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              marginTop: 18,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                maxWidth: "80%",
              }}
            >
              <h5 style={{ color: "#101112" }}>Map View</h5>
              <h6 style={{ color: "#757575", marginTop: 8 }}>
                You have 3 forest patches spread out across Germany
              </h6>
            </div>
            <img
              src={InformationIcon}
              alt="InformationIcon"
              height={24}
              width={24}
            />
          </div>
          <div style={{ width: "100%", marginTop: 24 }}>
            <img src={MapView} alt="MapView" height={253} width={453} />
          </div>
        </CardView>
      </div>

      <div
        style={{
          marginTop: 24,
          display: "flex",
          width: "100%",
          justifyContent: "start",
        }}
      >
        <CardView large={true}>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              marginTop: 18,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                maxWidth: "80%",
              }}
            >
              <h5 style={{ color: "#101112" }}>Climate Action</h5>
              <h6 style={{ color: "#757575", marginTop: 8 }}>
                Impact of your patches on climate
              </h6>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              margin: "16px 0",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                marginRight: 16,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "#274B28",
                  borderRadius: 8,
                  padding: 16,
                  height: 72,
                  width: "100%",
                }}
              >
                <div
                  style={{
                    background: "rgba(0, 0, 0, 0.24)",
                    borderRadius: 26,
                    padding: 12,
                    height: 48,
                    width: 48,
                  }}
                >
                  <img src={AirFilter} alt="AirFilter" height={24} width={24} />
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <h3 style={{ color: "#ffffff" }}>
                    {climateValues.level} tons
                  </h3>
                  <p
                    className="small-p"
                    style={{ color: "#ffffff", marginTop: 4 }}
                  >
                    CO2 Captured
                  </p>
                </div>

                <div
                  style={{
                    background: "#ffffff",
                    padding: "8px 12px",
                    display: "flex",
                    borderRadius: 100,
                  }}
                >
                  <h3 style={{ color: "#274B28", marginRight: 8 }}>
                    {climateValues.capturelevel}%
                  </h3>
                  <img src={StairsUp} alt={StairsUp} height={20} width={20} />
                </div>
              </div>
              <div
                style={{
                  width: "100%",
                  marginTop: 24,
                  background: "#FAFAFA",
                  height: "100%",
                  borderRadius: 8,
                }}
              >
                <h3
                  style={{
                    color: "#274B28",
                    paddingTop: 24,
                    marginLeft: 16,
                  }}
                >
                  {climateValues.airCleaned}
                </h3>
                <img
                  src={AirCleanedChart}
                  alt="AirCleanedChart"
                  style={{ width: "100%" }}
                />
              </div>
            </div>
            <div
              style={{
                background: "#E3F2FD",
                borderRadius: 8,
                maxWidth: 172,
                height: 275,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: 0,
              }}
            >
              <img
                src={TemperaturIcon}
                alt="TemperaturIcon"
                height={120}
                width={120}
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: 180,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <h1 style={{ color: "#424242", marginTop: 16 }}>
                  {climateValues.temperature}
                </h1>
                <p
                  className="small-p"
                  style={{ color: "#757575", marginTop: 8 }}
                >
                  Temperature
                </p>
                <p
                  className="small-p"
                  style={{
                    color: "#757575",
                    marginTop: 16,
                    textAlign: "center",
                  }}
                >
                  <strong style={{ color: "#000000", marginRight: 4 }}>
                    10%
                  </strong>
                  lower compared to other patches
                </p>
              </div>
            </div>
          </div>
        </CardView>
        <CardView large={true}>
          <div
            style={{
              display: "flex",
              width: "100%",
              marginTop: 18,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                maxWidth: "80%",
              }}
            >
              <h5 style={{ color: "#101112" }}>Clean Water and Sanitisation</h5>
              <h6 style={{ color: "#757575", marginTop: 8 }}>
                Water levels and Humidity information
              </h6>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              margin: "16px 0",
            }}
          >
            <div
              style={{
                background: "#2196F3",
                borderRadius: 8,
                maxWidth: 212,
                height: 275,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
                padding: 24,
              }}
            >
              <h2 style={{ color: "#ffffff" }}>
                {`${waterAndSanitationValues.liters} liters`}
              </h2>
              <p style={{ color: "#ffffff" }}>Water Cleaned</p>
              <img
                src={WaterCleanedChart}
                alt="BioDiversityChart"
                height={72}
                width={212}
              />
            </div>
            <div
              style={{
                background: "transparent",
                borderRadius: 4,
                maxWidth: 264,
                height: 275,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: 24,
              }}
            >
              <img src={HumidityBD} alt="HumidityBD" height={154} width={154} />
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  marginTop: 16,
                  borderRadius: 8,
                  padding: 8,
                  background: "#FFEBEE",
                }}
              >
                <p className="small-p" style={{ color: "#757575" }}>
                  <strong style={{ color: "#000000", marginRight: 4 }}>
                    {`${waterAndSanitationValues.level}% `}
                  </strong>
                  higher compared to other patches
                </p>
                <img
                  src={ArrowSanitation}
                  alt="HumidityArrowBD"
                  height={24}
                  width={24}
                />
              </div>
            </div>
          </div>
        </CardView>
      </div>
      <div
        style={{
          marginTop: 24,
          display: "flex",
          width: "100%",
          justifyContent: "start",
        }}
      >
        <CardView large={false}>
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "100%",
              marginTop: 18,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                maxWidth: "80%",
              }}
            >
              <h5 style={{ color: "#101112" }}>Economic Growth</h5>
              <h6 style={{ color: "#757575", marginTop: 8 }}>
                Impact of your patches on climate
              </h6>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              margin: "16px 0",
              height: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "#FFEB3B",
                borderRadius: 8,
                padding: 16,
                width: "100%",
              }}
            >
              <div
                style={{
                  background: "#ffffff",
                  borderRadius: 26,
                  padding: 12,
                  height: 48,
                  width: 48,
                }}
              >
                <img src={Accounts} alt="Accounts" height={24} width={24} />
              </div>

              <div
                style={{
                  borderRadius: 100,
                  marginLeft: 16,
                }}
              >
                <h3 style={{ color: "#274B28", marginRight: 8 }}>
                  {`${accountDetails.jobs} jobs created`}
                </h3>
                <p
                  className="small-p"
                  style={{ color: "#757575", marginTop: 8 }}
                >
                  Your patches are creating
                  <strong style={{ color: "#000000", marginRight: 4 }}>
                    {` ${accountDetails.level}% `}
                  </strong>
                  more jobs compared to others
                </p>
              </div>
            </div>
          </div>
        </CardView>
      </div>
    </div>
  ) : (
    <NoData source={noData} />
  );
};

export default Dashboard;
