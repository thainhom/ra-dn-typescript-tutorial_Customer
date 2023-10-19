import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";

import authReducer from "./reducers/auth.reduder";
import customerCartListReducer from "./reducers/customerCartListReducer";
import customerAuthReducer from "./reducers/customerAuthReducer";

const rootReducer = combineReducers({
  authReducer,
  customerCartListReducer,
  customerAuthReducer,
});

const store: ToolkitStore = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof rootReducer>;
export type RootState = ReturnType<typeof rootReducer>; // Định nghĩa kiểu RootState

export default store;
