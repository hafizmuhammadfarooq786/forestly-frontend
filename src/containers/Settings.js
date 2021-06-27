import React, { useState, useRef, useEffect } from "react";
import { Form, Input } from "antd";
import ComponentLoading from "../components/common/ComponentLoading";
import SettingsTabs from "../components/common/SettingsTabs";
import LoadingFormButton from "../components/common/LoadingFormButton";

const Settings = () => {
  const [pageLoading, setPageLoading] = useState(false);
  const [activeTabName, setActiveTabName] = useState(null);
  const formRef = useRef();
  const [submitting, setSubmitting] = useState(false);
  const [enabled, setEnabled] = useState({
    first_name: false,
    last_name: false,
    email: false,
  });

  const [enabledForPassword, setEnabledForPassword] = useState({
    old_password: false,
    new_password: false,
  });

  const enablingStatus = (enablerObject) => {
    if (enablerObject.first_name) {
      return false;
    }
    if (enablerObject.last_name) {
      return false;
    }
    if (enablerObject.email) {
      return false;
    }
    return true;
  };

  const enablingStatusForPassword = (enablerObject) => {
    if (enablerObject.old_password && enablerObject.new_password) {
      return false;
    }
    return true;
  };

  const onFinishFailed = async (error) => {
    setSubmitting(false);
    console.log(error);
  };

  const finishLoading = () => {
    setPageLoading(false);
  };
  const stopPageLoading = () => {
    setTimeout(finishLoading, 1000);
  };

  const settingsData = {
    first_name: "Muhammad",
    last_name: "Farooq",
    email: "fahadmuhammad661@gmail.com",
  };

  const onFinishSettings = async (values) => {
    setSubmitting(true);
    console.log(values);
  };

  const onFinishPassword = async (values) => {
    setSubmitting(true);
    console.log(values);
  };

  useEffect(() => {
    setPageLoading(true);
    setActiveTabName(window.localStorage.getItem("editTab"));
    stopPageLoading();
  }, []);

  return (
    <ComponentLoading active={pageLoading}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "start",
          width: "100%",
          marginTop: 16,
        }}
      >
        <h2 style={{ color: "#274B28" }}>Account Settings</h2>
        <p
          style={{
            color: "#757575",
            margin: "12px 0",
            fontSize: 18,
            lineHeight: "24px",
          }}
        >
          Change your profile and account settings
        </p>

        <div
          style={{
            background: "#ffffff",
            borderRadius: 8,
            boxShadow: "0px 1px 8px rgba(0, 0, 0, 0.12)",
            width: "100%",
            height: 520,
            marginTop: 24,
          }}
        >
          <div style={{ display: "flex", height: "100%" }}>
            <SettingsTabs
              tabs={["Account", "Password"]}
              setTabName={(name) => setActiveTabName(name)}
            />

            <div
              style={{
                borderLeft: "1px solid #EEEEEE",
                padding: 32,
                width: "100%",
                height: "100%",
              }}
            >
              {activeTabName === "account" && (
                <div
                  className="settings-main"
                  style={{ height: "100%", position: "relative" }}
                >
                  <h3 style={{ color: "#274B28", marginTop: 16 }}>
                    Basic Information
                  </h3>
                  <Form
                    ref={formRef}
                    layout="vertical"
                    style={{ width: "100%", marginTop: 30 }}
                    onFinish={onFinishSettings}
                    onFinishFailed={onFinishFailed}
                  >
                    <div
                      style={{ display: "flex", width: "100%", marginTop: 12 }}
                    >
                      <Form.Item
                        className="settings-form-item"
                        style={{ marginRight: 16 }}
                        label={
                          <label className="settings-label">First name</label>
                        }
                        name="first_name"
                        initialValue={settingsData.first_name}
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
                          className="settings-value"
                          onChange={(e) => {
                            e.target.value.localeCompare(
                              settingsData.first_name
                            ) !== 0
                              ? setEnabled({ ...enabled, first_name: true })
                              : setEnabled({ ...enabled, first_name: false });
                          }}
                        />
                      </Form.Item>
                      <Form.Item
                        className="settings-form-item"
                        label={
                          <label className="settings-label">Last name</label>
                        }
                        name="last_name"
                        initialValue={settingsData.last_name}
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
                          className="settings-value"
                          onChange={(e) => {
                            e.target.value.localeCompare(
                              settingsData.last_name
                            ) !== 0
                              ? setEnabled({ ...enabled, last_name: true })
                              : setEnabled({ ...enabled, last_name: false });
                          }}
                        />
                      </Form.Item>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        width: "50%",
                        marginRight: 16,
                        marginTop: 12,
                      }}
                    >
                      <Form.Item
                        className="settings-form-item"
                        label={<label className="settings-label">Email</label>}
                        name="email"
                        initialValue={settingsData.email}
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
                          className="settings-value"
                          onChange={(e) => {
                            e.target.value.localeCompare(settingsData.email) !==
                            0
                              ? setEnabled({ ...enabled, email: true })
                              : setEnabled({ ...enabled, email: false });
                          }}
                        />
                      </Form.Item>
                    </div>

                    <div
                      style={{
                        position: "absolute",
                        bottom: 24,
                        right: 24,
                      }}
                    >
                      <LoadingFormButton
                        submitting={submitting}
                        status={enablingStatus(enabled)}
                        label="Save Changes"
                        style={{ maxWidth: 220 }}
                        className={
                          enablingStatus(enabled)
                            ? "update-button-disable"
                            : "update-button"
                        }
                      />
                    </div>
                  </Form>
                </div>
              )}

              {activeTabName === "password" && (
                <div
                  className="settings-main"
                  style={{ height: "100%", position: "relative" }}
                >
                  <h3 style={{ color: "#274B28", marginTop: 16 }}>
                    Change Password
                  </h3>
                  <Form
                    ref={formRef}
                    layout="vertical"
                    style={{ width: "100%", marginTop: 30 }}
                    onFinish={onFinishPassword}
                    onFinishFailed={onFinishFailed}
                  >
                    <div style={{ display: "flex", width: "100%" }}>
                      <Form.Item
                        className="settings-form-item"
                        style={{ marginRight: 16 }}
                        label={
                          <label className="settings-label">Old Password</label>
                        }
                        name="old_password"
                        initialValue={""}
                        rules={[
                          {
                            required: true,
                            message: "Old password is required",
                          },
                        ]}
                        required={false}
                      >
                        <Input.Password
                          placeholder="Old password"
                          className="settings-value"
                          onChange={(e) => {
                            e.target.value.length > 0
                              ? setEnabledForPassword({
                                  ...enabledForPassword,
                                  old_password: true,
                                })
                              : setEnabledForPassword({
                                  ...enabledForPassword,
                                  old_password: false,
                                });
                          }}
                        />
                      </Form.Item>
                      <Form.Item
                        className="settings-form-item"
                        label={
                          <label className="settings-label">New Password</label>
                        }
                        name="new_password"
                        initialValue={""}
                        rules={[
                          {
                            required: true,
                            message: "New password is required",
                          },
                        ]}
                        required={false}
                      >
                        <Input.Password
                          placeholder="New password"
                          className="settings-value"
                          onChange={(e) => {
                            e.target.value.length > 0
                              ? setEnabledForPassword({
                                  ...enabledForPassword,
                                  new_password: true,
                                })
                              : setEnabledForPassword({
                                  ...enabledForPassword,
                                  new_password: false,
                                });
                          }}
                        />
                      </Form.Item>
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        bottom: 24,
                        right: 24,
                      }}
                    >
                      <LoadingFormButton
                        submitting={submitting}
                        status={enablingStatusForPassword(enabledForPassword)}
                        label="Save Changes"
                        style={{ maxWidth: 220 }}
                        className={
                          enablingStatusForPassword(enabledForPassword)
                            ? "update-button-disable"
                            : "update-button"
                        }
                      />
                    </div>
                  </Form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ComponentLoading>
  );
};

export default Settings;
