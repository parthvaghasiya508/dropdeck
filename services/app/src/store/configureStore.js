import { combineReducers, createStore } from "redux";
import { composerReducer } from "../reducers/composer";
import { userReducer } from "../reducers/user";
import { rootReducerGenerator } from "../reducers/root";

export const configureStore = (initialState) => {
  const rootReducer = rootReducerGenerator(initialState);
  const store = createStore(
    combineReducers({
      app: rootReducer,
      user: userReducer,
      composer: composerReducer,
    }),
  );
  return store;
};
