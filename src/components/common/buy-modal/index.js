import React, { useState } from "react";
import { Modal, Form, Input } from "antd";
import LoadingFormButton from "./../LoadingFormButton";
// import CalendarView from "../../../assets/icons/calendar-multiselect.svg";
import RadioBoxBlank from "../../../assets/icons/radiobox-blank.svg";
import RadioBoxMarked from "../../../assets/icons/radiobox-marked.svg";
import PulseLoader from "./../PulseLoader";
import CartDetails from "../CartDetails";
import { history } from "../../../index";

const BuyModal = ({ source, sourceID, visible, onClose }) => {
  const [updateSource, setUpdateSource] = useState(source);
  const [submitting, setSubmitting] = useState(false);
  const [updateAreaValue, setUpdateAreaValue] = useState(false);
  const [showPulseLoader, setShowPulseLoader] = useState(false);
  // const [paymentPlans, showPaymentPlans] = useState(false);
  const [planDetails, setPlanDetails] = useState(null);

  const [enabled, setEnabled] = useState({
    unitArea: false,
    paymentPlan: false,
  });

  const enablingStatus = (enablerObject) => {
    if (enablerObject.unitArea && enablerObject.paymentPlan) {
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

  const updateItem = (index, whichvalue, newvalue) => {
    let g = updateSource[index];
    g[whichvalue] = newvalue;
    if (index === -1) {
    } else
      setUpdateSource([
        ...updateSource.slice(0, index),
        g,
        ...updateSource.slice(index + 1),
      ]);
  };

  const onChangeArea = async (area, idx) => {
    setShowPulseLoader(true);
    if (updateAreaValue > 0 && updateAreaValue <= updateSource[idx].sqMeters) {
      stopLoading();
      const calculatePaymentMonthly = area * updateSource[idx].unitPrice;
      const calculatePaymentAnnually = area * updateSource[idx].unitPrice - 500;
      updateItem(idx, "boughtArea", area);
      updateItem(idx, "payableMonthly", calculatePaymentMonthly);
      updateItem(idx, "payableAnnually", calculatePaymentAnnually);
      setEnabled({ ...enabled, unitArea: true });
    } else {
      setEnabled({ ...enabled, unitArea: false });
    }
  };

  const selectPlan = async (idx, monthly) => {
    setEnabled({ ...enabled, paymentPlan: true });
    if (monthly) {
      updateItem(idx, "monthlyActive", true);
      updateItem(idx, "annuallyActive", false);
    } else {
      updateItem(idx, "monthlyActive", false);
      updateItem(idx, "annuallyActive", true);
    }
  };

  const unselectPlan = async (idx) => {
    updateItem(idx, "monthlyActive", false);
    updateItem(idx, "annuallyActive", false);
    setEnabled({ ...enabled, paymentPlan: false });
  };

  const onDone = async (index) => {
    setSubmitting(true);
    const leftSqMeters = updateSource[index].sqMeters - updateAreaValue;
    const leftArea = leftSqMeters / 4047;
    updateItem(index, "area", leftArea.toFixed(2) + " Acres");
    updateItem(index, "sqMeters", leftSqMeters);
    const cartDetails = {
      sourceIndex: index,
      forestName: updateSource[index].name,
      sqMeters: updateSource[index].boughtArea,
      planFor:
        planDetails === "monthly"
          ? "Monthly Subscription"
          : "Annual Subscription",
      payableAmount:
        planDetails === "monthly"
          ? updateSource[index].payableMonthly
          : updateSource[index].payableAnnually,
    };
    CartDetails[0]["forests"].push(cartDetails);
    // showPaymentPlans(false);
    setSubmitting(false);
    setEnabled({
      unitArea: false,
      paymentPlan: false,
    });
    onClose();
    history.push("/dashboard/patches/new");
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
        updateSource.map((patch, index) => (
          <div style={{ height: "100%", width: "100%" }} key={index + 1}>
            {patch.id === sourceID && (
              <div>
                <h2
                  style={{
                    color: "#274B28",
                    padding: "32px 24px",
                    borderBottom: "1px solid #E0E0E0",
                    fontWeight: 900,
                  }}
                >
                  Forest Configurations
                </h2>
                <div
                  style={{
                    padding: "32px 24px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                  }}
                >
                  <p
                    style={{
                      color: "#9E9E9E",
                      fontSize: 16,
                      lineHeight: "20px",
                      margin: 0,
                    }}
                  >
                    {`1.   Enter your desired unit area`}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      height: 64,
                      position: "relative",
                      marginTop: 16,
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
                      }}
                      rules={[
                        {
                          required: true,
                          message: "Area is required",
                        },
                      ]}
                      required={false}
                    >
                      <Input
                        defaultValue={0}
                        type="number"
                        min="0"
                        onChange={(e) => {
                          if (Number(e.target.value) !== 0) {
                            onChangeArea(Number(e.target.value), index);
                            setUpdateAreaValue(Number(e.target.value));
                          }
                        }}
                        style={{
                          height: 64,
                          color: "#424242",
                          background: "#FAFAFA",
                          borderRadius: 8,
                          border: "1px solid #E0E0E0",
                          fontSize: 24,
                          paddingLeft: 24,
                          lineHeight: "30px",
                          boxShadow: "none",
                        }}
                      />
                    </Form.Item>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        position: "absolute",
                        right: 24,
                      }}
                    >
                      <p
                        style={{
                          color: "#274B28",
                          fontSize: 16,
                          fontWeight: 700,
                          lineHeight: "20px",
                          background: "rgba(0, 0, 0, 0.04)",
                          borderRadius: 100,
                          padding: "8px 24px",
                          margin: 0,
                        }}
                      >
                        {`Available area : ${patch.sqMeters} sq meters`}
                      </p>
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: 26,
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <h4
                        style={{
                          color: "#757575",
                          fontSize: 18,
                          lineHeight: "23px",
                        }}
                      >
                        {`Estimated Cost`}
                      </h4>
                      <p
                        style={{
                          color: "#9E9E9E",
                          fontSize: 14,
                          lineHeight: "18px",
                          margin: "6px 0 0",
                        }}
                      >
                        Based on your area selection
                      </p>

                      {showPulseLoader ? (
                        <PulseLoader />
                      ) : (
                        <h2
                          style={{
                            color: "#424242",
                            marginTop: 12,
                            fontWeight: 900,
                          }}
                        >
                          {`$ ${patch.payableMonthly || 0}.00`}
                        </h2>
                      )}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        background: "#F1FFF2",
                        border: "1px solid #E0E0E0",
                        borderRadius: 8,
                        height: 64,
                        padding: "0 16px",
                      }}
                    >
                      <h4
                        style={{
                          color: "#424242",
                          fontWeight: 800,
                        }}
                      >
                        {`US $${patch.unitPrice}.00`}
                      </h4>
                      <p
                        style={{
                          color: "#424242",
                          margin: "4px 0 0",
                          fontSize: 14,
                          lineHeight: "18px",
                        }}
                      >
                        per sq meters
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    borderTop: "1px solid rgba(0, 0, 0, 0.12)",
                    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                    background: "#F5F5F5",
                  }}
                >
                  {/* {!paymentPlans ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 44,
                        width: "100%",
                        maxWidth: 480,
                      }}
                    >
                      <img
                        src={CalendarView}
                        alt="calendar-icon"
                        height={48}
                        width={48}
                      />

                      <div
                        style={{
                          display: "flex",
                          margin: "20px 0 16px",
                          cursor: "pointer",
                        }}
                        onClick={() => showPaymentPlans(true)}
                      >
                        <h4
                          style={{
                            color: "#274B28",
                          }}
                        >
                          Select payment plan
                        </h4>
                      </div>

                      <p
                        style={{
                          color: "#757575",
                          margin: 0,
                          fontSize: 16,
                          lineHeight: "20px",
                          textAlign: "center",
                        }}
                      >
                        You have to first enter your desired unit area to see
                        the relevant payment plans
                      </p>
                    </div>
                  ) : ( */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      padding: "20px 26px",
                      width: "100%",
                    }}
                  >
                    <p
                      style={{
                        color: "#9E9E9E",
                        fontSize: 18,
                        lineHeight: "21px",
                        margin: 0,
                      }}
                    >
                      {`2. Select payment plan`}
                    </p>

                    <div
                      style={{
                        marginTop: 26,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        background: patch.monthlyActive ? "#F1FFF2" : "#ffffff",
                        padding: 16,
                        borderRadius: 8,
                        width: "100%",
                        border: patch.monthlyActive
                          ? "1px solid #274B28"
                          : "1px solid #E0E0E0",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        {patch.monthlyActive ? (
                          <img
                            src={RadioBoxMarked}
                            alt="radi-box-marked"
                            height={24}
                            width={24}
                            onClick={() => {
                              unselectPlan(index);
                              setPlanDetails(null);
                            }}
                          />
                        ) : (
                          <img
                            src={RadioBoxBlank}
                            alt="radio-box-blank"
                            height={24}
                            width={24}
                            onClick={() => {
                              selectPlan(index, true);
                              setPlanDetails("monthly");
                            }}
                          />
                        )}
                        <p
                          style={{
                            color: "#274B28",
                            fontSize: 16,
                            lineHeight: "20px",
                            margin: "0 0 0 16px",
                          }}
                        >
                          {`Monthly Subscription`}
                        </p>
                      </div>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <h5
                          style={{
                            color: "#424242",
                            fontWeight: 800,
                          }}
                        >
                          {`$ ${patch.payableMonthly || 0}`}
                        </h5>
                        <p
                          style={{
                            color: "#424242",
                            fontSize: 16,
                            lineHeight: "20px",
                            margin: "0 0 0 8px",
                          }}
                        >
                          {`per month`}
                        </p>
                      </div>
                    </div>
                    <div
                      style={{
                        marginTop: 26,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        background: patch.annuallyActive
                          ? "#F1FFF2"
                          : "#ffffff",
                        padding: 16,
                        borderRadius: 8,
                        width: "100%",
                        border: patch.annuallyActive
                          ? "1px solid #274B28"
                          : "1px solid #E0E0E0",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        {patch.annuallyActive ? (
                          <img
                            src={RadioBoxMarked}
                            alt="radi-box-marked"
                            height={24}
                            width={24}
                            onClick={() => {
                              unselectPlan(index);
                              setPlanDetails(null);
                            }}
                          />
                        ) : (
                          <img
                            src={RadioBoxBlank}
                            alt="radio-box-blank"
                            height={24}
                            width={24}
                            onClick={() => {
                              selectPlan(index);
                              setPlanDetails("annual");
                            }}
                          />
                        )}
                        <p
                          style={{
                            color: "#274B28",
                            fontSize: 16,
                            lineHeight: "20px",
                            margin: "0 0 0 16px",
                          }}
                        >
                          {`Annual Subscription`}
                        </p>
                      </div>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <h5
                          style={{
                            color: "#424242",
                            fontWeight: 800,
                          }}
                        >
                          {`$ ${patch.payableAnnually || 0}`}
                        </h5>
                        <p
                          style={{
                            color: "#424242",
                            fontSize: 16,
                            lineHeight: "20px",
                            margin: "0 0 0 8px",
                          }}
                        >
                          {`per month, billed annually`}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* )} */}
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "24px 24px 32px",
                  }}
                >
                  <div
                    style={{
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

                    {enablingStatus(enabled) ? (
                      <div
                        style={{
                          background: "#F5F5F5",
                          borderRadius: 100,
                          padding: "10px 24px 8px",
                          cursor: "not-allowed",
                          marginRight: 16,
                          width: 176,
                          textAlign: "center",
                        }}
                      >
                        <h4 style={{ color: "#757575" }}>Add to cart</h4>
                      </div>
                    ) : (
                      <LoadingFormButton
                        submitting={submitting}
                        label="Add to Cart"
                        onClick={() => onDone(index)}
                        style={{ width: 176 }}
                        className={"update-button"}
                      />
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
    </Modal>
  );
};

export default BuyModal;
