import { createSlice } from '@reduxjs/toolkit';
import { MainRoutes } from '../constants/Misc';
import { Statuses } from '../constants/Redux';

interface LoadingScreenSlice {
	route: MainRoutes;
	status: Statuses;
}
const initialState: LoadingScreenSlice = {
	route: MainRoutes.HOME,
	status: Statuses.FULFILLED,
};
const loadingScreen = createSlice({
	name: 'loadingScreen',
	initialState,
	reducers: {
		setRoute: (state, action) => {
			state.route = action.payload;
			state.status = Statuses.FULFILLED;
		},
	},
});

export const { setRoute } = loadingScreen.actions;
export default loadingScreen.reducer;
