import React, { useState } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import CrossIcon from "../assets/icons/cross.png";

const SearchBar = ({
  searchFor,
  setSearch,
  status,
  searchedData,
  dataSource,
}) => {
  const [showCross, setShowCross] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  console.log(searchFor);

  // clear search input and hide cross icon
  const clearSearch = () => {
    setSearch(false);
    setShowCross(false);
    setSearchInput("");
  };

  const searchItem = (items, searchText) => {
    var result = items.filter((item) =>
      Object.keys(item).some(
        (k) =>
          item[k] != null &&
          item[k].toString().toLowerCase().includes(searchText.toLowerCase())
      )
    );
    return result;
  };

  const handleChange = (e) => {
    const searchText = e.target.value;
    setShowCross(true);
    setSearch(true);
    setSearchInput(searchText);
    const data = dataSource;
    const rs = searchItem(data, searchText);
    searchedData(rs);
  };

  return status ? (
    <div className="search-field">
      <Input
        type="text"
        value={searchInput}
        onChange={handleChange}
        prefix={<SearchOutlined />}
        placeholder={`Search your units`}
        style={{
          borderRadius: 8,
          backgroundColor: "#FFFFFF",
          border: "none",
          boxShadow: "0px 1px 8px rgba(0, 0, 0, 0.12)",
          padding: "11px 28px",
        }}
      />
      {showCross && (
        <img
          src={CrossIcon}
          alt="cross-icon"
          style={{
            height: 20,
            width: 20,
            cursor: "pointer",
            marginLeft: 16,
            marginTop: 24,
          }}
          onClick={clearSearch}
        />
      )}
    </div>
  ) : (
    <div className="search-field">
      <Input
        type="text"
        value={searchInput}
        disabled={true}
        onChange={handleChange}
        prefix={<SearchOutlined />}
        placeholder="Search your units"
        style={{
          borderRadius: 4,
          backgroundColor: "#0101010d",
          border: "none",
          padding: "11px 28px",
        }}
      />
    </div>
  );
};

export default SearchBar;
