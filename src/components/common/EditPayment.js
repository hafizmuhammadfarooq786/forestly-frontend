import React, { useState } from "react";
import { Modal } from "antd";
import LoadingFormButton from "./LoadingFormButton";
import PencileOutline from "../../assets/icons/pencil-outline.svg";
import LightCalendar from "../../assets/icons/calendar-light.svg";
import DarkCalendar from "../../assets/icons/calendar-dark.svg";

const EditPayment = ({ source, paymentID, visible, onClose }) => {
  const [submitting, setSubmitting] = useState(false);

  //   const [enabled, setEnabled] = useState({
  //     area: false,
  //   });

  //   const enablingStatus = (enablerObject) => {
  //     if (enablerObject.area) {
  //       return false;
  //     }
  //     return true;
  //   };

  //   const onFinishFailed = async (error) => {
  //     setSubmitting(false);
  //     console.log(error);
  //   };

  //   const onFinishSuccess = async () => {
  //     setSubmitting(false);
  //     setEnabled({
  //       area: false,
  //     });
  //   };

  const onDone = async () => {
    setSubmitting(true);
  };

  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      footer={null}
      closable={false}
      style={{ top: 72 }}
      bodyStyle={{ backgroundColor: "#ffffff", padding: 24, borderRadius: 8 }}
      width={576}
    >
      {source &&
        source.map((payment) => (
          <>
            {payment.id === paymentID && (
              <div>
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
                            {`($ ${payment.nextPaymentAmount})`}
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
                        justifyContent: "space-between",
                        background: "#ffffff",
                        padding: 16,
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
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        background: "#FAFAFA",
                        padding: 16,
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
                        {`${payment.nextPaymentAmount} $`}
                      </h4>
                    </div>
                  </div>
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
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
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
                              {`Master Card - ${payment.cardNumber}`}
                            </h4>
                          )}

                          {payment.cardType === "visa" && (
                            <h4
                              style={{
                                color: "#757575",
                              }}
                            >
                              {`VISA Card - ${payment.cardNumber}`}
                            </h4>
                          )}
                          <p
                            className="small-p"
                            style={{
                              color: "#757575",
                              margin: "8px 0 0",
                            }}
                          >
                            {`Expires ${payment.cardExpiry}`}
                          </p>
                        </div>
                      </div>
                      <img
                        src={PencileOutline}
                        alt={PencileOutline}
                        height={24}
                        width={24}
                      />
                    </div>
                  </div>
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
        ))}
    </Modal>
  );
};

export default EditPayment;
