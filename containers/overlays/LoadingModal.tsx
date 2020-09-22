import React, { useEffect, useState } from 'react';
import { Animated, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { ActivityIndicator, IconButton } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { ColorPalette } from '../../constants/Misc';
import { clearLoadingScreen } from '../../features/LoadingModal';
import { RootState } from '../../types';
import { useAppDispatch } from '../../utils/Redux';

const LoadingModal = ({ navigation }: any) => {
	const { message, visibility, route } = useSelector(
		(state: RootState) => state.loadingModal
	);
	const [loading, setLoading] = useState<boolean>(true);
	const dispatch = useAppDispatch();
	const time = new Animated.Value(0);
	const timeSeen = new Animated.Value(0);

	useEffect(() => {
		Animated.timing(time, {
			toValue: 1250,
			duration: 1250,
			useNativeDriver: true,
		}).start(() => {
			dispatch(clearLoadingScreen('SAVE COMPLETE!'));
			setLoading(false);
		});
	});

	useEffect(() => {
		if (loading === false) {
			Animated.timing(timeSeen, {
				toValue: 500,
				duration: 500,
				useNativeDriver: true,
			}).start(() => {
				navigation.navigate(route);
			});
		}
	}, [loading]);

	return (
		<View
			style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
		>
			{visibility ? (
				<ActivityIndicator
					color={ColorPalette.PRIMARY_BLUE}
					animating={true}
					accessibilityValue={{ text: message }}
					focusable={false}
					style={{ paddingBottom: 12 }}
					size='large'
				/>
			) : (
				<IconButton
					color={ColorPalette.PRIMARY_GREEN}
					icon='check'
					style={{
						padding: 12,
					}}
					size={50}
					accessibilityValue={{ text: 'Loading Complete' }}
				/>
			)}

			<Text>{message}</Text>
		</View>
	);
};

export default LoadingModal;
