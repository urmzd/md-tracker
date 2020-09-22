import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
	Button,
	Caption,
	Divider,
	Headline,
	TextInput,
} from 'react-native-paper';
import { SymptomScale } from '../../components';
import { ColorPalette, ModalRoutes, RouteIcons } from '../../constants/Misc';
import { completeLog } from '../../features/Logs';
import { startLoadingScreen } from '../../features/LoadingModal';
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
const SymptomReportModal = ({ navigation }: any) => {
	const [notes, setNotes] = useState<string>('');
	const [headache, setHeadache] = useState<TSymptomScale>(0);
	const [numbness, setNumbness] = useState<TSymptomScale>(0);
	const [visionLoss, setVisionLoss] = useState<TSymptomScale>(0);
	const [confusion, setConfusion] = useState<TSymptomScale>(0);
	const [nausea, setNausea] = useState<TSymptomScale>(0);
	const [dizziness, setDizziness] = useState<TSymptomScale>(0);
	const [unsteadiness, setUnsteadiness] = useState<TSymptomScale>(0);

	const symptomValues = [
		headache,
		numbness,
		visionLoss,
		confusion,
		nausea,
		dizziness,
		unsteadiness,
	];
	const symptomFunctions = [
		setHeadache,
		setNumbness,
		setVisionLoss,
		setConfusion,
		setNausea,
		setDizziness,
		setUnsteadiness,
	];

	const dispatch = useAppDispatch();

	const saveReport = () => {
		dispatch(
			completeLog({
				headacheRating: headache,
				numbnessRating: numbness,
				visionLossRating: visionLoss,
				confusionRating: confusion,
				nauseaRating: nausea,
				dizzinessRating: dizziness,
				unsteadinessRating: unsteadiness,
				notes,
			})
		);
		dispatch(startLoadingScreen('Currently Saving...'));
		navigation.navigate(ModalRoutes.LOADING);
	};

	return (
		<View style={Styles.container}>
			<View>
				<Headline style={Styles.title}>Symptoms Report</Headline>
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
			>
				{Symptoms.map((symptom: string, index: number) => {
					return (
						<SymptomScale
							key={symptom}
							name={symptom}
							value={symptomValues[index]}
							setValue={symptomFunctions[index]}
						/>
					);
				})}
			</ScrollView>
			<Divider
				accessibilityValue={{ text: 'Screen Divider' }}
				focusable={false}
			/>
			<View style={{ justifyContent: 'space-between' }}>
				<Caption>WRITE DOWN ADDITIONAL INFORMATION</Caption>
				<TextInput
					value={notes}
					mode='outlined'
					multiline={true}
					numberOfLines={12}
					accessibilityValue={{ text: 'Notes Input Box' }}
					dense={false}
					showSoftInputOnFocus={true}
					focusable={true}
					onChangeText={(notes: string) => setNotes(notes)}
					placeholder={'Add a note here...'}
					style={Styles.notes}
				/>
				<View style={Styles.saveButtonContainer}>
					<Button
						icon='content-save'
						mode='outlined'
						accessibilityValue={{ text: 'Save Log Button' }}
						focusable={true}
						style={Styles.saveButton}
						uppercase={true}
						onPress={() => {
							saveReport();
						}}
					>
						Save Report
					</Button>
				</View>
			</View>
		</View>
	);
};

export default SymptomReportModal;
