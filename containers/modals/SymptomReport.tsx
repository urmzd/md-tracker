import React, { useState } from 'react';
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Caption, Divider, Headline, Title } from 'react-native-paper';
import { SymptomScale, TextInputWithHelper } from '../../components';
import {
	ColorPalette,
	MainRoutes,
	ModalRoutes,
	RouteIcons,
} from '../../constants/Misc';
import { completeLog } from '../../features/Logs';
import { SymptomScale as TSymptomScale } from '../../types';
import { useAppDispatch } from '../../utils/Redux';

const Styles = StyleSheet.create({
	title: {
		textAlign: 'center',
		paddingBottom: 6,
	},
	container: {
		flex: 1,
		justifyContent: 'space-between',
		backgroundColor: ColorPalette.WHITE,
		padding: 12,
	},
	notes: {
		backgroundColor: ColorPalette.WHITE,
	},
	saveButton: {
		borderRadius: 100,
	},
	saveButtonContainer: {
		paddingTop: 12,
	},
	slider: {
		flexGrow: 1,
		justifyContent: 'center',
	},
});

const Symptoms = [
	'Headache',
	'Numbness',
	'Vision Loss',
	'Confusion',
	'Nausea / Vomiting',
	'Dizziness',
	'Unsteadiness',
];
const SymptomReport = ({ navigation }: any) => {
	const [notes, setNotes] = useState<string>('');
	const [headache, setHeadache] = useState<TSymptomScale>(0);
	const [numbness, setNumbness] = useState<TSymptomScale>(0);
	const [visionLoss, setVisionLoss] = useState<TSymptomScale>(0);
	const [confusion, setConfusion] = useState<TSymptomScale>(0);
	const [nausea, setNausea] = useState<TSymptomScale>(0);
	const [dizziness, setDizziness] = useState<TSymptomScale>(0);
	const [unsteadiness, setUnsteadiness] = useState<TSymptomScale>(0);

	const symptomObjects = [
		{
			name: 'Headache',
			value: headache,
			setValue: setHeadache,
		},
		{
			name: 'Numbness',
			value: numbness,
			setValue: setNumbness,
		},
		{
			name: 'Vision Loss',
			value: visionLoss,
			setValue: setVisionLoss,
		},
		{
			name: 'Confusion',
			value: confusion,
			setValue: setConfusion,
		},
		{
			name: 'Nausea / Vomiting',
			value: nausea,
			setValue: setNausea,
		},
		{
			name: 'Dizziness',
			value: dizziness,
			setValue: setDizziness,
		},
		{
			name: 'Unsteadiness',
			value: unsteadiness,
			setValue: setUnsteadiness,
		},
	];

	const saveReport = () => {
		navigation.navigate(ModalRoutes.LOADING, {
			action: completeLog,
			payload: {
				headacheRating: headache,
				numbnessRating: numbness,
				visionLossRating: visionLoss,
				confusionRating: confusion,
				nauseaRating: nausea,
				dizzinessRating: dizziness,
				unsteadinessRating: unsteadiness,
				notes,
			},
			stateSlice: MainRoutes.HOME.toLowerCase(),
		});
	};

	return (
		<SafeAreaView style={Styles.container}>
			<View>
				<Headline style={Styles.title}>SYMPTOMS REPORT</Headline>
			</View>
			<Divider
				accessibilityValue={{ text: 'Screen Divider' }}
				focusable={false}
			/>
			<Caption>SELECT SYMPTOMS YOU EXPERIENCED</Caption>
			<ScrollView
				style={{ flex: 1 }}
				contentContainerStyle={{
					justifyContent: 'space-between',
					flexGrow: 1,
				}}
				horizontal={false}
			>
				{symptomObjects.map((symptom: any) => {
					return <SymptomScale key={symptom.name} {...symptom} />;
				})}
			</ScrollView>
			<Divider
				accessibilityValue={{ text: 'Screen Divider' }}
				focusable={false}
			/>
			<KeyboardAvoidingView
				style={{ justifyContent: 'space-between' }}
				behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
			>
				<Caption>WRITE DOWN ADDITIONAL INFORMATION</Caption>
				<TextInputWithHelper
					inputValue={notes}
					multiline={true}
					numberOfLines={12}
					setInputValue={setNotes}
					placeholder={'Add a note here...'}
				/>

				<View style={Styles.saveButtonContainer}>
					<Button
						mode='contained'
						accessibilityValue={{ text: 'Save Log Button' }}
						focusable={true}
						style={Styles.saveButton}
						color={ColorPalette.PRIMARY_BLUE}
						uppercase={true}
						onPress={() => saveReport()}
					>
						<Title style={{ color: ColorPalette.WHITE }}>
							SAVE
						</Title>
					</Button>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default SymptomReport;
