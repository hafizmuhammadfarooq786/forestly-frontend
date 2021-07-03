import React, { useState } from "react";
import ShareIcon from "../../../assets/icons/share-variant.svg";
import ShareMedia from "../ShareOnSocialMedia";
import EditForestName from "./EditForestName";
import CancelIcon from "../../../assets/icons/cross.png";

function SliderContent({ activeIndex, sliderImage }) {
  const [showShareCard, setShowShareCard] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [forestName, setForestName] = useState("");
  const [forestIconIndex, setForestIconIndex] = useState(0);

  return (
    <section>
      {sliderImage &&
        sliderImage.sliders.map((slide, index) => (
          <div
            key={index}
            className={index === activeIndex ? "slides active" : "inactive"}
          >
            <img
              className="slide-image"
              src={slide}
              alt={"slide" + index + 1}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                borderRadius: 8,
                justifyContent: "space-between",
                alignItems: "start",
                background:
                  "linear-gradient(179.65deg, #000000 0.31%, rgba(0, 0, 0, 0.4) 37.37%)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: 32,
                  marginLeft: 32,
                }}
              >
                <h2 className="slide-title">{sliderImage.name}</h2>
                <h4 className="slide-text">{sliderImage.description}</h4>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: 32,
                  marginRight: 32,
                }}
              >
                <div
                  style={{
                    background: "#F1FFF2",
                    border: "1px solid #274B28",
                    borderRadius: 100,
                    padding: "10px 32px 8px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setForestName(sliderImage.name);
                    setForestIconIndex(0);
                    setShowEditModal(!showEditModal);
                  }}
                >
                  <h3 style={{ color: "#274B28" }}>Edit Details</h3>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    margin: "4px 0 0 16px",
                  }}
                >
                  <h2 style={{ color: "#ffffff", marginRight: 16 }}>|</h2>
                  <div style={{ position: "relative" }}>
                    <img
                      onClick={() => {
                        setShowShareCard(!showShareCard);
                      }}
                      style={{ cursor: "pointer" }}
                      src={ShareIcon}
                      alt={ShareIcon}
                      height={24}
                      width={24}
                    />
                    {showShareCard && (
                      <div
                        style={{
                          position: "absolute",
                          right: 0,
                          top: -24,
                          background: "#ffffff",
                          boxShadow: "0px 1px 18px rgba(0, 0, 0, 0.12)",
                          border: "1px solid #EEEEEE",
                          borderRadius: 8,
                          width: 262,
                          height: 214,
                          zIndex: 20,
                          padding: "22px 24px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <p className="small-p" style={{ color: "#757575" }}>
                            Share unit details
                          </p>
                          <img
                            onClick={() => {
                              setShowShareCard(!showShareCard);
                            }}
                            style={{ cursor: "pointer" }}
                            src={CancelIcon}
                            alt={CancelIcon}
                            height={14}
                            width={14}
                          />
                        </div>
                        <div
                          style={{
                            marginTop: 12,
                          }}
                        >
                          <ShareMedia
                            hideCard={() => setShowShareCard(false)}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      <EditForestName
        name={forestName}
        index={forestIconIndex}
        showModal={showEditModal}
        closeModal={() => setShowEditModal(false)}
      />
    </section>
  );
}

export default SliderContent;
