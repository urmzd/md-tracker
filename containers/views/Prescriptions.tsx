import React, { useEffect } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FAB, Portal } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { ColorPalette, MainRoutes, ModalRoutes } from '../../constants/Misc';
import { Statuses } from '../../constants/Redux';
import { ErrorScreen } from '../../components';
import { useAppDispatch } from '../../utils/Redux';
import { fetchPrescriptions } from '../../features/Prescriptions';
import { RootState } from '../../types';
import { setRoute } from '../../features/LoadingModal';

const Prescriptions = ({ navigation }: any) => {
	const prescriptions = useSelector(
		(state: RootState) => state.prescriptions
	);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchPrescriptions());
	}, []);

	let child = null;
	if (prescriptions.status === Statuses.REJECTED && prescriptions.error) {
		child = <ErrorScreen message={prescriptions.error.message} />;
	}
	return (
		<SafeAreaView style={{ flex: 1, padding: 16 }}>
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				{child}
			</View>
			<View
				style={{
					justifyContent: 'flex-end',
					alignItems: 'center',
				}}
			>
				<FAB
					small
					icon='plus'
					accessibilityValue={{ text: 'Add Prescription' }}
					focusable={true}
					style={{
						backgroundColor: ColorPalette.PRIMARY_BLUE,
						padding: 4,
					}}
					color={ColorPalette.WHITE}
					onPress={() => {
						dispatch(setRoute(MainRoutes.PRESCRIPTIONS));
						navigation.navigate(ModalRoutes.PRESCRIPTION);
					}}
				/>
			</View>
		</SafeAreaView>
	);
};

export default Prescriptions;
