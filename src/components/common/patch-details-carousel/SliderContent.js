import React from "react";

function SliderContent({ activeIndex, sliderImage }) {
  return (
    <section>
      {sliderImage &&
        sliderImage.trees.map((treeDetails, index) => (
          <div
            key={index}
            className={index === activeIndex ? "slides active" : "inactive"}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                background: "#5BCD63",
                boxShadow: "",
                borderRadius: 8,
                padding: "32px 24px",
              }}
            >
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.46)",
                  borderRadius: "50%",
                  padding: 16,
                }}
              >
                <img
                  className="slide-image"
                  src={treeDetails.imageRef}
                  alt={"imageRef" + index + 1}
                  height={64}
                  width={64}
                />
              </div>
              <div
                style={{
                  marginTop: 32,
                  marginBottom: 32,
                  width: "90%",
                }}
              >
                <h2 className="slide-title">Your forest patch has</h2>
                <h2 className="slide-title">
                  <strong style={{ color: "#000000" }}>
                    {`${treeDetails.count}% `}
                  </strong>
                  {` ${treeDetails.name}`}
                </h2>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <div
                  style={{
                    background: "rgba(0, 0, 0, 0.15)",
                    borderRadius: 8,
                    padding: "12px 16px",
                    width: 148,
                  }}
                >
                  <h3 className="slide-title">{treeDetails.maxHeight}</h3>
                  <p className="slide-text">Max Height</p>
                </div>
                <div
                  style={{
                    background: "rgba(0, 0, 0, 0.15)",
                    borderRadius: 8,
                    padding: "12px 16px",
                    marginLeft: 16,
                    width: 148,
                  }}
                >
                  <h3 className="slide-title">
                    {treeDetails.maxAge} <span className="slide-text">Yrs</span>
                  </h3>
                  <p className="slide-text">Max Age</p>
                </div>
              </div>
            </div>
          </div>
        ))}
    </section>
  );
}

export default SliderContent;
