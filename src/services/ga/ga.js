/* eslint-disable no-undef */
import ReactGA from "react-ga";

export const initGA = () => {
  ReactGA.initialize("UA-58139782-7");
  ReactGA.pageview(window.location.pathname + window.location.search);
};

export const trackEvent = (category, action, label) => {
  ReactGA.initialize("UA-58139782-7");
  ReactGA.event({
    category,
    action,
    label
  });
};
