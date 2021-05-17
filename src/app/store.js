import { configureStore } from "@reduxjs/toolkit";
import orderListsReducer from "../features/Order/OrderListsSlice";

export default configureStore({
  reducer: {
    orderLists: orderListsReducer,
  },
});
