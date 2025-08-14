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
export function deposit(amount) {
  return { type: "account/deposit", payload: amount };
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
