import { all, fork } from "redux-saga/effects";
import appSagas from "./app/sagas";

export default function* rootSaga(services = {}) {
  yield all([fork(appSagas, services)]);
}
