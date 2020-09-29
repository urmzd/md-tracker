import moment from 'moment';
import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import {
	Avatar,
	Button,
	Card,
	FAB,
	Paragraph,
	Subheading,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { ErrorScreen } from '../../components';
import { ColorPalette, MainRoutes, ModalRoutes } from '../../constants/Misc';
import { Statuses } from '../../constants/Redux';
import { setRoute } from '../../features/LoadingModal';
import {
	fetchPrescriptions,
	Prescription,
	removePrescription,
} from '../../features/Prescriptions';
import { RootState } from '../../types';
import { useAppDispatch } from '../../utils/Redux';

const Prescriptions = ({ navigation }: any) => {
	const prescriptions = useSelector(
		(state: RootState) => state.prescriptions
	);

	const container = [...prescriptions.container];

	const dispatch = useAppDispatch();

	const initialLoad = () => {
		return (dispatch: any) => {
			dispatch(setRoute(MainRoutes.PRESCRIPTIONS));
			dispatch(fetchPrescriptions());
		};
	};
	useEffect(() => {
		dispatch(initialLoad());
	}, []);

	let child: any = container.map(
		(prescription: Prescription, index: number) => {
			const { name, dosage, dosageUnit, dates, times } = prescription;
			return (
				<View style={{ paddingTop: 6, paddingBottom: 6 }} key={index}>
					<Card
						accessibilityValue={{ text: `${name} description` }}
						focusable={true}
					>
						<Card.Title
							title={name}
							subtitle={`${dosage} ${dosageUnit}`}
							accessibilityValue={{ text: `${name} title` }}
							focusable={true}
							left={(props: any) => (
								<Avatar.Icon
									{...props}
									icon='pill'
									color={ColorPalette.WHITE}
									style={{
										backgroundColor:
											ColorPalette.PRIMARY_BLUE,
									}}
								/>
							)}
						/>
						<Card.Content>
							<View
								style={{
									flexDirection: 'row',
								}}
							>
								{dates.map((date: number) => {
									return (
										<Paragraph
											key={date}
											style={{ padding: 4 }}
										>
											{moment(date, 'd').format('ddd')}
										</Paragraph>
									);
								})}
							</View>

							<View
								style={{
									flexDirection: 'row',
								}}
							>
								{times.map((time: string, index: number) => {
									return (
										<Paragraph
											key={index}
											style={{ padding: 4 }}
										>
											{time}
										</Paragraph>
									);
								})}
							</View>
						</Card.Content>
						<Card.Actions>
							<View style={{ padding: 6 }}>
								<Button
									mode='contained'
									icon='pencil'
									accessibilityValue={{
										text: 'Edit Prescription',
									}}
									color={ColorPalette.PRIMARY_BLUE}
									focusable={true}
									labelStyle={{ color: ColorPalette.WHITE }}
									onPress={() =>
										navigation.navigate(
											ModalRoutes.PRESCRIPTION,
											{ index }
										)
									}
								>
									<Subheading
										style={{ color: ColorPalette.WHITE }}
									>
										EDIT
									</Subheading>
								</Button>
							</View>

							<View style={{ padding: 12 }}>
								<Button
									mode='contained'
									icon='delete'
									accessibilityValue={{
										text: 'Delete Prescription',
									}}
									onPress={() =>
										navigation.navigate(
											ModalRoutes.LOADING,
											{
												action: removePrescription,
												payload: index,
												stateSlice: MainRoutes.PRESCRIPTIONS.toLowerCase(),
											}
										)
									}
									color={ColorPalette.PRIMARY_RED}
									focusable={true}
									labelStyle={{ color: ColorPalette.WHITE }}
								>
									<Subheading
										style={{ color: ColorPalette.WHITE }}
									>
										DELETE
									</Subheading>
								</Button>
							</View>
						</Card.Actions>
					</Card>
				</View>
			);
		}
	);
	if (prescriptions.status === Statuses.REJECTED && prescriptions.error) {
		child = <ErrorScreen message={prescriptions.error.message} />;
	}
	return (
		<SafeAreaView style={{ flex: 1, padding: 16 }}>
			<ScrollView
				contentContainerStyle={{
					flexGrow: 1,
					alignItems: 'stretch',
				}}
			>
				{child}
			</ScrollView>
			<FAB
				small
				icon='plus'
				accessibilityValue={{ text: 'Add Prescription' }}
				focusable={true}
				style={{
					backgroundColor: ColorPalette.PRIMARY_BLUE,
					padding: 8,
					position: 'absolute',
					bottom: 16,
					right: 16,
				}}
				color={ColorPalette.WHITE}
				onPress={() => {
					navigation.navigate(ModalRoutes.PRESCRIPTION);
				}}
			/>
		</SafeAreaView>
	);
};

export default Prescriptions;
