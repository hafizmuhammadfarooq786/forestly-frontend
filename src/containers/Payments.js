import React, { useState, useEffect } from "react";
import LoaderGif from "../components/common/LoaderGif";
import NoData from "../components/common/NoData";
import SearchBar from "../components/SearchBar";
import NoDataIllustration from "../assets/illustration/undraw_empty_street_sfxm.svg";
import PaymentDetails from "../components/common/PaymentDetails";
import PaymentCard from "../components/common/PaymentCard";

const Payments = () => {
  const [pageLoading, setPageLoading] = useState(false);
  const [data, setData] = useState();
  // Search bar
  const [isSearchActive, setSearchActive] = useState(false);
  const [searchedDataSource, setSearchedDataSource] = useState(data);
  const noData = {
    title: "No Payment Plans",
    message:
      "You have no payment plans because you have not bought any forest unit. In order to see your plans, buys some forest units",
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
          dataSource={PaymentDetails}
          status={true}
        />
      </div>

      <PaymentCard
        searchActive={isSearchActive}
        searchedSource={searchedDataSource}
        dataSource={PaymentDetails}
      />
    </div>
  ) : (
    <NoData source={noData} />
  );
};

export default Payments;
