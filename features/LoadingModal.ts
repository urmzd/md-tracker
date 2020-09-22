import { createSlice } from '@reduxjs/toolkit';
import { MainRoutes } from '../constants/Misc';

const loadingScreen = createSlice({
	name: 'loadingScreen',
	initialState: {
		visibility: false,
		message: '',
		route: MainRoutes.HOME,
	},
	reducers: {
		startLoadingScreen: (state, action) => {
			state.message = action.payload;
			state.visibility = true;
		},
		clearLoadingScreen: (state, action) => {
			state.message = action.payload;
			state.visibility = false;
		},
		setRoute: (state, action) => {
			state.route = action.payload;
		},
	},
});

export const {
	startLoadingScreen,
	clearLoadingScreen,
	setRoute,
} = loadingScreen.actions;
export default loadingScreen.reducer;
