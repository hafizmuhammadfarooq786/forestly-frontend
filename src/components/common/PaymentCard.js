import React, { useState, useEffect } from "react";
import CashUSD from "../../assets/icons/cash-usd-outline.svg";
import AreaOutline from "../../assets/icons/area-check-outline.svg";
import PencileOutline from "../../assets/icons/pencil-outline.svg";
import Receipt from "../../assets/icons/receipt.svg";
import LightCalendar from "../../assets/icons/calendar-light.svg";
import DarkCalendar from "../../assets/icons/calendar-dark.svg";
import EditPayment from "./EditPayment";
import PaymentHistory from "./PaymentHistory";

const PaymentCard = ({ searchActive, searchedSource, dataSource }) => {
  const [payments, setPayments] = useState(null);
  const [paymentId, setPaymentId] = useState(null);
  const [showEditPayment, setShowEditPayment] = useState(false);
  const [showPaymentHistory, setShowPaymentHistory] = useState(false);

  useEffect(() => {
    setPayments(dataSource);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {payments &&
        payments.map((payment, index) => (
          <>
            <div className="payment-card" key={`payment-card-` + index + 1}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  width: "100%",
                }}
              >
                <h2 style={{ color: "#274B28" }}>{payment.name}</h2>
                <p
                  style={{
                    color: "#757575",
                    fontSize: 18,
                    lineHeight: "23px",
                    margin: "8px 0 0",
                  }}
                >
                  {payment.description}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    width: "100%",
                  }}
                >
                  <div className="payment-details">
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                      }}
                    >
                      <div className="payment-circle-icon">
                        <img
                          src={AreaOutline}
                          alt={AreaOutline}
                          height={24}
                          width={24}
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          marginLeft: 16,
                        }}
                      >
                        <h3 style={{ color: "#274B28" }}>{payment.area}</h3>
                        <p
                          style={{
                            color: "#274B28",
                            fontSize: 16,
                            lineHeight: "20px",
                            margin: "4px 0 0",
                          }}
                        >
                          Sq Meters
                        </p>
                      </div>
                    </div>
                    <div style={{ display: "flex", width: "100%" }}>
                      <div className="payment-circle-icon">
                        <img
                          src={CashUSD}
                          alt={CashUSD}
                          height={24}
                          width={24}
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          marginLeft: 16,
                        }}
                      >
                        <h3 style={{ color: "#274B28" }}>{payment.payable}</h3>
                        <p
                          style={{
                            color: "#274B28",
                            fontSize: 16,
                            lineHeight: "20px",
                            margin: "4px 0 0",
                          }}
                        >
                          {`Payable Amount`}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", marginLeft: 44 }}>
                  <div style={{ display: "flex", width: "100%" }}>
                    <div
                      className="payment-light-circle-icon"
                      onClick={() => {
                        setPaymentId(payment.id);
                        setShowPaymentHistory(true);
                        console.log("show history");
                      }}
                    >
                      <img src={Receipt} alt={Receipt} height={24} width={24} />
                    </div>
                  </div>
                  <div
                    style={{ display: "flex", width: "100%", marginLeft: 24 }}
                  >
                    <div
                      className="payment-light-circle-icon"
                      onClick={() => {
                        setPaymentId(payment.id);
                        setShowEditPayment(true);
                      }}
                    >
                      <img
                        src={PencileOutline}
                        alt={PencileOutline}
                        height={24}
                        width={24}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {payment.overdue ? (
              <div
                className="overdue"
                style={{ boxShadow: "0px 1px 8px rgba(0, 0, 0, 0.12)" }}
              >
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
                  {`Your payment is overdue. Please update your payment method`}
                </p>
              </div>
            ) : (
              <div
                className="within-due"
                style={{ boxShadow: "0px 1px 8px rgba(0, 0, 0, 0.12)" }}
              >
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
                    <b style={{ color: "#424242" }}>{` ${payment.nextDate}`}</b>
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <img
                    src={payment.imgSrc}
                    alt={"card-icon"}
                    height={24}
                    width={24}
                  />
                  <p
                    style={{
                      fontSize: 16,
                      lineHeight: "20px",
                      margin: 8,
                    }}
                  >
                    <strong style={{ color: "#424242" }}>
                      {payment.cardNumber}
                    </strong>
                  </p>
                </div>
              </div>
            )}
          </>
        ))}
      {showEditPayment && (
        <EditPayment
          source={dataSource}
          paymentID={paymentId}
          visible={showEditPayment}
          onClose={() => setShowEditPayment(false)}
        />
      )}

      {showPaymentHistory && (
        <PaymentHistory
          source={dataSource}
          paymentID={paymentId}
          visible={showPaymentHistory}
          onClose={() => setShowPaymentHistory(false)}
        />
      )}
    </div>
  );
};

export default PaymentCard;
