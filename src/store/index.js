import { configureStore } from "@reduxjs/toolkit";
import authR from "./modules/authSlice";
import paginationR from "./modules/paginationSlice";
import productInquiryR from "./modules/productInquirySlice";
import cartR from "./modules/cartSlice";

export const store = configureStore({
  reducer: {
    authR,
    paginationR,
    productInquiryR,
    cartR,
  },
});
