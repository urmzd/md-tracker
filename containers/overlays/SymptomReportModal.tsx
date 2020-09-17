import React, { useState } from 'react';
import { Modal, Portal, Title, Colors } from 'react-native-paper';
import { Slider } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
	title: {
		color: Colors.white,
		textAlign: 'center',
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	trackStyle: {
		height: 50,
		backgroundImage: 'linear-gradient(to right, #eeec00, #d92000)',
	},
});
const SymptomReportModal = ({}: any) => {
	const [visibility, setVisibility] = useState<boolean>(true);

	const sliderData = [{ label: 'Headache' }];
	return (
		<Portal>
			<Modal
				visible={visibility}
				onDismiss={() => null}
				contentContainerStyle={Styles.container}
			>
				<Title style={{ color: Colors.white }}>
					Describe Your Symptoms
				</Title>
				<Slider
					maximumValue={10}
					style={{ height: 40, width: 220 }}
					step={1}
					trackStyle={Styles.trackStyle}
					thumbTouchSize={{ width: 50, height: 50 }}
					thumbTintColor={Colors.white}
				/>
			</Modal>
		</Portal>
	);
};

export default SymptomReportModal;
