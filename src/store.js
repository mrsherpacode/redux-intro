// Here, i'm creating redux, which is almost same as useReducer.
// Here, i'm importing createStore from redux, it's only for learning purpose cuz its depricated.
import { combineReducers, createStore } from "redux";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";
// creating rootReducer for multiple reducer with combineReducimers
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

// //Here, i'm using redux's createStore and passing rootReducer function to createStore
const store = createStore(rootReducer);
export default store;
