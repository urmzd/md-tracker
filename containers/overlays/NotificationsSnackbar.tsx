import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';

interface NotificationsModalProps {
	visibility: boolean;
	message: string;
}
const NotificationsModal = ({
	visibility,
	message,
}: NotificationsModalProps) => {
	return (
		<Snackbar
			visible={visibility}
			onDismiss={() => null}
			duration={2500}
			accessibilityValue={`Notification: ${message}`}
			focusable={false}
		>
			{message}
		</Snackbar>
	);
};

export default NotificationsModal;
