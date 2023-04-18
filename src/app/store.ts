import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import sidebarReducer from "./sidebarSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    sidebar: sidebarReducer
  }
})

