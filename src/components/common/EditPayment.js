import React, { useState, useRef } from "react";
import { Modal, Form, Input } from "antd";
import LoadingFormButton from "./LoadingFormButton";
import PencileOutline from "../../assets/icons/pencil-outline.svg";
import LightCalendar from "../../assets/icons/calendar-light.svg";
import DarkCalendar from "../../assets/icons/calendar-dark.svg";
import RedCross from "../../assets/icons/close-circle.svg";
import GreenTick from "../../assets/icons/check-circle.svg";
import PulseLoader from "./PulseLoader";
import BackArrow from "../../assets/icons/arrow-left.svg";

const EditPayment = ({ source, paymentID, visible, onClose }) => {
  const [updateSource, setUpdateSource] = useState(source);
  const [submitting, setSubmitting] = useState(false);
  const [beforeUpdateAreaValue, setBeforeUpdateAreaValue] = useState(0);
  const [updateAreaValue, setUpdateAreaValue] = useState(false);
  const [editArea, setEditArea] = useState(false);
  const [showPulseLoader, setShowPulseLoader] = useState(false);
  const [editCardDetails, setEditCardDetails] = useState(false);

  const formRef = useRef();

  const addSpacesInCardNumber = (number) => {
    let updatedNumber = number.match(/.{1,4}/g);
    return updatedNumber.join(" ");
  };

  const [enabled, setEnabled] = useState({
    cardNumber: false,
    cardHolderName: false,
    cardExpiryMonth: false,
    cardExpiryYear: false,
    cardCVV: false,
  });

  const onUpdateFailed = async () => {
    setSubmitting(false);
    console.log("There is nothing to update");
  };

  const onGoBack = () => {
    setEditCardDetails(false);
  };
  const onUpdateSuccess = (values) => {
    setSubmitting(true);
    if (Object.keys(values).length) {
      console.log("updated successfully");
      for (var i = 0; i < updateSource.length; i++) {
        if (updateSource[i].id === paymentID) {
          setUpdateSource([
            ...updateSource,
            (updateSource[i].cardNumber = values.cardNumber),
          ]);
          setUpdateSource([
            ...updateSource,
            (updateSource[i].cardHolderName = values.cardHolderName),
          ]);
          setUpdateSource([
            ...updateSource,
            (updateSource[i].cardExpiryMonth = values.cardExpiryMonth),
          ]);
          setUpdateSource([
            ...updateSource,
            (updateSource[i].cardExpiryYear = values.cardExpiryYear),
          ]);
          setUpdateSource([
            ...updateSource,
            (updateSource[i].cardCVV = values.cardCVV),
          ]);
          setEditCardDetails(false);
          setSubmitting(false);
        }
      }
    } else {
      setEditCardDetails(false);
      onUpdateFailed();
    }
  };

  const onUpdateCardDetails = async (values) => {
    console.log(values);
    onUpdateSuccess(values);
  };

  const enablingStatus = (enablerObject) => {
    if (enablerObject.cardNumber) {
      return false;
    }
    if (enablerObject.cardHolderName) {
      return false;
    }
    if (enablerObject.cardExpiry) {
      return false;
    }
    if (enablerObject.cardCVV) {
      return false;
    }
    return true;
  };

  const finishLoading = () => {
    setShowPulseLoader(false);
  };
  const stopLoading = () => {
    setTimeout(finishLoading, 1000);
  };

  const unsubscribe = () => {
    console.log("click to un subscribe plan");
  };

  const onChangeArea = async (area, idx) => {
    setShowPulseLoader(true);
    if (updateAreaValue) {
      stopLoading();
      const calculatePayment = area * 2;
      setUpdateSource([...updateSource, (updateSource[idx].area = area)]);
      setUpdateSource([
        ...updateSource,
        (updateSource[idx].payable = calculatePayment),
      ]);
    }
  };

  const onUpdateArea = async () => {
    if (beforeUpdateAreaValue === updateAreaValue) {
      setEditArea(false);
    } else {
      setEditArea(false);
      console.log(updateAreaValue);
    }
  };

  const onDone = async () => {
    setSubmitting(true);
  };

  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      footer={null}
      closable={false}
      style={{ top: 24 }}
      bodyStyle={{ backgroundColor: "#ffffff", padding: 0, borderRadius: 8 }}
      width={576}
    >
      {updateSource &&
        updateSource.map((payment, index) => (
          <div style={{ height: "100%", width: "100%" }} key={index + 1}>
            {payment.id === paymentID && (
              <>
                {editCardDetails ? (
                  <div
                    style={{
                      height: 666,
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      style={{
                        padding: "28px 24px",
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                        borderBottom: "1px solid #E0E0E0",
                      }}
                    >
                      <img
                        src={BackArrow}
                        alt={BackArrow}
                        height={24}
                        width={24}
                        onClick={() => onGoBack()}
                      />
                      <h2
                        style={{
                          color: "#274B28",
                          marginLeft: 16,
                        }}
                      >
                        {`Manage Payment Method`}
                      </h2>
                    </div>

                    <div
                      className="settings-main"
                      style={{
                        padding: "24px",
                      }}
                    >
                      <Form
                        ref={formRef}
                        layout="vertical"
                        style={{ width: "100%" }}
                        onFinish={onUpdateCardDetails}
                        onFinishFailed={onUpdateFailed}
                      >
                        <div
                          style={{
                            display: "flex",
                            width: "100%",
                          }}
                        >
                          <Form.Item
                            className="settings-form-item"
                            style={{ padding: 0 }}
                            label={
                              <label className="settings-label">
                                Payment Method
                              </label>
                            }
                            name="paymentMethod"
                            initialValue={payment.paymentMethod}
                            rules={[
                              {
                                required: true,
                                message: "Payment method is required",
                              },
                            ]}
                            required={false}
                          >
                            <Input
                              type="text"
                              disabled={true}
                              className="settings-value"
                            />
                          </Form.Item>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            width: "100%",
                            marginTop: 24,
                          }}
                        >
                          <Form.Item
                            className="settings-form-item"
                            style={{ padding: 0 }}
                            label={
                              <label className="settings-label">
                                Card Holder Name
                              </label>
                            }
                            name="cardHolderName"
                            initialValue={payment.cardHolderName}
                            rules={[
                              {
                                required: true,
                                message: "Card holder name is required",
                              },
                            ]}
                            required={false}
                          >
                            <Input
                              type="text"
                              className="settings-value"
                              onChange={(e) => {
                                e.target.value.localeCompare(
                                  payment.cardHolderName
                                ) !== 0
                                  ? setEnabled({
                                      ...enabled,
                                      cardHolderName: true,
                                    })
                                  : setEnabled({
                                      ...enabled,
                                      cardHolderName: false,
                                    });
                              }}
                            />
                          </Form.Item>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            width: "100%",
                            marginTop: 24,
                          }}
                        >
                          <Form.Item
                            className="settings-form-item"
                            style={{ padding: 0 }}
                            label={
                              <label className="settings-label">
                                Card Number
                              </label>
                            }
                            name="cardNumber"
                            initialValue={payment.cardNumber}
                            rules={[
                              {
                                required: true,
                                message: "Card number is required",
                              },
                            ]}
                            required={false}
                          >
                            <Input
                              type="text"
                              className="settings-value"
                              onChange={(e) => {
                                e.target.value.localeCompare(
                                  payment.cardNumber
                                ) !== 0
                                  ? setEnabled({
                                      ...enabled,
                                      cardNumber: true,
                                    })
                                  : setEnabled({
                                      ...enabled,
                                      cardNumber: false,
                                    });
                              }}
                            />
                          </Form.Item>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            width: "100%",
                            marginTop: 24,
                          }}
                        >
                          <Form.Item
                            className="settings-form-item"
                            style={{ marginRight: 16, padding: 0 }}
                            label={
                              <label className="settings-label">
                                Expiry Month
                              </label>
                            }
                            name="cardExpiryMonth"
                            initialValue={payment.cardExpiryMonth}
                            rules={[
                              {
                                required: true,
                                message: "Expiry month is required",
                              },
                            ]}
                            required={false}
                          >
                            <Input
                              type="text"
                              className="settings-value"
                              onChange={(e) => {
                                e.target.value.localeCompare(
                                  payment.cardExpiryMonth
                                ) !== 0
                                  ? setEnabled({
                                      ...enabled,
                                      cardExpiryMonth: true,
                                    })
                                  : setEnabled({
                                      ...enabled,
                                      cardExpiryMonth: false,
                                    });
                              }}
                            />
                          </Form.Item>

                          <Form.Item
                            className="settings-form-item"
                            style={{ marginRight: 16, padding: 0 }}
                            label={
                              <label className="settings-label">
                                Expiry Year
                              </label>
                            }
                            name="cardExpiryYear"
                            initialValue={payment.cardExpiryYear}
                            rules={[
                              {
                                required: true,
                                message: "Expriy year is required",
                              },
                            ]}
                            required={false}
                          >
                            <Input
                              type="text"
                              className="settings-value"
                              onChange={(e) => {
                                e.target.value.localeCompare(
                                  payment.cardExpiryYear
                                ) !== 0
                                  ? setEnabled({
                                      ...enabled,
                                      cardExpiryYear: true,
                                    })
                                  : setEnabled({
                                      ...enabled,
                                      cardExpiryYear: false,
                                    });
                              }}
                            />
                          </Form.Item>

                          <Form.Item
                            className="settings-form-item"
                            style={{ padding: 0 }}
                            label={
                              <label className="settings-label">CVV</label>
                            }
                            name="cardCVV"
                            initialValue={payment.cardCVV}
                            rules={[
                              {
                                required: true,
                                message: "Security code is required",
                              },
                            ]}
                            required={false}
                          >
                            <Input
                              type="text"
                              className="settings-value"
                              onChange={(e) => {
                                e.target.value.localeCompare(
                                  payment.cardCVV
                                ) !== 0
                                  ? setEnabled({
                                      ...enabled,
                                      cardCVV: true,
                                    })
                                  : setEnabled({
                                      ...enabled,
                                      cardCVV: false,
                                    });
                              }}
                            />
                          </Form.Item>
                        </div>

                        <div
                          style={{
                            marginTop: 64,
                            display: "flex",
                            justifyContent: "flex-end",
                            width: "100%",
                          }}
                        >
                          <div
                            style={{
                              background: "#F5F5F5",
                              borderRadius: 100,
                              cursor: "pointer",
                              width: 176,
                              height: 46,
                              marginRight: 24,
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            onClick={onGoBack}
                          >
                            <h4 style={{ color: "#757575" }}>Cancel</h4>
                          </div>

                          <LoadingFormButton
                            submitting={submitting}
                            status={enablingStatus(enabled)}
                            label="Submit"
                            style={{ width: 176, height: 44 }}
                            className={
                              enablingStatus(enabled)
                                ? "update-button-disable"
                                : "update-button"
                            }
                          />
                        </div>
                      </Form>
                    </div>
                  </div>
                ) : (
                  <div style={{ padding: 24 }}>
                    <h2
                      style={{
                        color: "#274B28",
                      }}
                    >
                      {payment.name}
                    </h2>

                    <p
                      className="small-p"
                      style={{
                        color: "#757575",
                        margin: "16px 0 0",
                      }}
                    >
                      {payment.description}
                    </p>

                    <div style={{ marginTop: 24 }}>
                      {payment.overdue ? (
                        <div className="overdue">
                          <img
                            src={LightCalendar}
                            alt={LightCalendar}
                            height={24}
                            width={24}
                          />
                          <p
                            style={{
                              fontSize: 16,
                              lineHeight: "20px",
                              margin: "0px 0px 0px 8px",
                            }}
                          >
                            {`Your payment is overdue.`}
                          </p>
                        </div>
                      ) : (
                        <div className="within-due">
                          <div
                            style={{
                              display: "flex",
                              width: "100%",
                              alignItems: "center",
                            }}
                          >
                            <img
                              src={DarkCalendar}
                              alt={DarkCalendar}
                              height={24}
                              width={24}
                            />
                            <p
                              style={{
                                fontSize: 16,
                                lineHeight: "20px",
                                margin: "0px 0px 0px 8px",
                                color: "#424242",
                              }}
                            >
                              {`Your next payment is `}
                              <b style={{ color: "#424242" }}>
                                {`($ ${payment.payable})`}
                              </b>
                              {` is due on `}
                              <b
                                style={{ color: "#424242" }}
                              >{` ${payment.nextDate}`}</b>
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div
                      style={{
                        marginTop: 32,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                      }}
                    >
                      <h4
                        style={{
                          color: "#424242",
                        }}
                      >
                        Your patch area & payable amount
                      </h4>

                      {editArea ? (
                        <div
                          style={{
                            width: "100%",
                            marginTop: 16,
                            boxShadow: "0px 1px 8px rgba(0, 0, 0, 0.12)",
                            borderRadius: 8,
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              width: "100%",
                              position: "relative",
                              height: 56,
                              borderTopLeftRadius: 8,
                              borderTopRightRadius: 8,
                            }}
                          >
                            <Form.Item
                              style={{
                                minWidth: "100%",
                                width: "100%",
                                height: "100%",
                                position: "relative",
                                padding: 0,
                                border: "none",
                                background: "#ffffff",
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
                                defaultValue={updateAreaValue}
                                type="number"
                                placeholder="Area in square meters"
                                min="0"
                                onChange={(e) => {
                                  if (Number(e.target.value) !== 0) {
                                    onChangeArea(Number(e.target.value), index);
                                    setUpdateAreaValue(Number(e.target.value));
                                  }
                                }}
                                style={{
                                  height: 56,
                                  color: "#424242",
                                  border: "none",
                                  fontSize: 18,
                                  lineHeight: 23,
                                  boxShadow: "none",
                                }}
                              />
                            </Form.Item>

                            <div
                              style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "center",
                                height: "100%",
                                position: "absolute",
                                right: 0,
                              }}
                            >
                              <img
                                src={RedCross}
                                alt={RedCross}
                                height={24}
                                width={24}
                                style={{
                                  marginRight: 10,
                                  cursor: "pointer",
                                }}
                                onClick={() => setEditArea(false)}
                              />

                              <img
                                src={GreenTick}
                                alt={GreenTick}
                                height={24}
                                width={24}
                                style={{
                                  marginRight: 16,
                                  cursor: "pointer",
                                }}
                                onClick={onUpdateArea}
                              />
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              background: "#FAFAFA",
                              padding: 16,
                              borderBottonLeftRadius: 8,
                              borderBottomRightRadius: 8,
                            }}
                          >
                            <h4
                              style={{
                                color: "#757575",
                              }}
                            >
                              {`Calculated Payable Amount`}
                            </h4>

                            {showPulseLoader ? (
                              <PulseLoader />
                            ) : (
                              <h4
                                style={{
                                  color: "#424242",
                                }}
                              >
                                {`${payment.payable} $`}
                              </h4>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            boxShadow: "0px 1px 8px rgba(0, 0, 0, 0.12)",
                            marginTop: 16,
                            borderRadius: 8,
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              background: "#ffffff",
                              padding: 16,
                              borderTopLeftRadius: 8,
                              borderTopRightRadius: 8,
                            }}
                          >
                            <h4
                              style={{
                                color: "#424242",
                              }}
                            >
                              {`${payment.area} Square Meters`}
                            </h4>
                            <img
                              src={PencileOutline}
                              alt={PencileOutline}
                              height={24}
                              width={24}
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                setBeforeUpdateAreaValue(payment.area);
                                setUpdateAreaValue(payment.area);
                                setEditArea(true);
                              }}
                            />
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              background: "#FAFAFA",
                              padding: 16,
                              borderBottonLeftRadius: 8,
                              borderBottomRightRadius: 8,
                            }}
                          >
                            <h4
                              style={{
                                color: "#757575",
                              }}
                            >
                              {`Calculated Payable Amount`}
                            </h4>
                            <h4
                              style={{
                                color: "#424242",
                              }}
                            >
                              {`${payment.payable} $`}
                            </h4>
                          </div>
                        </div>
                      )}
                    </div>

                    <div
                      style={{
                        marginTop: 32,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                      }}
                    >
                      <h4
                        style={{
                          color: "#424242",
                        }}
                      >
                        Your payment plan and method
                      </h4>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          background: "#ffffff",
                          boxShadow: "0px 1px 8px rgba(0, 0, 0, 0.12)",
                          borderRadius: 8,
                          marginTop: 16,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            background: "#ffffff",
                            padding: 16,
                            borderTopLeftRadius: 8,
                            borderTopRightRadius: 8,
                          }}
                        >
                          <h4
                            style={{
                              color: "#424242",
                            }}
                          >
                            {`${payment.subscription}`}
                          </h4>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            background: "#FAFAFA",
                            padding: 16,
                            borderBottonLeftRadius: 8,
                            borderBottomRightRadius: 8,
                          }}
                        >
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <img
                              src={payment.imgSrc}
                              alt={`payment-icon`}
                              height={40}
                              width={40}
                            />
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                marginLeft: 16,
                              }}
                            >
                              {payment.cardType === "master" && (
                                <h4
                                  style={{
                                    color: "#757575",
                                  }}
                                >
                                  {`Master Card - ${addSpacesInCardNumber(
                                    payment.cardNumber
                                  )}`}
                                </h4>
                              )}

                              {payment.cardType === "visa" && (
                                <h4
                                  style={{
                                    color: "#757575",
                                  }}
                                >
                                  {`VISA Card - ${addSpacesInCardNumber(
                                    payment.cardNumber
                                  )}`}
                                </h4>
                              )}
                              <p
                                className="small-p"
                                style={{
                                  color: "#757575",
                                  margin: "8px 0 0",
                                }}
                              >
                                {`Expires ${payment.cardExpiryMonth}-${payment.cardExpiryYear}`}
                              </p>
                            </div>
                          </div>
                          <img
                            src={PencileOutline}
                            alt={PencileOutline}
                            height={24}
                            width={24}
                            style={{ cursor: "pointer" }}
                            onClick={() => setEditCardDetails(true)}
                          />
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        marginTop: 32,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "#FFEBEE",
                        borderRadius: 8,
                        padding: "10px 0",
                        cursor: "pointer",
                      }}
                      onClick={unsubscribe}
                    >
                      <h5
                        style={{
                          color: "#F44336",
                          fontWeight: 900,
                        }}
                      >
                        Unsuscribe from current plan
                      </h5>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column" }}>
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
                            width: 176,
                            textAlign: "center",
                          }}
                          onClick={onClose}
                        >
                          <h4 style={{ color: "#757575" }}>Cancel</h4>
                        </div>

                        <LoadingFormButton
                          submitting={submitting}
                          label="Done"
                          onClick={onDone}
                          style={{ width: 176 }}
                          className={"update-button"}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
    </Modal>
  );
};

export default EditPayment;
