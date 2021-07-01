import React, { useState } from "react";
import { Modal } from "antd";
import LoadingFormButton from "./LoadingFormButton";
import CancelIcon from "../../assets/icons/close-circle.svg";
import PDFDownload from "../../assets/icons/file-download-outline.svg";

const PaymentHistory = ({ source, paymentID, visible, onClose }) => {
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
      bodyStyle={{
        backgroundColor: "#ffffff",
        padding: "0px 0px 32px",
        borderRadius: 8,
      }}
      width={900}
    >
      {source &&
        source.map((payment) => (
          <>
            {payment.id === paymentID && (
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "start",
                    justifyContent: "space-between",
                    width: "100%",
                    padding: "24px 16px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
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
                        margin: "8px 0 0",
                      }}
                    >
                      {payment.description}
                    </p>
                  </div>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <img
                      src={CancelIcon}
                      alt={"close_icon"}
                      style={{ height: 28, width: 28, cursor: "pointer" }}
                      onClick={onClose}
                    />
                  </div>
                </div>

                <table className="history-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Service Period</th>
                      <th>Payment Method</th>
                      <th>Total Amount</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {payment.history.map((transection) => (
                      <tr>
                        <td>
                          <h4 style={{ color: "#424242" }}>
                            {transection.date}
                          </h4>
                        </td>
                        <td>
                          <h5
                            style={{ color: "#757575" }}
                          >{`${transection.periodFrom} - ${transection.date}`}</h5>
                        </td>
                        <td>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <img
                              src={transection.imgSrc}
                              alt={"payment-icon"}
                              height={24}
                              width={24}
                            />
                            <h4 style={{ color: "#424242", marginLeft: 16 }}>
                              {transection.cardNumber}
                            </h4>
                          </div>
                        </td>
                        <td>
                          <h4 style={{ color: "#424242", marginLeft: 16 }}>
                            {`$ ${transection.paid}`}
                          </h4>
                        </td>
                        <td>
                          {submitting ? (
                            <LoadingFormButton
                              submitting={submitting}
                              label="Done"
                              onClick={onDone}
                              style={{ width: 176 }}
                              className={"update-button"}
                            />
                          ) : (
                            <div>
                              <img
                                src={PDFDownload}
                                alt={PDFDownload}
                                height={24}
                                width={24}
                              />
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        ))}
    </Modal>
  );
};

export default PaymentHistory;
