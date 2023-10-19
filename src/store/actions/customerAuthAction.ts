import { createAction } from "@reduxjs/toolkit";
import { PayloadActionCreator } from "@reduxjs/toolkit/src/createAction";

const login: PayloadActionCreator<string> = createAction("CUSTOMER_LOGIN");
const setCustomerAuth: PayloadActionCreator<boolean> =
  createAction("CUSTOMER_SET_AUTH");
const logout: PayloadActionCreator<undefined> = createAction("CUSTOMER_LOGOUT");

export { login, setCustomerAuth, logout };
