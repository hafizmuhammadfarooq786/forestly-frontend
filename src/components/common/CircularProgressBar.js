import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./circular-progressbar.css";

const ChangingProgressProvider = (props) => {
  const [interval, setInterval] = useState(1000);
  const [valuesIndex, setValuesIndex] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setValuesIndex((valuesIndex + 1) % props.values.length);
    });
  }, [props.interval]);

  return <div> {props.children(props.values[valuesIndex])}</div>;
};

const CircularProgressBar = () => (
  <div style={{ height: 120, width: 120 }}>
    <ChangingProgressProvider values={[0, 38]}>
      {(percentage) => (
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%\nBio Diversity`}
          styles={buildStyles({
            strokeLinecap: "butt",
            pathTransition:
              percentage === 0 ? "none" : "stroke-dashoffset 1s ease 0s",
          })}
        />
      )}
    </ChangingProgressProvider>
  </div>
);
export default CircularProgressBar;
