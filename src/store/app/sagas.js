import {
  put,
  take,
  takeEvery,
  call,
  fork,
  spawn,
  delay,
  race,
} from "redux-saga/effects";
import { push } from "connected-react-router";
import {
  INITIALIZE,
  LOGOUT_USER,
  initialized,
  setUser,
  logout as logoutAction,
  FETCH_USER,
  SET_LOGGED_USER,
  LOGIN_MANUAL,
  SIGNUP_USER,
  FORGOT_PASSWORD,
  CONFIRM_EMAIL_ADDRESS,
  createNotification,
  RESET_EMAIL_ADDRESS_CONFIRMATION,
  RESET_PASSWORD,
  DELETE_ACCOUNT,
} from "./actions";
import api from "../../services/api/ApiService";
function getRefreshToken() {
  return String(window.localStorage.getItem("authRefreshToken"));
}

function setRefreshToken(token) {
  window.localStorage.setItem("authRefreshToken", token);
}

function removeRefreshToken() {
  window.localStorage.removeItem("authRefreshToken");
}

function refreshToken(token) {
  const response = api.post("/api/jwt/token/refresh", {
    refresh: String(token),
  });
  return response;
}

function setApiAuth(token) {
  api.defaults.headers.common.Authorization = `JWT ${token}`;
}

function unsetAuth() {
  api.defaults.headers.common.Authorization = null;
}

function retrieveMe() {
  const response = api.get("/api/me");
  return response;
}

function* getUser() {
  const {
    data: { payload, metadata },
  } = yield call(retrieveMe);
  if (metadata.status === "SUCCESS") {
    const { user } = payload;
    yield put(setUser(user));
  }
}

function* logout() {
  yield call(removeRefreshToken);
  yield call(unsetAuth);
  yield put(setUser(null));
  yield put(push("/login"));
}

function* refreshLoop(refresher) {
  let userSignedOut;
  while (!userSignedOut) {
    const { expired } = yield race({
      expired: delay(270000), // Wait 4.5 min before refreshing
      signout: take(LOGOUT_USER),
    });

    // token expired first
    if (expired) {
      try {
        const {
          data: { payload, metadata },
        } = yield call(refreshToken, refresher);

        if (metadata.status === "SUCCESS") {
          const { access, refresh } = payload;
          yield call(setApiAuth, access);
          yield call(setRefreshToken, refresh);
          yield call(getUser);
        }
      } catch (e) {
        userSignedOut = true;
        yield put(logoutAction());
      }
    }
    // user signed out before token expiration
    else {
      userSignedOut = true;
    }
  }
}
export function* setupAuth(access, refresh) {
  setApiAuth(access);
  setRefreshToken(refresh);
  yield spawn(refreshLoop, refresh);
}

function* initializeApp() {
  const token = yield call(getRefreshToken);
  if (token && token !== "null" && token !== "undefined") {
    try {
      const {
        data: { payload, metadata },
      } = yield call(refreshToken, token);
      if (metadata.status === "SUCCESS") {
        const { access } = payload;
        if (access) {
          yield call(setApiAuth, access);
          yield call(getUser);
          yield fork(refreshLoop, token);
        } else {
          yield call(removeRefreshToken);
        }
      }
    } catch (e) {
      yield call(unsetAuth);
      yield call(removeRefreshToken);
    }
  }

  yield put(initialized(true));
}

function* setLoggedUser(user, access, refresh) {
  yield call(setupAuth, access, refresh);
  yield put(setUser(user));
}

function getAuthClient(values) {
  const response = api.post("/api/jwt/token/auth", { ...values });
  return response;
}

function signupUser(values) {
  const response = api.post("/api/signup", {
    ...values,
    accountType: "user",
    source: "forestly_user_app",
  });
  return response;
}

function* signup({ payload: { form, onSuccess, onError } }) {
  try {
    const {
      data: { metadata },
    } = yield call(signupUser, form);
    if (metadata.status === "SUCCESS") {
      yield call(onSuccess);
      yield put(push("/email-verification-message"));
    } else {
      yield call(onError, metadata.message);
    }
  } catch (e) {
    const { details } = e.response;
    yield call(onError, details);
  }
}

function* login({ payload: { form, onSuccess, onError } }) {
  try {
    const {
      data: { payload, metadata },
    } = yield call(getAuthClient, form);
    if (metadata.status === "SUCCESS") {
      const { user, access, refresh } = payload;
      yield call(setApiAuth, access);
      yield call(setLoggedUser, user, access, refresh);
      yield call(onSuccess);
      yield put(push("/admin/dashboard"));
    } else {
      console.log(metadata.message);
      yield call(onError, metadata.message);
    }
  } catch (e) {
    const { details } = e.response;
    yield call(onError, details);
  }
}

function forgot(form) {
  const response = api.post("/api/forgot-password", { ...form });
  return response;
}

function* forgotPassword({ payload: { form, onSuccess, onError } }) {
  try {
    const {
      data: { metadata },
    } = yield call(forgot, form);
    if (metadata.status === "SUCCESS") {
      yield call(onSuccess);
      yield put(push("/reset-password-message"));
    } else {
      yield call(onError, metadata.status);
    }
  } catch (e) {
    yield call(onError, e);
  }
}

function reset(form) {
  const response = api.post("/api/reset-password", { ...form });
  return response;
}

function* resetUserPassword({ payload: { form, onSuccess, onError } }) {
  try {
    const {
      data: { metadata },
    } = yield call(reset, form);
    if (metadata.status === "SUCCESS") {
      yield call(onSuccess);
      yield put(push("/login"));
      yield put(
        createNotification(
          "success-toast",
          "A request to change the password for your account has been sent to your email"
        )
      );
    } else {
      yield call(onError, metadata.status);
    }
  } catch (e) {
    yield call(onError, e);
  }
}

function deleteThisAccount(id) {
  const response = api.post("/api/admin/delete-account", { accountId: id });
  return response;
}

function* deleteAccount({ payload: { id, onSuccess, onError } }) {
  try {
    const {
      data: { metadata },
    } = yield call(deleteThisAccount, id);
    if (metadata.status === "SUCCESS") {
      yield call(onSuccess);
      yield put(logoutAction());
    } else {
      yield call(onError, metadata.status);
    }
  } catch (e) {
    yield call(onError, e);
  }
}

function verifyEmail(token) {
  const response = api.post("/api/confirm-email", { token: token });
  return response;
}

function* emailVerification({ payload: { token, onSuccess, onError } }) {
  try {
    const {
      data: { payload, metadata },
    } = yield call(verifyEmail, token);
    if (metadata.status === "SUCCESS") {
      const { user, access, refresh } = payload;
      yield call(setApiAuth, access);
      yield call(setLoggedUser, user, access, refresh);
      yield call(onSuccess);
      yield put(push("/admin/dashboard"));
    } else {
      console.log(metadata.message);
      yield call(onError, metadata.message);
    }
  } catch (e) {
    const { details } = e.response;
    yield call(onError, details);
  }
}

function verifyResetEmail(token) {
  const response = api.post("/api/reset-password-confirmation", {
    token: token,
  });
  return response;
}

function* resetEmailVerification({ payload: { token, onSuccess, onError } }) {
  try {
    const {
      data: { payload, metadata },
    } = yield call(verifyResetEmail, token);
    if (metadata.status === "SUCCESS") {
      const {
        user: { email },
      } = payload;
      window.localStorage.setItem("forgotEmail", email);
      yield call(onSuccess);
      yield put(push("/reset-password"));
    } else {
      console.log(metadata.message);
      yield call(onError, metadata.message);
    }
  } catch (e) {
    const { details } = e.response;
    yield call(onError, details);
  }
}

function* appSaga() {
  yield takeEvery(INITIALIZE, initializeApp);
  yield takeEvery(LOGOUT_USER, logout);
  yield takeEvery(FETCH_USER, getUser);
  yield takeEvery(SET_LOGGED_USER, setLoggedUser);
  yield takeEvery(LOGIN_MANUAL, login);
  yield takeEvery(SIGNUP_USER, signup);
  yield takeEvery(FORGOT_PASSWORD, forgotPassword);
  yield takeEvery(RESET_PASSWORD, resetUserPassword);
  yield takeEvery(DELETE_ACCOUNT, deleteAccount);
  yield takeEvery(CONFIRM_EMAIL_ADDRESS, emailVerification);
  yield takeEvery(RESET_EMAIL_ADDRESS_CONFIRMATION, resetEmailVerification);
}

export default appSaga;
