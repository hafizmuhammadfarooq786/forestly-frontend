import initialState from "../initialState";
import { SET_SETTINGS } from "./actions";

export default function overviewReducer(
  state = initialState.app,
  { type, payload }
) {
  switch (type) {
    case SET_SETTINGS:
      return { ...state, settings: payload };
    default:
      return state;
  }
}
