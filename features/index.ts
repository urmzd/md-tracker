import { combineReducers } from '@reduxjs/toolkit';
import logsReducer from './Logs';
import loadingModalReducer from './LoadingModal';

const rootReducer = combineReducers({
	logs: logsReducer,
	loadingModal: loadingModalReducer,
});

export default rootReducer;
