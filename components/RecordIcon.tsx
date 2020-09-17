import React, { useState } from 'react';
import { IconButton, Colors } from 'react-native-paper';
import { ButtonStatus } from '../constants/Misc';

enum RecordIcons {
	PLAY = 'play',
	STOP = 'stop',
}

enum RecordAccessibilityValues {
	PLAY = 'start recording',
	STOP = 'end recording',
}

interface RecordIconProps {
	status: ButtonStatus;
	onButtonToggle: () => void;
}

const RecordIcon = ({ status, onButtonToggle }: RecordIconProps) => {
	let icon = RecordIcons.PLAY;
	let accessibilityValue = RecordAccessibilityValues.PLAY;

	if (status === ButtonStatus.ACTIVE) {
		icon = RecordIcons.STOP;
		accessibilityValue = RecordAccessibilityValues.STOP;
	}
	return (
		<IconButton
			icon={icon}
			accessibilityValue={accessibilityValue}
			size={100}
			onPress={onButtonToggle}
		/>
	);
};

export default RecordIcon;
