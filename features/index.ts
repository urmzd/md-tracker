import { combineReducers } from '@reduxjs/toolkit';
import logsReducer from './Logs';
import loadingModalReducer from './LoadingModal';
import prescriptionsReducer from './Prescriptions';

const rootReducer = combineReducers({
	logs: logsReducer,
	loadingModal: loadingModalReducer,
	prescriptions: prescriptionsReducer,
});

export default rootReducer;
