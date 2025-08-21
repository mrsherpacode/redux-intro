// Modern way of using redux toolkit //
import { createSlice } from "@reduxjs/toolkit";

// initial state for customer
const initialState = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};
const customerSlice = createSlice({
  name: " customer",
  initialState,
  reducers: {
    customerAccount: {
      prepare(fullName, nationalId) {
        return {
          payload: {
            fullName,
            nationalId,
            createdAt: new Date().toISOString(),
          },
        };
      },
      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.nationalId = action.payload.nationalId;
        state.createdAt = action.payload.createdAt;
      },
    },
    customerUpdate(state, action) {
      state.fullName = action.payload;
    },
  },
});

export const { customerAccount, customerUpdate } = customerSlice.actions;
export default customerSlice.reducer;
