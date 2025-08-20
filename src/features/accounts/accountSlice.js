// accountSlice with modern redux tookit
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance = state.balance + action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    // modern redux only accept one argument so use this method for more than one  arguments
    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        };
      },

      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance = state.balance + action.payload.amount;
      },
    },
    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertingCurrecy(state) {
      state.isLoading = true;
    },
  },
});
///////////////////////////////////////////////
// the classic way of redux
// Here, i'm creating a common convention (Action creator function)
// Deposit
export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };
  // This a middleware function
  return async function (dispatch, getState) {
    dispatch({ type: "account/covertingCurrency" });
    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
      );
      const data = await res.json();
      const converted = data.rates ? data.rates.USD : data.amount;
      dispatch({ type: "account/deposit", payload: converted });
    } catch (error) {
      console.error("Currency conversion failed:", error);
      // Fallback to original amount if conversion fails
      dispatch({ type: "account/deposit", payload: amount });
    }
  };
}
export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

export default accountSlice.reducer;
