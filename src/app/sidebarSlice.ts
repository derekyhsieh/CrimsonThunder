import { createSlice } from "@reduxjs/toolkit";

export const enum sidebarState {
	home = "home",
	calendar = "calendar",
	settings = "settings",
}

export const sidebarSlice = createSlice({
	name: "sidebar",
	initialState: {
		currentTab: sidebarState.home,
	},
	reducers: {
		changeTab: (state, action) => {
			state.currentTab = action.payload;
		},
	},
});

export const { changeTab } = sidebarSlice.actions;
export const selectSidebar = (state: any) => state.sidebar.currentTab;

export default sidebarSlice.reducer;
