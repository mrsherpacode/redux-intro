// configureStore is a function from modern reduxtoolkit.
import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./features/accounts/accountSlice-v2";
import customerReducer from "./features/customers/customerSlice";

// creating rootReducer for multiple reducer with configureStore
const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
  // Redux DevTools are automatically enabled in development
});

export default store;
