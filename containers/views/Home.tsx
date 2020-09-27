import moment from 'moment';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { RecordIcon } from '../../components';
import { ButtonStatus, MainRoutes, ModalRoutes } from '../../constants/Misc';
import { Statuses } from '../../constants/Redux';
import { setRoute } from '../../features/LoadingModal';
import { fetchLogs, createLog } from '../../features/Logs';
import { RootState, LogTemplate } from '../../types';
import { useAppDispatch } from '../../utils/Redux';

const Home = ({ navigation }: any) => {
	const logs = useSelector((state: RootState) => state.logs);
	const container = [...logs.container];
	const status = logs.status;

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchLogs());
	}, []);

	let currentRecord: LogTemplate | undefined = {
		startDateTime: moment().toString(),
	};

	const onButtonToggle = () => {
		if (status === Statuses.FULFILLED) {
			dispatch(createLog());
		} else {
			dispatch(setRoute(MainRoutes.HOME));
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
