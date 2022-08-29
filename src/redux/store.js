import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import user from "./modules/user";
import chat from "./modules/chat";

const rootReducer = combineReducers({
  user,
  chat,
});

const middlewares = [thunk];

let store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
