import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { RecordIcon } from '../../components';
import { ButtonStatus, MainRoutes, ModalRoutes } from '../../constants/Misc';
import { Errors, Statuses } from '../../constants/Redux';
import { setRoute } from '../../features/LoadingModal';
import { fetchLogs, createLog } from '../../features/Logs';
import { RootState, LogTemplate } from '../../types';
import { useAppDispatch } from '../../utils/Redux';

const Home = ({ navigation }: any) => {
	const logs = useSelector((state: RootState) => state.logs);
	const status = logs.status;

	const dispatch = useAppDispatch();

	const initialLoad = () => {
		return (dispatch: any) => {
			dispatch(setRoute(MainRoutes.HOME));
			dispatch(fetchLogs());
		};
	};
	useEffect(() => {
		dispatch(initialLoad());
	}, []);

	const onButtonToggle = () => {
		if (
			status === Statuses.FULFILLED ||
			(status === Statuses.REJECTED && logs?.error?.type === Errors.EMPTY)
		) {
			dispatch(createLog());
		} else {
			navigation.navigate(ModalRoutes.SYMPTOM_REPORT);
		}
	};

	return (
		<SafeAreaView
			style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
		>
			<RecordIcon
				status={
					status === Statuses.PENDING
						? ButtonStatus.ACTIVE
						: ButtonStatus.INACTIVE
				}
				onButtonToggle={onButtonToggle}
			/>
		</SafeAreaView>
	);
};

export default Home;
