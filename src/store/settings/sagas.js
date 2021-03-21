import { put, takeEvery, call } from "redux-saga/effects";
import api from "../../services/api/ApiService";
import {
  FETCH_SETTINGS,
  UPDATE_PROFILE_PICTURE,
  UPDATE_USER_PASSWORD,
  UPDATE_SETTINGS,
  setSettings,
} from "./actions";
import { createNotification } from "../app/actions";
import { history } from "../../index";

function updatePassword(old_password, new_password) {
  const resp = api.post(`/user/update_password`, {
    old_password,
    new_password,
  });
  return resp;
}

function* updateUserPassword({ payload: { form, successMessage, error } }) {
  try {
    const { old_password, new_password } = form;
    const response = yield call(updatePassword, old_password, new_password);
    const {
      data: { success },
    } = response;
    if (success) {
      yield call(successMessage);
      yield put(
        createNotification(
          "success-toast",
          "Your password has been updated successfully"
        )
      );
      yield call(history.push("/dashboard/settings"));
    }
  } catch (e) {
    const { details } = e.response.data;
    yield call(error, details);
  }
}

function updateProfileImage(pictureURL) {
  const resp = api.post(`/coach/settings`, {
    profile_img: pictureURL,
  });
  return resp;
}

function* updatePicture({ payload: { pictureURL, success, error } }) {
  try {
    const response = yield call(updateProfileImage, pictureURL);
    const { data } = response;
    yield put(setSettings(data));
    yield call(success);
    yield put(
      createNotification(
        "success-toast",
        "Profile picture has been updated successfully"
      )
    );
  } catch (e) {
    const { details } = e.response.data;
    yield call(error, details);
  }
}

function getSettings() {
  const resp = api.get(`/coach/settings`);
  return resp;
}

function* fetchSettings({ payload: { success, error } }) {
  try {
    const response = yield call(getSettings);
    const { data } = response;
    yield put(setSettings(data));
    yield call(success);
  } catch (e) {
    const { details } = e.response.data;
    yield call(error, details);
  }
}

function updateSettings(values) {
  const resp = api.post(`/coach/settings`, values);
  return resp;
}

function* updateNewSettings({ payload: { form, success, error } }) {
  try {
    const response = yield call(updateSettings, form);
    const { data } = response;
    yield put(setSettings(data));
    yield call(success);
    yield put(
      createNotification(
        "success-toast",
        "Profile has been updated successfully"
      )
    );
  } catch (e) {
    const { details } = e.response.data;
    yield call(error, details);
  }
}

function* settingsSaga() {
  yield takeEvery(FETCH_SETTINGS, fetchSettings);
  yield takeEvery(UPDATE_SETTINGS, updateNewSettings);
  yield takeEvery(UPDATE_PROFILE_PICTURE, updatePicture);
  yield takeEvery(UPDATE_USER_PASSWORD, updateUserPassword);
}

export default settingsSaga;
