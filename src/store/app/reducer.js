import initialState from "../initialState";
import {
  INITIALIZED,
  SET_USER,
  CREATE_NOTIFICATION,
  REMOVE_NOTIFICATION,
} from "./actions";

export default function appReducer(
  state = initialState.app,
  { type, payload }
) {
  switch (type) {
    case SET_USER: {
      return { ...state, user: payload.user };
    }
    case CREATE_NOTIFICATION: {
      return { ...state, notification: payload };
    }
    case REMOVE_NOTIFICATION: {
      return { ...state, notification: { open: false } };
    }
    case INITIALIZED: {
      return { ...state, isInitialized: payload.isInitialized };
    }
    default:
      return state;
  }
}
