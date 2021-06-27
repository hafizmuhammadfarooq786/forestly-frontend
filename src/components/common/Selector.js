import React, { useState } from "react";
import ArrowDown from "../../assets/icons/chevron-down.svg";
import ArrowUp from "../../assets/icons/chevron-up.svg";

const Selector = ({ source, option }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownIndex, setDropdownIndex] = useState(0);
  const onHandleChange = (index, selectedOpt) => {
    setShowDropdown(!showDropdown);
    setDropdownIndex(index);
    option(selectedOpt);
  };
  return (
    <div style={{ position: "relative", marginLeft: 16 }}>
      <div
        style={{
          background: "#ffffff",
          display: "flex",
          width: "auto",
          borderRadius: 100,
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.12)",
          padding: "8px 24px",
          cursor: "pointer",
        }}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <h4 style={{ color: "#274B28" }}>{source[dropdownIndex].title}</h4>
        {showDropdown ? (
          <img
            src={ArrowUp}
            alt="arrow-up"
            style={{
              margin: "0 16px",
              height: 24,
              width: 24,
            }}
          />
        ) : (
          <img
            src={ArrowDown}
            alt="arrow-down"
            style={{
              margin: "0 16px",
              height: 24,
              width: 24,
            }}
          />
        )}
      </div>

      {showDropdown && (
        <div
          style={{
            position: "absolute",
            background: "#ffffff",
            width: 344,
            borderRadius: 8,
            padding: "8px 0",
            marginTop: 16,
            boxShadow: "0px 1px 18px rgba(0, 0, 0, 0.12)",
          }}
        >
          {source.map((detail, index) => (
            <>
              {index === dropdownIndex ? (
                <div
                  className="dropdown-items dropdown-items-active"
                  key={`dropdown-item-${index}`}
                  onClick={() => onHandleChange(index, detail.title)}
                >
                  <h5 style={{ color: "#274B28" }}>{detail.title}</h5>
                  <h6 style={{ color: "#757575", margin: "6px 0" }}>
                    {detail.description}
                  </h6>
                </div>
              ) : (
                <div
                  className="dropdown-items"
                  key={`dropdown-item-${index}`}
                  onClick={() => onHandleChange(index, detail.title)}
                >
                  <h5 style={{ color: "#274B28" }}>{detail.title}</h5>
                  <h6 style={{ color: "#757575", margin: "6px 0" }}>
                    {detail.description}
                  </h6>
                </div>
              )}
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default Selector;
