import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import signUpReducer from "./reducers/signUp.reducer";
import signInReducer from "./reducers/signIn.reducer";
import appReducer from "./reducers/app.reducer";

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  signUpReducer,
  signInReducer,
  appReducer
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
  appReducer: any
}

export default store;
