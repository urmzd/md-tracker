import moment from 'moment';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import {
	Headline,
	Divider,
	TextInput,
	Caption,
	Paragraph,
	IconButton,
	Button,
	Title,
	Avatar,
	Card,
	Portal,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextInputWithHelper from '../../components/TextInputWithHelper';
import { ColorPalette, MainRoutes, ModalRoutes } from '../../constants/Misc';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useAppDispatch } from '../../utils/Redux';
import { addPrescription } from '../../features/Prescriptions';
import { RootState } from '../../types';
import { useSelector } from 'react-redux';

const Prescription = ({ navigation, route }: any) => {
	const prescriptions = useSelector(
		(state: RootState) => state.prescriptions
	);
	let index = -1;
	if (route.params) {
		index = route.params.index;
	}
	const currentPrescription =
		index === -1
			? {
					name: '',
					dosage: 0,
					dosageUnit: '',
					times: [],
					dates: [],
			  }
			: prescriptions.container[index];

	const [name, setName] = useState<string>(currentPrescription.name || '');
	const [dosage, setDosage] = useState<number>(
		currentPrescription.dosage || 0
	);
	const [dosageUnit, setDosageUnit] = useState<string>(
		currentPrescription.dosageUnit || ''
	);
	const [selectedIndexes, setSelectedIndexes] = useState<Array<number>>(
		currentPrescription.dates.length ? currentPrescription.dates : []
	);
	const days = [0, 1, 2, 3, 4, 5, 6].map((day: number) =>
		moment(day, 'd').format('ddd')
	);

	const [times, setTimes] = useState<Array<string>>(
		currentPrescription.times.length ? currentPrescription.times : []
	);

	const [showTimePicker, setShowTimePicker] = useState<boolean>(false);

	const toggleDay = (dayIndex: any) => {
		const days = [...selectedIndexes];
		if (selectedIndexes.includes(dayIndex)) {
			days.splice(selectedIndexes.indexOf(dayIndex), 1);
		} else {
			days.push(dayIndex);
		}
		setSelectedIndexes(days);
	};

	const savePrescription = () => {
		navigation.navigate(ModalRoutes.LOADING, {
			action: addPrescription,
			payload: {
				name,
				dosage,
				dosageUnit,
				dates: selectedIndexes,
				times,
			},
			stateSlice: MainRoutes.PRESCRIPTIONS.toLowerCase(),
		});
	};

	const inputObjects: any = [
		{
			label: 'Prescription Name',
			inputValue: name,
			setInputValue: setName,
		},
		{
			label: 'Dosage',
			inputValue: dosage,
			setInputValue: (value: string) => setDosage(+value),
			keyboardType: 'numeric',
		},
		{
			label: 'Dosage Unit',
			inputValue: dosageUnit,
			setInputValue: setDosageUnit,
		},
	];

	return (
		<SafeAreaView style={{ padding: 12, flex: 1 }}>
			<View
				style={{
					width: 400,
				}}
			>
				<DateTimePickerModal
					isVisible={showTimePicker}
					mode='time'
					onConfirm={(date: Date) => {
						const formattedDate = moment(date).format('hh:mm A');
						setTimes([...times, formattedDate]);
						setShowTimePicker(false);
					}}
					onCancel={() => {
						setShowTimePicker(false);
					}}
					display='default'
				/>
			</View>

			<View style={{ alignItems: 'center', paddingBottom: 6 }}>
				<Headline>PRESCRIPTION ALARM EDITOR</Headline>
			</View>
			<Divider
				accessibilityValue={{ text: 'Title divider' }}
				focusable={false}
			/>

			<View>
				<Caption>PRESCRIPTION INFORMATION</Caption>
				{inputObjects.map((inputObject: any) => {
					const {
						label,
						inputValue,
						setInputValue,
						errorText,
						keyboardType,
						hasErrors,
					} = inputObject;
					return (
						<TextInputWithHelper
							key={label}
							label={label}
							inputValue={`${inputValue}`}
							setInputValue={setInputValue}
							errorText={errorText}
							keyboardType={keyboardType}
							hasErrors={hasErrors}
						/>
					);
				})}
			</View>
			<Divider
				accessibilityValue={{
					text: 'Prescription information divider',
				}}
				focusable={false}
			/>
			<View>
				<Caption>SELECT THE DAYS WHEN YOU WANT TO BE REMINDED</Caption>
				<ButtonGroup
					selectedIndexes={selectedIndexes}
					buttons={days}
					underlayColor={ColorPalette.PRIMARY_BLUE}
					onPress={(indexes: any) => {
						toggleDay(indexes);
					}}
				/>
			</View>
			<Divider
				accessibilityValue={{
					text: 'Date divider',
				}}
				focusable={false}
			/>
			<Caption>SELECT THE TIMES WHEN YOU WANT TO BE REMINDED</Caption>

			<View style={{ flex: 1 }}>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<View style={{ padding: 12, flex: 1 }}>
						<Button
							mode='contained'
							accessibilityValue={{ text: 'Select Time Button' }}
							focusable={true}
							color={ColorPalette.PRIMARY_BLUE}
							onPress={() => setShowTimePicker(true)}
							style={{ borderRadius: 100 }}
						>
							<Paragraph style={{ color: ColorPalette.WHITE }}>
								Select Time
							</Paragraph>
						</Button>
					</View>
				</View>
				<Caption>TIMES SAVED</Caption>
				<Divider
					accessibilityValue={{
						text: 'Date divider',
					}}
					focusable={false}
				/>
				<ScrollView
					contentContainerStyle={{
						flexGrow: 1,
					}}
					style={{ flex: 2 }}
					horizontal={false}
				>
					{times.map((time: string, index: number) => {
						return (
							<View
								style={{
									flex: 1,
									paddingTop: 6,
									paddingBottom: 6,
								}}
								key={index}
							>
								<Card
									accessibilityValue={{
										text: `${time} container`,
									}}
									focusable={true}
								>
									<Card.Title
										title={`${time}`}
										left={(props: any) => (
											<Avatar.Icon
												{...props}
												icon='timer'
												color={ColorPalette.WHITE}
												style={{
													backgroundColor:
														ColorPalette.PRIMARY_BLUE,
												}}
											/>
										)}
										accessibilityValue={{
											text: `${time} card`,
										}}
										focusable={true}
									/>
								</Card>
							</View>
						);
					})}
				</ScrollView>
			</View>
			<View style={{ flexDirection: 'row' }}>
				<View style={{ flex: 1, padding: 12 }}>
					<Button
						mode='contained'
						focusable={true}
						accessibilityValue={{
							text: 'Close ',
						}}
						color={ColorPalette.PRIMARY_RED}
						style={{ borderRadius: 100 }}
						onPress={() => navigation.goBack()}
					>
						<Title style={{ color: ColorPalette.WHITE }}>
							CLOSE
						</Title>
					</Button>
				</View>
				<View style={{ flex: 1, padding: 12 }}>
					<Button
						mode='contained'
						focusable={true}
						accessibilityValue={{
							text: 'Create/Edit Prescription Alarm',
						}}
						color={ColorPalette.PRIMARY_BLUE}
						style={{ borderRadius: 100 }}
						onPress={() => savePrescription()}
					>
						<Title style={{ color: ColorPalette.WHITE }}>
							SAVE
						</Title>
					</Button>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default Prescription;
