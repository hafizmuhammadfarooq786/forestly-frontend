/* eslint-disable import/no-extraneous-dependencies */
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { routerMiddleware } from "connected-react-router";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import rootReducer from "./rootReducer";

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState, history) {
  const store = createStore(
    rootReducer(history),
    initialState,
    composeWithDevTools(
      applyMiddleware(sagaMiddleware, routerMiddleware(history))
    )
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
