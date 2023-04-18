import { createSlice } from "@reduxjs/toolkit"

export const homeContentSlice = createSlice({
  name: "homeContent",
  initialState: {
    currentBaby: null
  },
  reducers: {
    setCurrentBaby: (state, action) => {
      state.currentBaby = action.payload
    },
  }
})

export const { setCurrentBaby } = homeContentSlice.actions;

// selectors
export const selectCurrentBaby = (state: any) => state.homeContent.currentBaby;

export default homeContentSlice.reducer;
