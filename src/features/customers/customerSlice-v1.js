// This is classic way of redux
// initial state for customer

const initialStateCustomer = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};
// reducer  for customer
export default function customerReducer(state = initialStateCustomer, action) {
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

//////////////////////////////////////
//action creator function for customer
export function customerAccount(fullName, nationalId) {
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
export function customerUpdate(fullName) {
  return {
    type: "customer/customerUpdate",
    payload: fullName,
  };
}
