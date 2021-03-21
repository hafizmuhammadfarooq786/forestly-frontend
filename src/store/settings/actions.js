export const FETCH_SETTINGS = "settings/FETCH_SETTINGS";
export const UPDATE_SETTINGS = "settings/UPDATE_SETTINGS";
export const SET_SETTINGS = "settings/SET_SETTINGS";
export const UPDATE_PROFILE_PICTURE = "settings/UPDATE_PROFILE_PICTURE";
export const UPDATE_USER_PASSWORD = "settings/UPDATE_USER_PASSWORD";

export const fetchSettings = (success, error) => ({
  type: FETCH_SETTINGS,
  payload: { success, error },
});

export const updateProfileSettings = (form, success, error) => ({
  type: UPDATE_SETTINGS,
  payload: { form, success, error },
});

export const setSettings = (payload) => ({
  type: SET_SETTINGS,
  payload,
});

export const updateProfilePicture = (pictureURL, success, error) => ({
  type: UPDATE_PROFILE_PICTURE,
  payload: {
    pictureURL,
    success,
    error,
  },
});

export const updateUserPassword = (form, successMessage, error) => ({
  type: UPDATE_USER_PASSWORD,
  payload: {
    form,
    successMessage,
    error,
  },
});
