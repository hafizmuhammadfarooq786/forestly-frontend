import React, { useState, useRef, useEffect } from "react";
import { Form, Input, Select, Modal, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import Camera from "../assets/icons/camera.png";
import Cropper from "react-cropper";
import Loading from "../components/common/Loading";
import CrossIcon from "../assets/icons/cross.png";
import LoadingButton from "../components/common/LoadingButton";
import { createNotification } from "../store/app/actions";
import { updateProfileSettings } from "../store/settings/actions";
import {
  fetchSettings,
  setSettings,
  updateProfilePicture,
} from "../store/settings/actions";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const StyledLink = styled(NavLink)`
  text-align: left !important;
  color: #ffffff !important;
  font-family: "Circular Std";
  font-size: 15px;
  line-height: 21px;
  font-weight: 400;
  text-decoration: underline !important;
  cursor: pointer !important;
  &:hover {
    color: #ffffff !important;
    text-decoration: underline !important;
    cursor: pointer !important;
  }
`;

const Settings = () => {
  const { settings } = useSelector((state) => state.settings);
  const formRef = useRef();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [modalOptions, setModalOptions] = useState(false);
  const { Option } = Select;
  const [image, setImage] = useState("");
  const [cropper, setCropper] = useState();

  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
      setModalOptions(true);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = async () => {
    if (typeof cropper !== "undefined") {
      setModalOptions(false);
      dispatch(
        updateProfilePicture(
          cropper.getCroppedCanvas().toDataURL(),
          onFinishSuccess,
          onFinishFailed
        )
      );
    }
  };

  const onFinishFailed = (error) => {
    setLoading(false);
    dispatch(createNotification("error-toast", error));
  };

  const onFinishSuccess = () => {
    setLoading(false);
    fetchAllSettings();
  };

  const onFinish = async (values) => {
    setLoading(true);
    values.username = settings["username"];
    dispatch(updateProfileSettings(values, onFinishSuccess, onFinishFailed));
  };

  const onFailure = (error) => {
    setLoading(false);
    dispatch(createNotification("error-toast", error));
  };

  const onSuccess = () => {
    setLoading(false);
  };
  const onCancel = () => setModalOptions(false);

  const fetchAllSettings = () => {
    dispatch(setSettings(null));
    setLoading(true);
    dispatch(fetchSettings(onSuccess, onFailure));
  };

  useEffect(() => {
    fetchAllSettings();
  }, []);

  return (
    <Loading active={loading}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          margin: "1rem 0 2rem",
          justifyContent: "space-between",
        }}
      >
        <p
          style={{
            color: "white",
            fontFamily: "Circular Std",
            fontWeight: 900,
            textTransform: "uppercase",
            fontSize: "28px",
            lineHeight: "35.42px",
            margin: "0px",
            letterSpacing: "2px",
          }}
        >
          Settings
        </p>
      </div>

      {settings && settings !== null && settings !== undefined && (
        <div
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ position: "relative", display: "flex" }}>
            <img
              src={settings.profile_pic["profile_img_url"]}
              alt="profile-icon"
              style={{
                width: "183px",
                height: "183px",
                background: "white",
                padding: "3px",
                borderRadius: "50%",
              }}
            />
            <div
              style={{
                position: "absolute",
                right: "12px",
                bottom: "0",
                background: "#FED64B",
                padding: "8px 12px",
                borderRadius: "50%",
              }}
            >
              <input type="file" id="actual-btn" onChange={onChange} hidden />
              <label
                style={{
                  cursor: "pointer",
                }}
                htmlFor="actual-btn"
              >
                <img
                  src={Camera}
                  alt="camera-icon"
                  style={{
                    height: "16.59px",
                    width: "21.1px",
                  }}
                />
              </label>
            </div>
          </div>

          <Form
            ref={formRef}
            layout="vertical"
            style={{ width: "50%", marginTop: "3rem" }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <div style={{ display: "flex", width: "100%" }}>
              <Form.Item
                style={{
                  width: "100%",
                  fontSize: "16px",
                  margin: "0 1rem 8px 0",
                }}
                label={
                  <label
                    style={{
                      color: "#828282",
                      fontFamily: "Circular Std",
                    }}
                  >
                    First name
                  </label>
                }
                name="first_name"
                initialValue={settings.first_name}
                rules={[
                  {
                    required: true,
                    message: "First name is required",
                  },
                ]}
                required={false}
              >
                <Input
                  type="text"
                  style={{
                    borderRadius: 5,
                    backgroundColor: "#151515",
                    borderColor: "1px solid #FFFFFFF",
                    color: "white",
                    height: "51px",
                    fontFamily: "Circular Std",
                    fontSize: "16px",
                  }}
                />
              </Form.Item>
              <Form.Item
                style={{ width: "100%", margin: "0 0 8px" }}
                label={
                  <label
                    style={{
                      color: "#828282",
                      fontFamily: "Circular Std",
                      fontSize: "16px",
                    }}
                  >
                    Last name
                  </label>
                }
                name="last_name"
                initialValue={settings.last_name}
                rules={[
                  {
                    required: true,
                    message: "Last name is required",
                  },
                ]}
                required={false}
              >
                <Input
                  type="text"
                  style={{
                    borderRadius: 5,
                    backgroundColor: "#151515",
                    borderColor: "1px solid #FFFFFFF",
                    color: "white",
                    height: "51px",
                    fontFamily: "Circular Std",
                    fontSize: "16px",
                  }}
                />
              </Form.Item>
            </div>
            <div style={{ display: "flex", width: "100%" }}>
              <Form.Item
                style={{
                  width: "100%",
                  minWidth: "100%",
                  margin: "0 0 8px",
                  fontWeight: 400,
                  fontSize: "16px",
                }}
                label={
                  <label
                    style={{
                      color: "#828282",
                      fontFamily: "Circular Std",
                    }}
                  >
                    Coach type
                  </label>
                }
                name="coach_type"
                initialValue={settings.coach_type}
                rules={[
                  {
                    required: true,
                    message:
                      "Please select coach type from the available options",
                  },
                ]}
                required={false}
              >
                <Select
                  style={{ minWidth: "100%", width: "100%" }}
                  onChange={(value) => {
                    console.log(value);
                  }}
                  className="coach-types"
                  name="coach_type"
                >
                  {Array.isArray(settings.coach_type_options) &&
                    settings.coach_type_options.map(
                      (coachTypeOption, index) => {
                        return (
                          <Option
                            value={coachTypeOption}
                            style={{
                              width: "100%",
                              fontWeight: 400,
                              fontSize: "16px",
                            }}
                            key={`option-${index + 1}`}
                          >
                            {coachTypeOption}
                          </Option>
                        );
                      }
                    )}
                </Select>
              </Form.Item>
            </div>
            <div style={{ display: "flex", width: "100%" }}>
              <Form.Item
                style={{
                  width: "100%",
                  fontSize: "16px",
                  margin: "0 0 8px",
                }}
                label={
                  <label
                    style={{
                      color: "#828282",
                      fontFamily: "Circular Std",
                    }}
                  >
                    Email
                  </label>
                }
                name="email"
                initialValue={settings.email}
                rules={[
                  {
                    required: true,
                    message: "Please enter valid email address",
                  },
                ]}
                required={false}
              >
                <Input
                  type="email"
                  style={{
                    borderRadius: 5,
                    backgroundColor: "#151515",
                    borderColor: "1px solid #FFFFFFF",
                    color: "white",
                    height: "51px",
                    fontFamily: "Circular Std",
                    fontSize: "16px",
                  }}
                />
              </Form.Item>
            </div>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "flex-start",
                margin: "0.5rem 0 0",
              }}
            >
              <StyledLink to="/dashboard/update-password">
                Change Password
              </StyledLink>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <LoadingButton
                submitting={loading}
                label="UPDATE"
                style={{
                  minWidth: "100%",
                  height: "50px",
                  borderRadius: "8px",
                  backgroundColor: "#FED64B",
                  borderColor: "#FED64B",
                  fontFamily: "Circular Std",
                  marginTop: "1rem",
                }}
                className="send-invites"
              />
            </div>
          </Form>
        </div>
      )}

      <Modal
        visible={modalOptions}
        onCancel={onCancel}
        footer={null}
        closable={false}
        style={{ top: "36px" }}
        bodyStyle={{
          backgroundColor: "#151515",
          color: "white",
          padding: 60,
          borderRadius: 16,
          height: 512,
        }}
        width={"70vw"}
      >
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <img
            src={CrossIcon}
            alt={"close_icon"}
            style={{ height: "1em", width: "1em", cursor: "pointer" }}
            onClick={onCancel}
          />
        </div>

        <div style={{ width: "100%" }}>
          <Cropper
            style={{ height: 300, width: "100%" }}
            initialAspectRatio={1}
            src={image}
            viewMode={1}
            scaleX={1}
            scaleY={1}
            guides={true}
            minCropBoxHeight={200}
            minCropBoxWidth={200}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false}
            onInitialized={(instance) => {
              setCropper(instance);
            }}
          />
        </div>
        <div
          className="box"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "24px",
          }}
        >
          <Button
            htmlType="button"
            onClick={getCropData}
            style={{
              minWidth: "238px",
              height: "50px",
              borderRadius: "8px",
              backgroundColor: "#FED64B",
              borderColor: "#FED64B",
              fontFamily: "Circular Std",
              marginTop: "1rem",
              cursor: "pointer",
            }}
          >
            <p color="#151515" className="send-invites">
              Upload
            </p>
          </Button>
        </div>
      </Modal>
    </Loading>
  );
};

export default Settings;
