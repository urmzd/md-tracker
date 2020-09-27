import { createSlice } from '@reduxjs/toolkit';
import { MainRoutes } from '../constants/Misc';
import { Statuses } from '../constants/Redux';

interface LoadingScreenSlice {
	route: MainRoutes;
	status: Statuses;
}
const initialState: LoadingScreenSlice = {
	route: MainRoutes.HOME,
	status: Statuses.PENDING,
};
const loadingScreen = createSlice({
	name: 'loadingScreen',
	initialState,
	reducers: {
		clearRoute: (state) => {
			(state.route = MainRoutes.HOME),
				(state.status = Statuses.FULFILLED);
		},
		setRoute: (state, action) => {
			state.route = action.payload;
			state.status = Statuses.PENDING;
		},
	},
});

export const { clearRoute, setRoute } = loadingScreen.actions;
export default loadingScreen.reducer;
