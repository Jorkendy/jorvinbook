import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import signUpReducer from "./reducers/signUp.reducer";
import signInReducer from "./reducers/signIn.reducer";
import appReducer from "./reducers/app.reducer";
import documentReducer from "./reducers/document.reducer";
import userReducer from "./reducers/user.reducer";

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  signUpReducer,
  signInReducer,
  appReducer,
  documentReducer,
  userReducer
});

const composeEnhancers =
  typeof window === "object" &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));
const store = createStore(reducers, initialState, enhancer);

export interface reducer {
  signUpReducer: any;
  signInReducer: any;
  appReducer: any;
  documentReducer: any;
  userReducer: any;
}

export default store;
