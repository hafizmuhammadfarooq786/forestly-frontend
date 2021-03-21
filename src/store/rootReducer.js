import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import app from "./app/reducer";
import loading from "./loading/reducer";

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    app,
    loading
  });

export default rootReducer;
