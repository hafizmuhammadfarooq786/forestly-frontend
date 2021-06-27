import React, { useState, useRef } from "react";
import { Form, Input, Modal, Select } from "antd";
import LoadingFormButton from "../LoadingFormButton";
import ForestIcons from "../ForestIcons";
import ArrowDown from "../../../assets/icons/chevron-down.svg";

export const DownArrow = ({ clickAction }) => {
  return (
    <img
      src={ArrowDown}
      alt="arrow-down"
      style={{
        height: 28,
        width: 28,
        cursor: "pointer",
        marginTop: "-1rem",
      }}
      onClick={clickAction}
    />
  );
};

const EditCardDetails = (props) => {
  const { showModal, closeModal } = props;

  const formRef = useRef();
  const { Option } = Select;

  const [enabled, setEnabled] = useState({
    name: false,
    icon: false,
  });

  const enablingStatus = (enablerObject) => {
    if (enablerObject.name) {
      return false;
    }
    if (enablerObject.icon) {
      return false;
    }
    return true;
  };

  const onFinishFailed = async (error) => {
    setSubmitting(false);
    console.log(error);
  };

  const onFinishSuccess = async () => {
    setSubmitting(false);
    setEnabled({
      area: false,
      cardNumber: false,
    });
  };

  const updateProfileSettings = (values, onSuccess, onError) => {
    if (values) {
      onSuccess();
    } else {
      onError("please enter valid values");
    }
  };

  const onFinish = async (values) => {
    if (Object.keys(values).length) {
      setSubmitting(true);
      updateProfileSettings(values, onFinishSuccess, onFinishFailed);
    } else {
      onFinishFailed("There is nothing to update");
      closeModal();
    }
  };

  const [submitting, setSubmitting] = useState(false);

  return (
    <Modal
      visible={showModal}
      onCancel={closeModal}
      footer={null}
      closable={false}
      style={{ top: 48 }}
      bodyStyle={{ backgroundColor: "#ffffff", padding: 24, borderRadius: 8 }}
      width={576}
      height={276}
    >
      <h4
        style={{
          color: "#424242",
        }}
      >
        Edit Forest Details
      </h4>

      <p
        className="small-p"
        style={{
          color: "#757575",
          margin: "16px 0 0",
        }}
      >
        Change forest name or customize your forest icon
      </p>

      <div className="update-form" style={{ display: "flex" }}>
        <Form
          ref={formRef}
          layout="vertical"
          style={{ width: "100%", marginTop: 16 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <div style={{ display: "flex", width: "100%" }}>
            <Form.Item
              className="update-form-item"
              label={``}
              rules={[
                {
                  required: false,
                },
              ]}
              required={false}
            >
              <Select
                className="update-form-select"
                suffixIcon={<DownArrow />}
                defaultValue={
                  <img
                    src={ForestIcons[props.index]}
                    alt={"forest-icon"}
                    height={32}
                    width={32}
                  />
                }
                onSelect={(e) => {
                  setEnabled({ ...enabled, icon: true });
                }}
              >
                {Array.isArray(ForestIcons) &&
                  ForestIcons.map((icon, index) => {
                    return (
                      <Option
                        value={ForestIcons[index]}
                        key={`option-${index + 1}`}
                      >
                        <img src={icon} alt={icon} height={32} width={32} />
                      </Option>
                    );
                  })}
              </Select>
            </Form.Item>
            <Form.Item
              className="update-form-item"
              style={{
                minWidth: "100%",
                width: "100%",
                position: "relative",
                margin: "0 0 0 16",
              }}
              rules={[
                {
                  required: true,
                  message: "Forest name is required",
                },
              ]}
              required={false}
            >
              <Input
                defaultValue={props.name}
                type="text"
                placeholder="Forest name"
                className="update-form-value"
                onChange={(e) => {
                  e.target.value.localeCompare(props.name) !== 0
                    ? setEnabled({ ...enabled, name: true })
                    : setEnabled({ ...enabled, name: false });
                }}
              />
            </Form.Item>
          </div>

          <div
            style={{
              marginTop: 24,
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <div
              style={{
                background: "#F5F5F5",
                borderRadius: 100,
                padding: "10px 24px 8px",
                cursor: "pointer",
                marginRight: 16,
              }}
              onClick={closeModal}
            >
              <h4 style={{ color: "#757575" }}>Cancel</h4>
            </div>

            <LoadingFormButton
              submitting={submitting}
              status={enablingStatus(enabled)}
              label="Submit"
              className={
                enablingStatus(enabled)
                  ? "update-button-disable"
                  : "update-button"
              }
            />
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default EditCardDetails;
