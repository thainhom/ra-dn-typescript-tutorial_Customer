import { createAction } from "@reduxjs/toolkit";
import { PayloadActionCreator } from "@reduxjs/toolkit/src/createAction";

const addToCart: PayloadActionCreator<undefined> = createAction("ADD_TO_CART");
const changeQuantity: PayloadActionCreator<any> =
  createAction("CHANGE_Quantity");
const checkout: PayloadActionCreator<any> = createAction("CHECKOUT");
const deleteFromCart: PayloadActionCreator<undefined> =
  createAction("DELETE_FROM_CART");

export { addToCart, changeQuantity, checkout, deleteFromCart };
