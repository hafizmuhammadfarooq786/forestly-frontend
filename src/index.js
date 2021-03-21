import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import { Provider } from "react-redux";
import styled from "styled-components";
import { createBrowserHistory } from "history";

import configureStore from "./store";
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import initialState from "./store/initialState";

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  justify-items: center;
  min-height: 100vh;
  max-width: 100vw;
  overflow: hidden;
  background-color: #f3f7fe;
`;

export const history = createBrowserHistory();

const store = configureStore(initialState, history);

ReactDOM.render(
  <Provider store={store}>
    <FlexWrapper>
      <App />
    </FlexWrapper>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
