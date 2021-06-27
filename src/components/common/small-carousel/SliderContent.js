import React from "react";

const SliderContent = ({ activeIndex, source }) => {
  return (
    <>
      {source.map((slideImage, index) => (
        <div
          key={index}
          className={index === activeIndex ? "slides active" : "inactive"}
        >
          <img className="slide-image" src={slideImage} alt="" />
        </div>
      ))}
    </>
  );
};

export default SliderContent;
