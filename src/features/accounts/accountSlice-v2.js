const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};
// reducer function for account
export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case "account/withdraw":
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        balance: state.balance - state.loan,
        loanPurpose: "",
      };
    default:
      return state;
  }
}

///////////////////////////////////////////////
// Here, i'm creating a common convention (Action creator function)
// Deposit
export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };
  // This a middleware function
  return async function (dispatch, getState) {
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
// withdraw

export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
// requestLoan
export function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}

// payloan
export function payLoan() {
  return {
    type: "account/payLoan",
  };
}
