import React from "react";

const CardView = (props) => {
  return (
    <div
      className={
        props.large ? "card-view large-card-view" : "card-view small-card-view"
      }
    >
      {props.children}
    </div>
  );
};

export default CardView;
