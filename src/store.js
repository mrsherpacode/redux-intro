// Here, i'm creating redux, which is almost same as useReducer.
// Here, i'm importing createStore from redux, it's only for learning purpose cuz its depricated.
import { applyMiddleware, combineReducers, createStore } from "redux";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";
// This is redux's middleware
import { thunk } from "redux-thunk";

// creating rootReducer for multiple reducer with combineReducers
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

// //Here, i'm using redux's createStore and passing rootReducer function to createStore and also applying redux middleware(thunk)
const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
