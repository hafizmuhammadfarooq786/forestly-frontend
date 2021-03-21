import React from "react";
import { Modal } from "antd";
import CrossIcon from "../../assets/icons/cross.png";

const InfoModal = (props) => {
  const {
    modalOptions: { visible, content, title },
    setModalOptions,
  } = props;

  const onCancel = () => setModalOptions({ visible: false, content: {} });

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      footer={null}
      closable={false}
      style={{ top: 0 }}
      bodyStyle={{ backgroundColor: "#151515", color: "white", padding: 60 }}
      width={"70vw"}
    >
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <img
          src={CrossIcon}
          alt={"close_icon"}
          style={{ height: "1em", width: "1em" }}
          onClick={onCancel}
        />
      </div>
      <p
        style={{
          fontFamily: "Circular Std",
          fontWeight: 900,
          fontSize: "28px",
          lineHeight: "35.42px",
        }}
      >
        {title}
      </p>

      <p
        style={{
          fontFamily: "Circular Std",
          fontWeight: 900,
          fontSize: "16px",
          lineHeight: "20.24px",
          marginBottom: 0,
        }}
      >
        What
      </p>

      <p
        style={{
          fontFamily: "Circular Std",
          fontWeight: 400,
          fontSize: "16px",
          lineHeight: "24px",
          marginBottom: 20,
          wordSpacing: "-4px",
        }}
      >
        {content !== undefined && content.overview}
      </p>

      <p
        style={{
          fontFamily: "Circular Std",
          fontWeight: 900,
          fontSize: "16px",
          lineHeight: "20.24px",
          marginBottom: 0,
        }}
      >
        Why
      </p>

      <p
        style={{
          fontFamily: "Circular Std",
          fontWeight: 400,
          fontSize: "16px",
          lineHeight: "24px",
          marginBottom: 20,
          wordSpacing: "-4px",
        }}
      >
        {content !== undefined && content.insight}
      </p>

      <p
        style={{
          fontFamily: "Circular Std",
          fontWeight: 900,
          fontSize: "16px",
          lineHeight: "20.24px",
          marginBottom: 0,
        }}
      >
        References
      </p>

      {content !== undefined &&
        content.references !== undefined &&
        content.references.length > 0 &&
        content.references.map((reference) => (
          <p
            style={{
              fontFamily: "Circular Std",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "24px",
              wordSpacing: "-4px",
            }}
          >
            {reference.name !== undefined ? reference.name : reference.text}
          </p>
        ))}
    </Modal>
  );
};

export default InfoModal;
