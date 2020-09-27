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

	useEffect(() => {
		if (status === Statuses.PENDING) {
			dispatch(action(payload));
		} else {
			navigation.navigate(location);
		}
	}, [status]);

	return (
		<View
			style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
		>
			{status === Statuses.PENDING ? (
				<ActivityIndicator
					color={ColorPalette.PRIMARY_BLUE}
					animating={true}
					accessibilityValue={{ text: 'Loading' }}
					focusable={false}
					style={{ paddingBottom: 12 }}
					size='large'
				/>
			) : (
				<IconButton
					color={ColorPalette.PRIMARY_GREEN}
					animated={true}
					icon='check'
					style={{
						padding: 12,
					}}
					size={50}
					accessibilityValue={{ text: 'Loading Complete' }}
				/>
			)}

			<Paragraph>
				{status === Statuses.PENDING
					? 'Just a moment...'
					: 'Save Completed'}
			</Paragraph>
		</View>
	);
};

export default Loading;
