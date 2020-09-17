import React from 'react';
import { ActivityIndicator, Colors } from 'react-native-paper';
import { Text, View } from 'react-native';

const LoadingText = 'Just wait a moment...';

const LoadingIcon = () => {
	return (
		<View>
			<ActivityIndicator
				color={Colors.red500}
				animating={true}
				accessibilityValue={LoadingText}
				focusable={false}
			/>
			<Text>{LoadingText}</Text>
		</View>
	);
};

export default LoadingIcon;
