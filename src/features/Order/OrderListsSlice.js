import { createSlice } from "@reduxjs/toolkit";

export const orderListsSlice = createSlice({
  name: "orderLists",
  initialState: {
    orders: [],
  },
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
  },
});

export const { setOrders } = orderListsSlice.actions;

export default orderListsSlice.reducer;
