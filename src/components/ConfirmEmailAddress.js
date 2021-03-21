import React, { useState, useEffect } from "react";
import { history } from "../index";
import { useDispatch } from "react-redux";
import Loading from "../components/common/Loading";
import { split } from "lodash";
import { confirmEmailAddress, createNotification } from "../store/app/actions";

const Dashboard = () => {
  const onFailure = (error) => {
    setLoading(false);
    dispatch(createNotification("error-toast", error));
  };

  const onSuccess = () => {
    setLoading(false);
  };
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const getParams = () => {
    setLoading(true);
    let params = history.location.search;
    params = split(params, "=");
    dispatch(confirmEmailAddress(params[1], onSuccess, onFailure));
  };
  useEffect(() => {
    getParams();
  }, []);
  return <Loading active={loading}></Loading>;
};

export default Dashboard;
