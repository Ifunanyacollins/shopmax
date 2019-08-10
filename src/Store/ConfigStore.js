import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import Products from "../Reducers/Products";
import Categories from "../Reducers/ProductActions";
import User from "../Reducers/User";
const ComposeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      Products,
      Categories,
      User
    }),
    ComposeEnhancers(applyMiddleware(thunk))
  );
  return store;
};
