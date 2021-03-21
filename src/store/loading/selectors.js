export const createLoadingSelector = (data) => (state) =>
  data.some((item) => state.loading[item]);
