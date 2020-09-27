import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Animated, View } from 'react-native';
import { ActivityIndicator, IconButton, Paragraph } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { ColorPalette } from '../../constants/Misc';
import { Statuses } from '../../constants/Redux';
import { RootState } from '../../types';
import { useAppDispatch } from '../../utils/Redux';

const Loading = ({ navigation, route }: any) => {
	const { route: location } = useSelector(
		(state: RootState) => state.loadingModal
	);
	const { stateSlice, action, payload } = route.params;

	const dispatch = useAppDispatch();

	const status = useSelector(
		(state: RootState) => state[stateSlice as keyof RootState]?.status
	);
	const state = useSelector(
		(state: RootState) => state[stateSlice as keyof RootState]
	);
	const [errorCount, setErrorCount] = useState(0);
	const error = state && 'error' in state ? state.error : undefined;

	const navDelay = new Animated.Value(0);
	useEffect(() => {
		Animated.timing(navDelay, {
			toValue: 500,
			duration: 500,
			useNativeDriver: true,
		}).start(() => dispatch(action(payload)));
	}, []);
	console.log('status', status, state, stateSlice);

	useEffect(() => {
		if (status === Statuses.REJECTED) {
			if (errorCount < 1) {
				error?.data && dispatch(action(error.data));
				setErrorCount(errorCount + 1);
			} else {
				navigation.navigate(location);
			}
		}

		if (status === Statuses.FULFILLED) {
			navigation.navigate(location);
		}
	}, [status]);

	let child = (
		<ActivityIndicator
			color={ColorPalette.PRIMARY_BLUE}
			animating={true}
			accessibilityValue={{ text: 'Loading' }}
			focusable={false}
			style={{ paddingBottom: 12 }}
			size='large'
		/>
	);
	let color = ColorPalette.PRIMARY_GREEN;
	let icon = 'check';
	let message = 'Action Completed!';

	if (
		status === Statuses.FULFILLED ||
		(status === Statuses.REJECTED && errorCount < 1)
	) {
		if (status === Statuses.REJECTED) {
			color = ColorPalette.PRIMARY_RED;
			icon = 'alert-circle';
			message =
				"Oops looks like an error occurred... We'll try to fix it!";
		}
		child = (
			<IconButton
				color={color}
				animated={true}
				icon={icon}
				style={{
					padding: 12,
				}}
				size={50}
				accessibilityValue={{ text: 'Loading Complete' }}
			/>
		);
	}

	return (
		<View
			style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
		>
			{child}

			<Paragraph>
				{status === Statuses.PENDING ? 'Please Wait...' : message}
			</Paragraph>
		</View>
	);
};

export default Loading;
