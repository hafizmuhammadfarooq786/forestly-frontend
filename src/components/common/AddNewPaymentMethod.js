import React, { useState, useRef } from "react";
import { Form, Input, Modal, Select } from "antd";
import { CaretDownFilled } from "@ant-design/icons";
import LoadingFormButton from "./LoadingFormButton";

const AddNewPaymentMethod = (props) => {
  const { showModal, onClose } = props;
  const [enableSepa, setEnableSepa] = useState(false);
  const [paymentMethodName, setPaymentMethodName] =
    useState("Credit/Debit Card");

  const formRef = useRef();
  const { Option } = Select;

  const [debitEnabled, setDebitEnabled] = useState({
    cardHolderName: false,
    cardNumber: false,
    cardExpiryMonth: false,
    cardExpiryYear: false,
    cardCVV: false,
  });

  const [sepaEnabled, setSepaEnabled] = useState({
    cardHolderName: false,
    cardHolderEmail: false,
    cardIBAN: false,
  });

  const [debitEnabledValues, setDebitEnabledValues] = useState({
    cardHolderName: null,
    cardNumber: null,
    cardExpiryMonth: null,
    cardExpiryYear: null,
    cardCVV: null,
  });

  const [sepaEnabledValues, setSepaEnabledValues] = useState({
    cardHolderName: null,
    cardHolderEmail: null,
    cardIBAN: null,
  });

  const enablingDebitStatus = (enablerObject) => {
    if (
      enablerObject.cardHolderName &&
      enablerObject.cardNumber &&
      enablerObject.cardExpiryMonth &&
      enablerObject.cardExpiryYear &&
      enablerObject.cardCVV
    ) {
      return false;
    }

    return true;
  };

  const enablingSepaStatus = (enablerObject) => {
    if (
      enablerObject.cardHolderName &&
      enablerObject.cardHolderEmail &&
      enablerObject.cardIBAN
    ) {
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
    setDebitEnabled({
      cardHolderName: false,
      cardNumber: false,
      cardExpiryMonth: false,
      cardExpiryYear: false,
      cardCVV: false,
    });
    setSepaEnabled({
      cardHolderName: false,
      cardHolderEmail: false,
      cardIBAN: false,
    });
  };

  const updateProfileSettings = (values, onSuccess, onError) => {
    if (values) {
      values.paymentMethod = paymentMethodName;
      console.log(values);
      onSuccess();
    } else {
      onError("please enter valid values");
    }
  };

  const onFinish = async () => {
    setSubmitting(true);
    if (paymentMethodName === "Credit/Debit Card") {
      updateProfileSettings(
        debitEnabledValues,
        onFinishSuccess,
        onFinishFailed
      );
    } else if (paymentMethodName === "SEPA Direct Debit") {
      updateProfileSettings(sepaEnabledValues, onFinishSuccess, onFinishFailed);
    }
  };

  const [submitting, setSubmitting] = useState(false);
  const [open, setOpen] = useState(false);

  const paymentMethods = ["Credit/Debit Card", "SEPA Direct Debit"];

  return (
    <Modal
      visible={showModal}
      onCancel={onClose}
      footer={null}
      closable={false}
      style={{ top: 48 }}
      bodyStyle={{ backgroundColor: "#ffffff", padding: 0, borderRadius: 8 }}
      width={576}
      height={276}
    >
      <h2
        style={{
          color: "#274B28",
          padding: 32,
          borderBottom: "1px solid #E0E0E0",
          textTransform: "capitalize",
          fontWeight: 900,
        }}
      >
        Add new payment method
      </h2>

      <Form
        ref={formRef}
        layout="vertical"
        style={{ width: "100%", padding: 32 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div style={{ display: "flex", width: "100%" }}>
          <Form.Item
            className="update-form-item"
            rules={[
              {
                required: false,
              },
            ]}
            required={false}
          >
            <p
              style={{
                color: "#9E9E9E",
                fontSize: 16,
                lineHeight: "20px",
                margin: "0px 0 10px",
                wordSpacing: -2.5,
                fontWeight: 700,
              }}
            >
              Payment Method
            </p>
            <Select
              className="new-payment-form-select"
              suffixIcon={
                <CaretDownFilled
                  style={{ marginTop: -4 }}
                  onClick={() => setOpen(!open)}
                />
              }
              defaultValue={
                <h4
                  style={{
                    color: "#424242",
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  {paymentMethods[0]}
                </h4>
              }
              open={open}
              onSelect={(e) => {
                setOpen(!open);
                setPaymentMethodName(e);
                if (e === "SEPA Direct Debit") {
                  setEnableSepa(true);
                } else {
                  setEnableSepa(false);
                }
              }}
            >
              {Array.isArray(paymentMethods) &&
                paymentMethods.map((method, index) => {
                  return (
                    <Option value={method} key={`option-${index + 1}`}>
                      <h4
                        style={{
                          color: "#424242",
                          display: "flex",
                          alignItems: "center",
                          height: "100%",
                        }}
                      >
                        {method}
                      </h4>
                    </Option>
                  );
                })}
            </Select>
          </Form.Item>
        </div>

        {enableSepa ? (
          <>
            <div style={{ display: "flex", width: "100%" }}>
              <Form.Item
                style={{
                  width: "100%",
                  height: "100%",
                  position: "relative",
                  padding: 0,
                  border: "none",
                  display: "flex",
                  flexDirection: "column",
                }}
                rules={[
                  {
                    required: true,
                    message: "Name is required",
                  },
                ]}
                required={false}
              >
                <p
                  style={{
                    color: "#9E9E9E",
                    fontSize: 16,
                    lineHeight: "20px",
                    margin: 0,
                    wordSpacing: -2.5,
                    fontWeight: 700,
                  }}
                >
                  Name
                </p>
                <Input
                  type="text"
                  onChange={(e) => {
                    if (e.target.value !== "" && e.target.value !== null) {
                      setSepaEnabled({
                        ...sepaEnabled,
                        cardHolderName: true,
                      });

                      setSepaEnabledValues({
                        ...sepaEnabledValues,
                        cardHolderName: e.target.value,
                      });
                    } else {
                      setSepaEnabled({
                        ...sepaEnabled,
                        cardHolderName: true,
                      });
                      setSepaEnabledValues({
                        ...sepaEnabledValues,
                        cardHolderName: null,
                      });
                    }
                  }}
                  style={{
                    height: 64,
                    color: "#424242",
                    background: "#FAFAFA",
                    borderRadius: 8,
                    border: "1px solid #E0E0E0",
                    fontSize: 18,
                    padding: "0px 0px 0px 16px",
                    lineHeight: "23px",
                    boxShadow: "none",
                    margin: "10px 0 0",
                    width: "100%",
                  }}
                />
              </Form.Item>
            </div>

            <div style={{ display: "flex", width: "100%" }}>
              <Form.Item
                style={{
                  width: "100%",
                  height: "100%",
                  position: "relative",
                  padding: 0,
                  border: "none",
                  display: "flex",
                  flexDirection: "column",
                }}
                rules={[
                  {
                    required: true,
                    message: "Email address is required",
                  },
                ]}
                required={false}
              >
                <p
                  style={{
                    color: "#9E9E9E",
                    fontSize: 16,
                    lineHeight: "20px",
                    margin: 0,
                    wordSpacing: -2.5,
                    fontWeight: 700,
                  }}
                >
                  Email address
                </p>
                <Input
                  type="email"
                  onChange={(e) => {
                    if (e.target.value !== "" && e.target.value !== null) {
                      setSepaEnabled({
                        ...sepaEnabled,
                        cardHolderEmail: true,
                      });
                      setSepaEnabledValues({
                        ...sepaEnabledValues,
                        cardHolderEmail: e.target.value,
                      });
                    } else {
                      setSepaEnabled({
                        ...sepaEnabled,
                        cardHolderEmail: true,
                      });
                      setSepaEnabledValues({
                        ...sepaEnabledValues,
                        cardHolderEmail: null,
                      });
                    }
                  }}
                  style={{
                    height: 64,
                    color: "#424242",
                    background: "#FAFAFA",
                    borderRadius: 8,
                    border: "1px solid #E0E0E0",
                    fontSize: 18,
                    padding: "0px 0px 0px 16px",
                    lineHeight: "23px",
                    boxShadow: "none",
                    margin: "10px 0 0",
                    width: "100%",
                  }}
                />
              </Form.Item>
            </div>

            <div style={{ display: "flex", width: "100%" }}>
              <Form.Item
                style={{
                  width: "100%",
                  height: "100%",
                  position: "relative",
                  padding: 0,
                  border: "none",
                  display: "flex",
                  flexDirection: "column",
                }}
                rules={[
                  {
                    required: true,
                    message: "IBAN number is required",
                  },
                ]}
                required={false}
              >
                <p
                  style={{
                    color: "#9E9E9E",
                    fontSize: 16,
                    lineHeight: "20px",
                    margin: 0,
                    wordSpacing: -2.5,
                    fontWeight: 700,
                  }}
                >
                  IBAN Number
                </p>
                <Input
                  type="text"
                  onChange={(e) => {
                    if (e.target.value !== "" && e.target.value !== null) {
                      setSepaEnabled({
                        ...sepaEnabled,
                        cardIBAN: true,
                      });
                      setSepaEnabledValues({
                        ...sepaEnabledValues,
                        cardIBAN: e.target.value,
                      });
                    } else {
                      setSepaEnabled({
                        ...sepaEnabled,
                        cardIBAN: true,
                      });
                      setSepaEnabledValues({
                        ...sepaEnabledValues,
                        cardIBAN: null,
                      });
                    }
                  }}
                  style={{
                    height: 64,
                    color: "#424242",
                    background: "#FAFAFA",
                    borderRadius: 8,
                    border: "1px solid #E0E0E0",
                    fontSize: 18,
                    padding: "0px 0px 0px 16px",
                    lineHeight: "23px",
                    boxShadow: "none",
                    margin: "10px 0 0",
                    width: "100%",
                  }}
                />
              </Form.Item>
            </div>
          </>
        ) : (
          <>
            <div style={{ display: "flex", width: "100%" }}>
              <Form.Item
                style={{
                  width: "100%",
                  height: "100%",
                  position: "relative",
                  padding: 0,
                  border: "none",
                  display: "flex",
                  flexDirection: "column",
                }}
                rules={[
                  {
                    required: true,
                    message: "Card holder name is required",
                  },
                ]}
                required={false}
              >
                <p
                  style={{
                    color: "#9E9E9E",
                    fontSize: 16,
                    lineHeight: "20px",
                    margin: 0,
                    wordSpacing: -2.5,
                    fontWeight: 700,
                  }}
                >
                  Card Holder Name
                </p>
                <Input
                  type="text"
                  onChange={(e) => {
                    if (e.target.value !== "" && e.target.value !== null) {
                      setDebitEnabled({
                        ...debitEnabled,
                        cardHolderName: true,
                      });
                      setDebitEnabledValues({
                        ...debitEnabledValues,
                        cardHolderName: e.target.value,
                      });
                    } else {
                      setDebitEnabled({
                        ...debitEnabled,
                        cardHolderName: false,
                      });
                      setDebitEnabledValues({
                        ...debitEnabledValues,
                        cardHolderName: null,
                      });
                    }
                  }}
                  style={{
                    height: 64,
                    color: "#424242",
                    background: "#FAFAFA",
                    borderRadius: 8,
                    border: "1px solid #E0E0E0",
                    fontSize: 18,
                    padding: "0px 0px 0px 16px",
                    lineHeight: "23px",
                    boxShadow: "none",
                    margin: "10px 0 0",
                    width: "100%",
                  }}
                />
              </Form.Item>
            </div>
            <div style={{ display: "flex", width: "100%" }}>
              <Form.Item
                style={{
                  width: "100%",
                  height: "100%",
                  position: "relative",
                  padding: 0,
                  border: "none",
                  display: "flex",
                  flexDirection: "column",
                }}
                rules={[
                  {
                    required: true,
                    message: "Card number is required",
                  },
                ]}
                required={false}
              >
                <p
                  style={{
                    color: "#9E9E9E",
                    fontSize: 16,
                    lineHeight: "20px",
                    margin: 0,
                    wordSpacing: -2.5,
                    fontWeight: 700,
                  }}
                >
                  Card Number
                </p>
                <Input
                  type="number"
                  maxlength="16"
                  onChange={(e) => {
                    if (e.target.value !== "" && e.target.value !== null) {
                      setDebitEnabled({
                        ...debitEnabled,
                        cardNumber: true,
                      });
                      setDebitEnabledValues({
                        ...debitEnabledValues,
                        cardNumber: e.target.value,
                      });
                    } else {
                      setDebitEnabled({
                        ...debitEnabled,
                        cardNumber: false,
                      });
                      setDebitEnabledValues({
                        ...debitEnabledValues,
                        cardNumber: null,
                      });
                    }
                  }}
                  style={{
                    height: 64,
                    color: "#424242",
                    background: "#FAFAFA",
                    borderRadius: 8,
                    border: "1px solid #E0E0E0",
                    fontSize: 18,
                    lineHeight: "23px",
                    boxShadow: "none",
                    margin: "10px 0 0",
                    padding: "0px 0px 0px 16px",
                    width: "100%",
                  }}
                />
              </Form.Item>
            </div>
            <div style={{ display: "flex", width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Form.Item
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    padding: 0,
                    border: "none",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Expiry month is required",
                    },
                  ]}
                  required={false}
                >
                  <p
                    style={{
                      color: "#9E9E9E",
                      fontSize: 16,
                      lineHeight: "20px",
                      margin: 0,
                      wordSpacing: -2.5,
                      fontWeight: 700,
                    }}
                  >
                    Expiry Month
                  </p>
                  <Input
                    type="number"
                    onChange={(e) => {
                      if (e.target.value !== "" && e.target.value !== null) {
                        setDebitEnabled({
                          ...debitEnabled,
                          cardExpiryMonth: true,
                        });
                        setDebitEnabledValues({
                          ...debitEnabledValues,
                          cardExpiryMonth: e.target.value,
                        });
                      } else {
                        setDebitEnabled({
                          ...debitEnabled,
                          cardExpiryMonth: false,
                        });
                        setDebitEnabledValues({
                          ...debitEnabledValues,
                          cardExpiryMonth: null,
                        });
                      }
                    }}
                    style={{
                      height: 64,
                      color: "#424242",
                      background: "#FAFAFA",
                      borderRadius: 8,
                      border: "1px solid #E0E0E0",
                      fontSize: 18,
                      lineHeight: "23px",
                      boxShadow: "none",
                      margin: "10px 0 0",
                      padding: "0px 0px 0px 16px",
                      width: 154,
                    }}
                  />
                </Form.Item>

                <Form.Item
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    padding: 0,
                    margin: "0 24px",
                    border: "none",
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Expiry year is required",
                    },
                  ]}
                  required={false}
                >
                  <p
                    style={{
                      color: "#9E9E9E",
                      fontSize: 16,
                      lineHeight: "20px",
                      margin: 0,
                      wordSpacing: -2.5,
                      fontWeight: 700,
                    }}
                  >
                    Expiry Year
                  </p>
                  <Input
                    type="number"
                    onChange={(e) => {
                      if (e.target.value !== "" && e.target.value !== null) {
                        setDebitEnabled({
                          ...debitEnabled,
                          cardExpiryYear: true,
                        });
                        setDebitEnabledValues({
                          ...debitEnabledValues,
                          cardExpiryYear: e.target.value,
                        });
                      } else {
                        setDebitEnabled({
                          ...debitEnabled,
                          cardExpiryYear: false,
                        });
                        setDebitEnabledValues({
                          ...debitEnabledValues,
                          cardExpiryYear: null,
                        });
                      }
                    }}
                    style={{
                      height: 64,
                      color: "#424242",
                      background: "#FAFAFA",
                      borderRadius: 8,
                      border: "1px solid #E0E0E0",
                      fontSize: 18,
                      lineHeight: "23px",
                      boxShadow: "none",
                      margin: "10px 0 0",
                      padding: "0px 0px 0px 16px",
                      width: 154,
                    }}
                  />
                </Form.Item>

                <Form.Item
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    padding: 0,
                    border: "none",
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Security code is required",
                    },
                  ]}
                  required={false}
                >
                  <p
                    style={{
                      color: "#9E9E9E",
                      fontSize: 16,
                      lineHeight: "20px",
                      margin: 0,
                      wordSpacing: -2.5,
                      fontWeight: 700,
                    }}
                  >
                    Security Code
                  </p>
                  <Input
                    type="number"
                    onChange={(e) => {
                      if (e.target.value !== "" && e.target.value !== null) {
                        setDebitEnabled({
                          ...debitEnabled,
                          cardCVV: true,
                        });
                        setDebitEnabledValues({
                          ...debitEnabledValues,
                          cardCVV: e.target.value,
                        });
                      } else {
                        setDebitEnabled({
                          ...debitEnabled,
                          cardCVV: true,
                        });
                        setDebitEnabledValues({
                          ...debitEnabledValues,
                          cardCVV: null,
                        });
                      }
                    }}
                    style={{
                      height: 64,
                      color: "#424242",
                      background: "#FAFAFA",
                      borderRadius: 8,
                      border: "1px solid #E0E0E0",
                      fontSize: 18,
                      lineHeight: "23px",
                      boxShadow: "none",
                      margin: "10px 0 0",
                      padding: "0px 0px 0px 16px",
                      width: 154,
                    }}
                  />
                </Form.Item>
              </div>
            </div>
          </>
        )}

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
            onClick={onClose}
          >
            <h4 style={{ color: "#757575" }}>Cancel</h4>
          </div>

          {enableSepa && (
            <LoadingFormButton
              submitting={submitting}
              label="Submit"
              className={
                enablingSepaStatus(sepaEnabled)
                  ? "update-button-disable"
                  : "update-button"
              }
            />
          )}

          {!enableSepa && (
            <LoadingFormButton
              submitting={submitting}
              label="Submit"
              className={
                enablingDebitStatus(debitEnabled)
                  ? "update-button-disable"
                  : "update-button"
              }
            />
          )}
        </div>
      </Form>
    </Modal>
  );
};

export default AddNewPaymentMethod;
