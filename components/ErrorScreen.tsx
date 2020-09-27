import React from 'react';
import { View } from 'react-native';
import { IconButton, Paragraph } from 'react-native-paper';
import { ColorPalette } from '../constants/Misc';

const EmptyScreen = ({ message }: { message: string }) => {
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
				accessibilityValue={{ text: 'Error Icon' }}
			/>
			<Paragraph style={{ textAlign: 'center', padding: 12 }}>
				{message}
			</Paragraph>
		</View>
	);
};

export default EmptyScreen;
