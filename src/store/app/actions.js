export const INITIALIZE = "app/INITIALIZE";
export const INITIALIZED = "app/INITIALIZED";
export const FETCH_USER = "app/FETCH_USER";
export const SET_USER = "app/SET_USER";
export const SIGNUP_USER = "app/SIGNUP_USER";
export const LOGOUT_USER = "app/LOGOUT_USER";
export const SET_LOGGED_USER = "app/SET_LOGGED_USER";
export const LOGIN_MANUAL = "app/LOGIN_MANUAL";
export const FORGOT_PASSWORD = "app/FORGOT_PASSWORD";
export const RESET_PASSWORD = "app/RESET_PASSWORD";
export const DELETE_ACCOUNT = "app/DELETE_ACCOUNT";
export const CREATE_NOTIFICATION = "app/CREATE_NOTIFICATION";
export const REMOVE_NOTIFICATION = "app/REMOVE_NOTIFICATION";
export const CONFIRM_EMAIL_ADDRESS = "app/CONFIRM_EMAIL_ADDRESS";
export const RESET_EMAIL_ADDRESS_CONFIRMATION =
  "app/RESET_EMAIL_ADDRESS_CONFIRMATION";

export const initialize = () => ({
  type: INITIALIZE,
  payload: {},
});

export const initialized = (isInitialized) => ({
  type: INITIALIZED,
  payload: {
    isInitialized,
  },
});

export const fetchUser = () => ({
  type: FETCH_USER,
});

export const setUser = (user) => ({
  type: SET_USER,
  payload: { user },
});

export const logout = () => ({
  type: LOGOUT_USER,
});

export const setLoggedUser = (user, access, refresh) => ({
  type: SET_LOGGED_USER,
  payload: { user, access, refresh },
});

export const signup = (form, onSuccess, onError) => ({
  type: SIGNUP_USER,
  payload: { form, onSuccess, onError },
});

export const login = (form, onSuccess, onError) => ({
  type: LOGIN_MANUAL,
  payload: { form, onSuccess, onError },
});

export const forgotPassword = (form, onSuccess, onError) => ({
  type: FORGOT_PASSWORD,
  payload: { form, onSuccess, onError },
});

export const resetPassword = (form, onSuccess, onError) => ({
  type: RESET_PASSWORD,
  payload: { form, onSuccess, onError },
});

export const deleteAccount = (id, onSuccess, onError) => ({
  type: DELETE_ACCOUNT,
  payload: { id, onSuccess, onError },
});

export const createNotification = (type, message, timeout = 6000) => ({
  type: CREATE_NOTIFICATION,
  payload: { type, message, open: true, timeout },
});

export const removeNotification = () => ({
  type: REMOVE_NOTIFICATION,
});

export const confirmEmailAddress = (token, onSuccess, onError) => ({
  type: CONFIRM_EMAIL_ADDRESS,
  payload: { token, onSuccess, onError },
});

export const resetEmailAddressConfirmation = (token, onSuccess, onError) => ({
  type: RESET_EMAIL_ADDRESS_CONFIRMATION,
  payload: { token, onSuccess, onError },
});
