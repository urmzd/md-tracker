import React, { useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import { FAB } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { ColorPalette } from '../../constants/Misc';
import { Statuses } from '../../constants/Redux';
import { ErrorScreen } from '../../components';
import { useAppDispatch } from '../../utils/Redux';
import { fetchPrescriptions } from '../../features/Prescriptions';
import { RootState } from '../../types';

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
		<SafeAreaView style={{ flex: 1 }}>
			<View
				style={{
					padding: 16,
					flex: 1,
					justifyContent: 'flex-end',
					alignItems: 'flex-end',
				}}
			>
				{child}
				<FAB
					small
					icon='plus'
					accessibilityValue={{ text: 'Add Prescription' }}
					focusable={true}
					style={{
						borderRadius: 100,
						backgroundColor: ColorPalette.PRIMARY_BLUE,
						padding: 4,
					}}
				/>
			</View>
		</SafeAreaView>
	);
};

export default Prescriptions;
