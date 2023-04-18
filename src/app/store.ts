import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import homeContentReducer from "./homeContentSlice"
import homeContentSlice from "./homeContentSlice";
import sidebarReducer from "./sidebarSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    homeContent: homeContentSlice,
    sidebar: sidebarReducer
  }
})

