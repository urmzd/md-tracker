import moment from 'moment';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { RecordIcon } from '../../components';
import { ButtonStatus, MainRoutes, ModalRoutes } from '../../constants/Misc';
import { setRoute } from '../../features/LoadingModal';
import { fetchLogs, createLog } from '../../features/Logs';
import { RootState, LogTemplate } from '../../types';
import { useAppDispatch } from '../../utils/Redux';

const Home = ({ navigation }: any) => {
	const logs = useSelector((state: RootState) => state.logs);
	const container = [...logs.container];

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchLogs());
	}, []);

	let currentRecord: LogTemplate | undefined = {
		startDateTime: moment().toString(),
	};

	let status = ButtonStatus.INACTIVE;

	if (container.length) {
		currentRecord = container.pop()!;

		if (currentRecord.startDateTime && !currentRecord.endDateTime) {
			status = ButtonStatus.ACTIVE;
		}
	}

	const onButtonToggle = () => {
		if (status === ButtonStatus.INACTIVE) {
			dispatch(createLog());
		} else {
			dispatch(setRoute(MainRoutes.HOME));
			navigation.navigate(ModalRoutes.REPORT);
		}
	};

	return (
		<SafeAreaView
			style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
		>
			<RecordIcon status={status} onButtonToggle={onButtonToggle} />
		</SafeAreaView>
	);
};

export default Home;
