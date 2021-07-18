import React, { useState, useEffect } from "react";
import { Switch, Button, Form, Input } from "antd";
import NoDataIllustration from "../assets/illustration/empty_cart.png";
// Icons
import CountriesIcon from "../assets/icons/map-check-outline.svg";
import DollarIcon from "../assets/icons/currency-usd.svg";
import LandRestoredIcon from "../assets/icons/island.svg";
import CashUSD from "../assets/icons/cash-usd-outline.svg";
import AreaOutline from "../assets/icons/area-check-outline.svg";
import PencileOutline from "../assets/icons/pencil-outline.svg";
import TrashIcon from "../assets/icons/trash-can-outline.svg";
import CircleTick from "../assets/icons/check-circle.svg";
import ProfileIcon from "../assets/icons/account-circle-outline.svg";
import GiftIcon from "../assets/icons/gift-outline.svg";
import LoadingImageGif from "../assets/loader.gif";
import CartDetails from "../components/common/CartDetails";
import BuyModal from "../components/common/buy-modal";
import LoadingFormButton from "../components/common/LoadingFormButton";
import ReceiptIcon from "../assets/icons/receipt.svg";
import PaymentDetails from "../components/common/PaymentDetails";
import { history } from "..";

const Cart = (props) => {
  const {
    location: { pathname },
  } = props;
  const [sumbit1, setSubmit1] = useState(false);
  const [submit2, setSubmit2] = useState(false);
  const [submit3, setSubmit3] = useState(false);

  const [updateSource, setUpdateSource] = useState(CartDetails);
  const [pageLoading, setPageLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [visible, setVisible] = useState(false);
  const [information, setInformation] = useState({
    firstName: "",
    lastName: "",
    email: "",
    receiverFirstName: "",
    receiverLastName: "",
    receiverEmail: "",
  });
  // const open = () => setVisible(true);
  const onClose = () => setVisible(false);

  const noData = {
    title: "Your cart is empty",
    message: "Buy some forest units and add them to your cart",
    imgSrc: NoDataIllustration,
    buttonText: "Buy Forest Units",
  };

  const finishLoading = () => {
    setPageLoading(false);
  };
  const stopPageLoading = () => {
    setTimeout(finishLoading, 2000);
  };

  const proceedToNextStep2 = () => {
    setSubmitting(true);
    window.localStorage.setItem("submit1", true);
    setSubmit1(true);
    history.push("/dashboard/patches/cart/personal-information");
  };

  useEffect(() => {
    setPageLoading(true);
    stopPageLoading();
  }, []);

  const benefits = [
    {
      iconSrc: CountriesIcon,
      title: "Climate impacts",
      description: "Your patch will capture CO2 and clean water",
    },
    {
      iconSrc: DollarIcon,
      title: "Economic Impacts",
      description: "New jobs will be created",
    },
    {
      iconSrc: LandRestoredIcon,
      title: "Land Restoration",
      description: "Buying the forest patch will help restore land",
    },
  ];

  const [enabled, setEnabled] = useState({
    firstName: false,
    lastName: false,
    email: false,
    receiverFirstName: false,
    receiverLastName: false,
    receiverEmail: false,
  });

  const enablingStatus = (enablerObject) => {
    if (
      enablerObject.firstName &&
      enablerObject.lastName &&
      enablerObject.email &&
      enablerObject.receiverFirstName &&
      enablerObject.receiverLastName &&
      enablerObject.receiverEmail
    ) {
      return false;
    }
    return true;
  };

  const updateItem = (index, whichvalue, newvalue) => {
    let g = CartDetails[index];
    g[whichvalue] = newvalue;
    if (index === -1) {
    } else
      setUpdateSource([
        ...updateSource.slice(0, index),
        g,
        ...updateSource.slice(index + 1),
      ]);
  };
  // updateItem(idx, "annuallyActive", true);

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };

  const putCommaInAmount = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const totalAmount = () => {
    let amount = 0;
    for (var i = 0; i < CartDetails[0]["forests"].length; i++) {
      amount = amount + CartDetails[0]["forests"][i].payableAmount;
    }

    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const accumulatedTotalAmount = () => {
    let amount = 0;
    for (var i = 0; i < CartDetails[0]["forests"].length; i++) {
      amount = amount + CartDetails[0]["forests"][i].payableAmount;
    }
    amount = amount + 100;
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const onDoneForStep2 = async () => {
    setSubmitting(true);
    const personalInformation = {
      firstName: information.firstName,
      lastName: information.lastName,
      emailAddress: information.email,
    };
    const receiverInformation = {
      firstName: information.receiverFirstName,
      lastName: information.receiverLastName,
      emailAddress: information.receiverEmail,
    };
    updateItem(0, "personalInformation", personalInformation);
    updateItem(0, "receiverInformation", receiverInformation);
    setSubmitting(false);
    window.localStorage.setItem("submit2", true);
    setSubmit2(true);
    history.push("/dashboard/patches/cart/payment");
  };

  const onDoneForStep3 = async () => {
    setSubmitting(true);
    window.localStorage.setItem("submit3", true);
    setSubmitting(false);
    setSubmit3(true);
    history.push("/dashboard/patches/cart/congratulations");
  };

  return pageLoading ? (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fffff",
      }}
    >
      <img src={LoadingImageGif} alt="loading-gif" height={80} width={80} />
    </div>
  ) : CartDetails[0]["forests"].length > 0 ? (
    <div
      className="content-body"
      style={{
        padding: "0px 0px 120px 0px",
        marginTop: 72,
        height: "100%",
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
        {/* Navigation Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#274B28",
            width: "100%",
            height: 80,
          }}
        >
          <div
            onClick={() => history.push("/dashboard/patches/cart/review")}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            {sumbit1 ? (
              <div style={{ border: "1px solid #ffffff", borderRadius: "50%" }}>
                <img src={CircleTick} alt="check-mark" height={32} width={32} />
              </div>
            ) : (
              <div
                style={{
                  height: 40,
                  width: 40,
                  opacity:
                    pathname === "/dashboard/patches/cart/review" ? 1 : 0.4,
                  background: "#ffffff",
                  color: "#1C75BC",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                  fontSize: 20,
                  lineHeight: "28px",
                  fontWeight: 700,
                }}
              >
                1
              </div>
            )}

            <p
              style={{
                color: "#ffffff",
                fontSize: 18,
                lineHeight: "23px",
                margin: "0 0 0 16px",
                opacity:
                  pathname === "/dashboard/patches/cart/review" ? 1 : 0.4,
              }}
            >
              Review Selected Forest Units
            </p>
          </div>

          <div
            style={{
              margin: "0 24px",
              background: "#ffffff",
              width: 32,
              height: 1,
              opacity: pathname === "/dashboard/patches/cart/review" ? 1 : 0.4,
            }}
          />

          <div
            onClick={() =>
              history.push("/dashboard/patches/cart/personal-information")
            }
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            {submit2 ? (
              <div style={{ border: "1px solid #ffffff", borderRadius: "50%" }}>
                <img src={CircleTick} alt="check-mark" height={32} width={32} />
              </div>
            ) : (
              <div
                style={{
                  height: 40,
                  width: 40,
                  background: "#ffffff",
                  opacity:
                    pathname === "/dashboard/patches/cart/personal-information"
                      ? 1
                      : 0.4,
                  color: "#1C75BC",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                  fontSize: 20,
                  lineHeight: "28px",
                  fontWeight: 700,
                }}
              >
                2
              </div>
            )}
            <p
              style={{
                color: "#ffffff",
                fontSize: 18,
                lineHeight: "23px",
                margin: "0 0 0 16px",
                opacity:
                  pathname === "/dashboard/patches/cart/personal-information"
                    ? 1
                    : 0.4,
              }}
            >
              Review Personal Information
            </p>
          </div>

          <div
            style={{
              margin: "0 24px",
              background: "#ffffff",
              width: 32,
              height: 1,
              opacity:
                pathname === "/dashboard/patches/cart/personal-information"
                  ? 1
                  : 0.4,
            }}
          />

          <div
            onClick={() => history.push("/dashboard/patches/cart/payment")}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            {submit3 ? (
              <div style={{ border: "1px solid #ffffff", borderRadius: "50%" }}>
                <img src={CircleTick} alt="check-mark" height={32} width={32} />
              </div>
            ) : (
              <div
                style={{
                  height: 40,
                  width: 40,
                  background: "#ffffff",
                  opacity:
                    pathname === "/dashboard/patches/cart/payment" ? 1 : 0.4,
                  color: "#1C75BC",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                  fontSize: 20,
                  lineHeight: "28px",
                  fontWeight: 700,
                }}
              >
                3
              </div>
            )}
            <p
              style={{
                color: "#ffffff",
                fontSize: 18,
                lineHeight: "23px",
                margin: "0 0 0 16px",
                opacity:
                  pathname === "/dashboard/patches/cart/payment" ? 1 : 0.4,
              }}
            >
              Payment Method
            </p>
          </div>
        </div>

        {/* Step:1 */}
        {pathname === "/dashboard/patches/cart/review" && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              padding: "48px 48px 96px",
              width: "100%",
              height: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                width: "100%",
                justifyContent: "flex-start",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <h2 style={{ color: "#274B28", fontWeight: 900 }}>
                      Selected Forest Units
                    </h2>
                    <div
                      style={{
                        background: "#274B28",
                        borderRadius: "50%",
                        margin: "0 16px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: 40,
                        width: 40,
                      }}
                    >
                      <h3 style={{ color: "#F1FFF2" }}>
                        {CartDetails[0]["forests"].length}
                      </h3>
                    </div>
                  </div>
                  <p
                    style={{
                      color: "#757575",
                      margin: "12px 0",
                      fontSize: 18,
                      lineHeight: "23px",
                    }}
                  >
                    You can edit your forest units or delete them
                  </p>
                </div>

                <div
                  style={{
                    background: "#ffffff",
                    boxShadow: "0px 1px 8px rgba(0, 0, 0, 0.25)",
                    borderRadius: 8,
                    maxWidth: 320,
                    height: 56,
                    width: "100%",
                    padding: "0 24px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Switch defaultChecked onChange={onChange} />
                  <p
                    style={{
                      fontSize: 14,
                      lineHeight: "140%",
                      color: "#757575",
                      letterSpacing: "0.002em",
                      margin: "0 0 0 16px",
                    }}
                  >
                    This is a gift for someone
                  </p>
                </div>
              </div>

              {CartDetails &&
                CartDetails[0]["forests"].map((detail, index) => (
                  <div key={index + 1}>
                    <div
                      className="payment-card"
                      key={`payment-card-` + index + 1}
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
                        <h2 style={{ color: "#274B28", fontWeight: 900 }}>
                          {detail.forestName}
                        </h2>
                        <p
                          style={{
                            color: "#757575",
                            fontSize: 18,
                            lineHeight: "23px",
                            margin: "8px 0 0",
                            fontWeight: 700,
                          }}
                        >
                          {detail.planFor}
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
                                <h3 style={{ color: "#274B28" }}>
                                  {detail.sqMeters}
                                </h3>
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
                                <h3 style={{ color: "#274B28" }}>
                                  {detail.payableAmount}
                                </h3>
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
                          <div
                            style={{
                              display: "flex",
                              width: "100%",
                              marginRight: 24,
                            }}
                          >
                            <div className="payment-light-circle-icon">
                              <img
                                src={PencileOutline}
                                alt={PencileOutline}
                                height={24}
                                width={24}
                              />
                            </div>
                          </div>
                          <div style={{ display: "flex", width: "100%" }}>
                            <div className="trash-icon">
                              <img
                                src={TrashIcon}
                                alt={TrashIcon}
                                height={24}
                                width={24}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                width: "100%",
                maxWidth: 320,
                marginLeft: 32,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid #274B28",
                  background: "#F1FFF2",
                  borderRadius: 8,
                  boxShadow: "0px 1px 8px rgba(0, 0, 0, 0.25)",
                  padding: "24px",
                }}
              >
                <h5 style={{ color: "#274B28", marginBottom: 24 }}>
                  BENEFITS OF BUYING FORESTS
                </h5>
                {benefits &&
                  benefits.map((value, index) => (
                    <div
                      key={index + 1}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "start",
                        padding: "16px 0 24px",
                      }}
                    >
                      <div style={{ display: "flex" }}>
                        <div
                          style={{
                            padding: 16,
                            borderRadius: 26,
                          }}
                        >
                          <img
                            src={value.iconSrc}
                            alt={`icons`}
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
                          <h3 style={{ color: "#274B28" }}>{value.title}</h3>
                          <p className="small-p" style={{ marginTop: 8 }}>
                            {value.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
        {/* Step: 1 => Footer */}
        {pathname === "/dashboard/patches/cart/review" && (
          <div
            style={{
              position: "fixed",
              bottom: 0,
              padding: 32,
              background: "#ffffff",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p
              style={{
                color: "#757575",
                margin: "12px 0",
                fontSize: 24,
                lineHeight: "30px",
              }}
            >
              {`Total payable amount : `}
            </p>
            <p
              style={{
                color: "#424242",
                fontSize: 24,
                margin: "0 16px",
                lineHeight: "30px",
                fontWeight: 800,
              }}
            >
              {`$${totalAmount()}`}
            </p>
            <LoadingFormButton
              submitting={submitting}
              label="Proceed to next step"
              onClick={proceedToNextStep2}
              style={{ width: 324 }}
              className={"update-button"}
            />
          </div>
        )}

        {/* Step: 2 */}
        {pathname === "/dashboard/patches/cart/personal-information" && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              padding: "48px 48px 96px",
              width: "100%",
              height: "100%",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: 992,
                minWidth: 900,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                boxShadow: "0px 1px 8px rgba(0, 0, 0, 0.12)",
              }}
            >
              <div
                style={{
                  background: "#F1FFF2",
                  borderRadius: "8px 8px 0px 0px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  padding: 24,
                }}
              >
                <img
                  src={ProfileIcon}
                  alt="profile-icon"
                  height={32}
                  width={32}
                />
                <h4
                  style={{
                    margin: "0 0 0 24px",
                    color: "#274B28",
                    fontWeight: 700,
                  }}
                >
                  Personal Information
                </h4>
              </div>
              <div
                style={{
                  background: "#FFFFFF",
                  borderRadius: "0px 0px 8px 8px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  padding: 24,
                }}
              >
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
                      marginRight: 32,
                      display: "flex",
                      flexDirection: "column",
                    }}
                    rules={[
                      {
                        required: true,
                        message: "First name is required",
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
                      First Name
                    </p>
                    <Input
                      type="text"
                      onChange={(e) => {
                        if (e.target.value !== "" && e.target.value !== null) {
                          setEnabled({ ...enabled, firstName: true });
                          setInformation({
                            ...information,
                            firstName: e.target.value,
                          });
                        } else {
                          setEnabled({ ...enabled, firstName: false });
                          setInformation({
                            ...information,
                            firstName: e.target.value,
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
                        paddingLeft: 24,
                        lineHeight: "23px",
                        boxShadow: "none",
                        marginTop: 10,
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
                        message: "Last name is required",
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
                      Last Name
                    </p>
                    <Input
                      type="text"
                      onChange={(e) => {
                        if (e.target.value !== "" && e.target.value !== null) {
                          setEnabled({ ...enabled, lastName: true });
                          setInformation({
                            ...information,
                            lastName: e.target.value,
                          });
                        } else {
                          setEnabled({ ...enabled, lastName: false });
                          setInformation({
                            ...information,
                            lastName: e.target.value,
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
                        paddingLeft: 24,
                        lineHeight: "23px",
                        boxShadow: "none",
                        marginTop: 10,
                      }}
                    />
                  </Form.Item>
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <Form.Item
                    style={{
                      maxWidth: "48.5%",
                      width: "100%",
                      height: "100%",
                      position: "relative",
                      padding: 0,
                      border: "none",
                    }}
                    rules={[
                      {
                        required: true,
                        message: "Email is required",
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
                      Email Address
                    </p>
                    <Input
                      type="email"
                      onChange={(e) => {
                        if (e.target.value !== "" && e.target.value !== null) {
                          setEnabled({ ...enabled, email: true });
                          setInformation({
                            ...information,
                            email: e.target.value,
                          });
                        } else {
                          setEnabled({ ...enabled, email: false });
                          setInformation({
                            ...information,
                            email: e.target.value,
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
                        paddingLeft: 24,
                        lineHeight: "23px",
                        boxShadow: "none",
                        marginTop: 10,
                      }}
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
            <div
              style={{
                width: "100%",
                maxWidth: 992,
                minWidth: 900,
                marginTop: 32,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                boxShadow: "0px 1px 8px rgba(0, 0, 0, 0.12)",
              }}
            >
              <div
                style={{
                  background: "#F1FFF2",
                  borderRadius: "8px 8px 0px 0px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  padding: 24,
                }}
              >
                <img src={GiftIcon} alt="giftbox-icon" height={32} width={32} />
                <h4
                  style={{
                    margin: "0 0 0 24px",
                    color: "#274B28",
                    fontWeight: 700,
                  }}
                >
                  Receiver's Information
                </h4>
              </div>
              <div
                style={{
                  background: "#FFFFFF",
                  borderRadius: "0px 0px 8px 8px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  padding: 24,
                }}
              >
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
                      marginRight: 32,
                    }}
                    rules={[
                      {
                        required: true,
                        message: "First name is required",
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
                      First Name
                    </p>
                    <Input
                      type="text"
                      onChange={(e) => {
                        if (e.target.value !== "" && e.target.value !== null) {
                          setEnabled({ ...enabled, receiverFirstName: true });
                          setInformation({
                            ...information,
                            receiverFirstName: e.target.value,
                          });
                        } else {
                          setEnabled({ ...enabled, receiverFirstName: false });
                          setInformation({
                            ...information,
                            receiverFirstName: e.target.value,
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
                        paddingLeft: 24,
                        lineHeight: "23px",
                        boxShadow: "none",
                        marginTop: 10,
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
                        message: "Last name is required",
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
                      Last Name
                    </p>
                    <Input
                      type="text"
                      onChange={(e) => {
                        if (e.target.value !== "" && e.target.value !== null) {
                          setEnabled({ ...enabled, receiverLastName: true });
                          setInformation({
                            ...information,
                            receiverLastName: e.target.value,
                          });
                        } else {
                          setEnabled({ ...enabled, receiverLastName: false });
                          setInformation({
                            ...information,
                            receiverLastName: e.target.value,
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
                        paddingLeft: 24,
                        lineHeight: "23px",
                        boxShadow: "none",
                        marginTop: 10,
                      }}
                    />
                  </Form.Item>
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <Form.Item
                    style={{
                      maxWidth: "48.5%",
                      width: "100%",
                      height: "100%",
                      position: "relative",
                      padding: 0,
                      border: "none",
                    }}
                    rules={[
                      {
                        required: true,
                        message: "Email is required",
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
                      Email Address
                    </p>
                    <Input
                      type="email"
                      onChange={(e) => {
                        if (e.target.value !== "" && e.target.value !== null) {
                          setEnabled({ ...enabled, receiverEmail: true });
                          setInformation({
                            ...information,
                            receiverEmail: e.target.value,
                          });
                        } else {
                          setEnabled({ ...enabled, receiverEmail: false });
                          setInformation({
                            ...information,
                            receiverEmail: e.target.value,
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
                        paddingLeft: 24,
                        lineHeight: "23px",
                        boxShadow: "none",
                        marginTop: 10,
                      }}
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Step: 2 => Footer */}
        {pathname === "/dashboard/patches/cart/personal-information" && (
          <div
            style={{
              position: "fixed",
              bottom: 0,
              padding: 32,
              background: "#ffffff",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                background: "#F5F5F5",
                borderRadius: 100,
                padding: "10px 24px 8px",
                marginRight: 16,
                width: 274,
                textAlign: "center",
              }}
              onClick={() => {
                history.push("/dashboard/patches/cart/review");
              }}
            >
              <h4 style={{ color: "#757575" }}>Previous Step</h4>
            </div>

            {enablingStatus(enabled) ? (
              <div
                style={{
                  background: "#F5F5F5",
                  borderRadius: 100,
                  padding: "10px 24px 8px",
                  cursor: "not-allowed",
                  marginRight: 16,
                  width: 274,
                  textAlign: "center",
                }}
              >
                <h4 style={{ color: "#757575" }}>Proceed to payment</h4>
              </div>
            ) : (
              <LoadingFormButton
                submitting={submitting}
                label="Proceed to payment"
                onClick={onDoneForStep2}
                style={{ width: 324 }}
                className={"update-button"}
              />
            )}
          </div>
        )}

        {/* Step: 3 */}
        {pathname === "/dashboard/patches/cart/payment" && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              padding: "48px 48px 96px",
              width: "100%",
              height: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                padding: "48px 48px 96px",
                width: "100%",
                height: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              ></div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                width: "100%",
                maxWidth: 380,
                marginLeft: 32,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  background: "#FFFFFF",
                  borderRadius: 8,
                  boxShadow: "0px 1px 8px rgba(0, 0, 0, 0.12)",
                  padding: 32,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    width: "100%",
                  }}
                >
                  <img
                    src={ReceiptIcon}
                    alt="recepit-icon"
                    height={32}
                    width={32}
                  />
                  <h3
                    style={{
                      color: "#274B28",
                      margin: "0 0 0 16px",
                      fontWeight: 700,
                    }}
                  >
                    Cart Summary
                  </h3>
                </div>

                {CartDetails &&
                  CartDetails[0]["forests"].map((detail, index) => (
                    <div key={index + 1}>
                      <div
                        style={{
                          display: "flex",
                          width: "100%",
                          justifyContent: "center",
                          alignItems: "center",
                          marginTop: 24,
                        }}
                        key={`payment-card-` + index + 1}
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
                          <p
                            style={{
                              color: "#424242",
                              fontSize: 16,
                              lineHeight: "20px",
                              margin: 0,
                              fontWeight: 700,
                            }}
                          >
                            {`1x ${detail.forestName}`}
                          </p>
                          <p
                            style={{
                              color: "#757575",
                              fontSize: 14,
                              lineHeight: "18px",
                              margin: "8px 0 0",
                            }}
                          >
                            {`${detail.sqMeters} sq meters`}
                          </p>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            width: "100%",
                            maxWidth: 100,
                          }}
                        >
                          <p
                            style={{
                              color: "#274B28",
                              fontSize: 16,
                              lineHeight: "20px",
                              fontWeight: 800,
                              margin: 0,
                            }}
                          >{`$ ${putCommaInAmount(
                            detail.payableAmount
                          )}.00`}</p>
                        </div>
                      </div>
                    </div>
                  ))}

                <div
                  style={{
                    borderTop: "1px solid #E0E0E0",
                    borderBottom: "1px solid #E0E0E0",
                    padding: "8px 0px 24px",
                    margin: "24px 0",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: 24,
                    }}
                  >
                    <p
                      style={{
                        color: "#424242",
                        fontSize: 16,
                        lineHeight: "20px",
                        margin: 0,
                        fontWeight: 700,
                      }}
                    >
                      Sub Total
                    </p>
                    <p
                      style={{
                        color: "#274B28",
                        fontSize: 16,
                        lineHeight: "20px",
                        fontWeight: 800,
                        margin: 0,
                      }}
                    >
                      {`$${totalAmount()}.00`}
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: 24,
                    }}
                  >
                    <p
                      style={{
                        color: "#424242",
                        fontSize: 16,
                        lineHeight: "20px",
                        margin: 0,
                        fontWeight: 700,
                      }}
                    >
                      Processing Fee
                    </p>
                    <p
                      style={{
                        color: "#274B28",
                        fontSize: 16,
                        lineHeight: "20px",
                        fontWeight: 800,
                        margin: 0,
                      }}
                    >
                      {`$100.00`}
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 24,
                  }}
                >
                  <p
                    style={{
                      color: "#424242",
                      fontSize: 16,
                      lineHeight: "20px",
                      margin: 0,
                      fontWeight: 700,
                    }}
                  >
                    Total Amount
                  </p>
                  <p
                    style={{
                      color: "#274B28",
                      fontSize: 24,
                      lineHeight: "30px",
                      fontWeight: 900,
                      margin: 0,
                    }}
                  >
                    {`$${accumulatedTotalAmount()}.00`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Step: 3 => Footer */}
        {pathname === "/dashboard/patches/cart/payment" && (
          <div
            style={{
              position: "fixed",
              bottom: 0,
              padding: 32,
              background: "#ffffff",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                background: "#F5F5F5",
                borderRadius: 100,
                padding: "10px 24px 8px",
                marginRight: 16,
                width: 274,
                textAlign: "center",
              }}
              onClick={() => {
                history.push("/dashboard/patches/cart/personal-information");
              }}
            >
              <h4 style={{ color: "#757575" }}>Previous Step</h4>
            </div>

            {enablingStatus(enabled) ? (
              <div
                style={{
                  background: "#F5F5F5",
                  borderRadius: 100,
                  padding: "10px 24px 8px",
                  cursor: "not-allowed",
                  marginRight: 16,
                  width: 274,
                  textAlign: "center",
                }}
              >
                <h4 style={{ color: "#757575" }}>Checkout</h4>
              </div>
            ) : (
              <LoadingFormButton
                submitting={submitting}
                label="Checkout"
                onClick={onDoneForStep3}
                style={{ width: 324 }}
                className={"update-button"}
              />
            )}
          </div>
        )}
      </div>

      <BuyModal
        visible={visible}
        // source={NewPatchDetails}
        // sourceID={selectedForest}
        onClose={() => onClose()}
        afterSubmit={() => {
          onClose();
          setPageLoading(true);
          stopPageLoading();
        }}
      />
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "90vh",
        height: "100%",
        width: "100%",
        maxWidth: 576,
        textAlign: "center",
        margin: "72px auto 0",
      }}
    >
      <img src={noData.imgSrc} alt="no-data-illustration" />
      <div style={{ marginTop: 32 }}>
        <h1 style={{ color: "#274B28" }}>{noData.title}</h1>
        <p style={{ color: "#9E9E9E", textAlign: "center" }}>
          {noData.message}
        </p>
        <Button
          className="green-button"
          onClick={() => history.push("/dashboard/patches/new")}
        >
          {noData.buttonText}
        </Button>
      </div>
    </div>
  );
};

export default Cart;
