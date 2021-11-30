import { ACTION_SHOW_PREVIEW } from "../actions/status";

export const rootReducerGenerator = (initialState) => (state = initialState, action) => {
  switch (action.type) {
    case ACTION_SHOW_PREVIEW:
      return {
        preview: action.show,
      };
    default:
      return state;
  }
};
