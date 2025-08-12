// Here, i'm creating redux, which is almost same as useReducer.
// Here, i'm importing createStore from redux, it's only for learning purpose cuz its depricated.
import { combineReducers, createStore } from "redux";
const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

// initial state for customer
const initialStateCustomer = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};
// reducer function for account
function accountReducer(state = initialStateAccount, action) {
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

// reducer  for customer
function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/customerAccount":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalId: action.payload.nationalId,
        createdAt: action.payload.createdAt,
      };

    case "customer/customerUpdate":
      return {
        ...state,
        fullName: action.payload,
      };
    default:
      return state;
  }
}

// creating rootReducer for multiple reducer with combineReducers
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

// //Here, i'm using redux's createStore and passing rootReducer function to createStore
const store = createStore(rootReducer);
// // dispatching the action
// store.dispatch({ type: "account/deposit", payload: 500 });
// console.log(store.getState());

// store.dispatch({ type: "account/withdraw", payload: 200 });
// console.log(store.getState());
// // here, for payload i'm using object.
// store.dispatch({
//   type: "account/requestLoan",
//   payload: {
//     amount: 500,
//     purpose: "To buy a mobile",
//   },
// });

// store.dispatch({ type: "account/payLoan" });
// console.log(store.getState());

// console.log(store.getState());
///////////////////////////////////////////////
// Here, i'm creating a common convention (Action creator function)
// Deposit
function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}
// withdraw

function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
// requestLoan
function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}

// payloan
function payLoan() {
  return { type: "account/payLoan" };
}

///////////////////////////////////////////
store.dispatch(deposit(500));
console.log(store.getState());

store.dispatch(withdraw(200));
console.log(store.getState());

store.dispatch(requestLoan(500, "to buy a car"));
console.log(store.getState());

store.dispatch(payLoan());
console.log(store.getState());
//////////////////////////////////////
//action for customer
function customerAccount(fullName, nationalId) {
  return {
    type: "customer/customerAccount",
    payload: {
      fullName,
      nationalId,
      createdAt: new Date().toISOString(),
    },
  };
}
// customer update
function customerUpdate(fullName) {
  return {
    type: "customer/customerUpdate",
    payload: fullName,
  };
}
//  dispatching action for customer
store.dispatch(customerAccount("chhiring sherpa", "1234567"));
console.log(store.getState());
store.dispatch(customerAccount("pasang sherpa", "7654321"));
console.log(store.getState());
