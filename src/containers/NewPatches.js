import React, { useState, useEffect } from "react";
import Selector from "../components/common/Selector";
import LoaderGif from "../components/common/LoaderGif";
import NoData from "../components/common/NoData";
import NoDataIllustration from "../assets/illustration/undraw_a_moment_to_relax_bbpa.svg";
import NewPatchDetails from "../components/common/NewPatchDetails";
import NewPatchCards from "../components/NewPatchCards";

const NewPatches = () => {
  const [pageLoading, setPageLoading] = useState(false);
  const [data, setData] = useState();
  const [selectedOption, setSelectedOption] = useState(null);

  const chunk = (myArray, chunk_size) => {
    var index = 0;
    var arrayLength = myArray.length;
    var tempArray = [];
    for (index = 0; index < arrayLength; index += chunk_size) {
      const myChunk = myArray.slice(index, index + chunk_size);
      tempArray.push(myChunk);
    }

    return tempArray;
  };

  const noData = {
    title: "No Forest Units",
    message:
      "We have no new forest units available. Please hold for a while, will add soon",
    imgSrc: NoDataIllustration,
    buttonText: "Back",
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
    stopPageLoading();
  }, [selectedOption]);

  const selectorSource = [
    {
      title: "All Countries",
      description: "Displays collective data for all forest patches",
    },
    { title: "Germany Forest", description: "Displays germany forest patches" },
    {
      title: "Pakistan Forest",
      description: "Displays pakistan forest patches",
    },
  ];

  return pageLoading ? (
    <LoaderGif />
  ) : data ? (
    <div className="content-body">
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2 style={{ color: "#274B28" }}>Available Forests</h2>
          <p
            style={{
              color: "#757575",
              margin: "12px 0",
              fontSize: 16,
              lineHeight: "20px",
            }}
          >
            You can see buy forest units and also see their details
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <h3 style={{ color: "#757575" }}>Viewing forests of</h3>
          <Selector
            option={(opt) => setSelectedOption(opt)}
            source={selectorSource}
            onRight={true}
          />
        </div>
      </div>

      <NewPatchCards dataSource={chunk(NewPatchDetails, 3)} />
    </div>
  ) : (
    <NoData source={noData} />
  );
};

export default NewPatches;
