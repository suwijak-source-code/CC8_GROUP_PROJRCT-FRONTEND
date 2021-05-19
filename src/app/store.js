import { configureStore } from "@reduxjs/toolkit";
import orderListsReducer from "../features/Order/OrderListsSlice";
import productReducer from "../features/Product/ProductsSlice";

export default configureStore({
  reducer: {
    orderLists: orderListsReducer,
    products: productReducer,
  },
});
