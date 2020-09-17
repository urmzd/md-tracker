import { combineReducers } from '@reduxjs/toolkit';
import logsReducer from './Logs';

const rootReducer = combineReducers({
	logs: logsReducer,
});

export default rootReducer;
