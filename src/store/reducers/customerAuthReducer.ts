import { createReducer } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface CustomerAuthState {
  isAuthenticate: boolean;
}

const initialState: CustomerAuthState = {
  isAuthenticate: false,
};

const customerAuthReducer = createReducer(initialState, {
  CUSTOMER_REGISTER: (state, action: PayloadAction) => state,
  CUSTOMER_LOGIN: (state, action: PayloadAction<string>) => {
    window.localStorage.setItem('X-API-Key', action.payload);
    return {
      ...state,
      isAuthenticate: true,
    };
  },
  CUSTOMER_SET_AUTH: (state, action: PayloadAction<boolean>) => {
    return {
      ...state,
      isAuthenticate: action.payload,
    };
  },
  CUSTOMER_LOGOUT: (state, action: PayloadAction) => {
    window.localStorage.removeItem('X-API-Key');
    return {
      ...state,
      isAuthenticate: false,
    };
  },
});

export default customerAuthReducer;
