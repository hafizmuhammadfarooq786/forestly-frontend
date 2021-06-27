import React, { useState, useEffect } from "react";

const SettingsTabs = ({ tabs, setTabName }) => {
  const [tabIndex, setIndex] = useState(0);

  const checkIndex = (activeIndex) => {
    if (tabIndex === activeIndex) {
      return true;
    }

    return false;
  };

  if (window.localStorage.getItem("editTab") === null) {
    window.localStorage.setItem("editTab", "account");
    setIndex(0);
  }

  useEffect(() => {
    if (window.localStorage.getItem("editTab") === null) {
      window.localStorage.setItem("editTab", "account");
      setIndex(0);
    } else {
      if (window.localStorage.getItem("editTab") === "account") {
        setIndex(0);
      } else if (window.localStorage.getItem("editTab") === "password") {
        setIndex(1);
      }
    }
  }, []);

  const handleChange = (index) => {
    if (index === 0) {
      window.localStorage.setItem("editTab", "account");
      setTabName("account");
      setIndex(0);
    } else if (index === 1) {
      window.localStorage.setItem("editTab", "password");
      setTabName("password");
      setIndex(1);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "start",
        flexDirection: "column",
        width: "100%",
        padding: "24px",
        maxWidth: 220,
      }}
    >
      {tabs &&
        tabs.length > 0 &&
        tabs.map((tab, index) => (
          <div
            style={{ display: "flex", alignItems: "center", paddingTop: 24 }}
          >
            {index === 0 && (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={checkIndex(index) && "active-icon"}
              >
                <path
                  d="M12 2C10.6868 2 9.38642 2.25866 8.17317 2.7612C6.95991 3.26375 5.85752 4.00035 4.92893 4.92893C3.05357 6.8043 2 9.34784 2 12C2 14.6522 3.05357 17.1957 4.92893 19.0711C5.85752 19.9997 6.95991 20.7362 8.17317 21.2388C9.38642 21.7413 10.6868 22 12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM7.07 18.28C7.5 17.38 10.12 16.5 12 16.5C13.88 16.5 16.5 17.38 16.93 18.28C15.57 19.36 13.86 20 12 20C10.14 20 8.43 19.36 7.07 18.28ZM18.36 16.83C16.93 15.09 13.46 14.5 12 14.5C10.54 14.5 7.07 15.09 5.64 16.83C4.62 15.5 4 13.82 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 13.82 19.38 15.5 18.36 16.83ZM12 6C10.06 6 8.5 7.56 8.5 9.5C8.5 11.44 10.06 13 12 13C13.94 13 15.5 11.44 15.5 9.5C15.5 7.56 13.94 6 12 6ZM12 11C11.6022 11 11.2206 10.842 10.9393 10.5607C10.658 10.2794 10.5 9.89782 10.5 9.5C10.5 9.10218 10.658 8.72064 10.9393 8.43934C11.2206 8.15804 11.6022 8 12 8C12.3978 8 12.7794 8.15804 13.0607 8.43934C13.342 8.72064 13.5 9.10218 13.5 9.5C13.5 9.89782 13.342 10.2794 13.0607 10.5607C12.7794 10.842 12.3978 11 12 11Z"
                  fill="#9E9E9E"
                />
              </svg>
            )}
            {index === 1 && (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={checkIndex(index) && "active-icon"}
              >
                <path
                  d="M12 17C10.89 17 10 16.1 10 15C10 13.89 10.89 13 12 13C12.5304 13 13.0391 13.2107 13.4142 13.5858C13.7893 13.9609 14 14.4696 14 15C14 15.5304 13.7893 16.0391 13.4142 16.4142C13.0391 16.7893 12.5304 17 12 17ZM18 20V10H6V20H18ZM18 8C18.5304 8 19.0391 8.21071 19.4142 8.58579C19.7893 8.96086 20 9.46957 20 10V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C4.89 22 4 21.1 4 20V10C4 8.89 4.89 8 6 8H7V6C7 4.67392 7.52678 3.40215 8.46447 2.46447C9.40215 1.52678 10.6739 1 12 1C12.6566 1 13.3068 1.12933 13.9134 1.3806C14.52 1.63188 15.0712 2.00017 15.5355 2.46447C15.9998 2.92876 16.3681 3.47995 16.6194 4.08658C16.8707 4.69321 17 5.34339 17 6V8H18ZM12 3C11.2044 3 10.4413 3.31607 9.87868 3.87868C9.31607 4.44129 9 5.20435 9 6V8H15V6C15 5.20435 14.6839 4.44129 14.1213 3.87868C13.5587 3.31607 12.7956 3 12 3Z"
                  fill="#9E9E9E"
                />
              </svg>
            )}

            <h1
              style={{
                color: checkIndex(index) ? "#274B28" : "#9E9E9E",
                background: "none",
                border: "none",
                fontSize: 16,
                lineHeight: "140%",
                marginLeft: 16,
                cursor: "pointer",
                fontWeight: 700,
              }}
              key={`tab-${index}`}
              onClick={() => handleChange(index)}
            >
              {tab}
            </h1>
          </div>
        ))}
    </div>
  );
};

export default SettingsTabs;
