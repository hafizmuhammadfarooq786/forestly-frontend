import React, { useState, useEffect } from "react";
import LoaderGif from "../components/common/LoaderGif";
import NoData from "../components/common/NoData";
import SearchBar from "../components/SearchBar";
import PatchCard from "../components/common/PatchCard";
import NoDataIllustration from "../assets/illustration/undraw_a_moment_to_relax_bbpa.svg";
import PlusIcon from "../assets/icons/plus-circle-outline-light.svg";
import PatchDetails from "../components/common/PatchDetails";
import { history } from "../index";

const Patches = () => {
  const [pageLoading, setPageLoading] = useState(false);
  const [data, setData] = useState();
  // Search bar
  const [isSearchActive, setSearchActive] = useState(false);
  const [searchedDataSource, setSearchedDataSource] = useState(data);

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
    stopPageLoading();
  }, []);

  return pageLoading ? (
    <LoaderGif />
  ) : data ? (
    <div className="content-body">
      <div style={{ display: "flex", width: "100%" }}>
        <SearchBar
          searchFor={`patches-screen`}
          setSearch={(status) => setSearchActive(status)}
          searchedData={(source) => setSearchedDataSource(source)}
          dataSource={PatchDetails}
          status={true}
        />
        <div
          style={{
            display: "flex",
            background: "#274B28",
            padding: "20px 24px",
            minWidth: 224,
            height: 64,
            marginLeft: 16,
            boxShadow: "0px 1px 8px rgba(0, 0, 0, 0.12)",
            cursor: "pointer",
          }}
          onClick={() => {
            history.push("/dashboard/patches/new");
          }}
        >
          <img src={PlusIcon} alt="PlusIcon" height={24} width={24} />
          <h3 style={{ color: "#ffffff", marginLeft: 8 }}>Buy New Patch</h3>
        </div>
      </div>

      <PatchCard
        searchActive={isSearchActive}
        searchedSource={searchedDataSource}
        dataSource={PatchDetails}
      />
    </div>
  ) : (
    <NoData source={noData} />
  );
};

export default Patches;
