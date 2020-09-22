import React from 'react';
import { Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { ColorPalette } from '../constants/Misc';

const EmptyScreen = ({ message }: any) => {
	return (
		<View
			style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
		>
			<IconButton
				color={ColorPalette.PRIMARY_RED}
				icon='alert-circle'
				style={{
					padding: 12,
				}}
				size={50}
				accessibilityValue={{ text: 'Loading Complete' }}
			/>
			<Text style={{ textAlign: 'center', padding: 12 }}>{message}</Text>
		</View>
	);
};

export default EmptyScreen;
