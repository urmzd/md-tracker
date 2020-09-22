import React, { useEffect, useState } from 'react';
import { Animated, View } from 'react-native';
import { Caption, Checkbox, Subheading } from 'react-native-paper';
import { ButtonStatus, ColorPalette } from '../constants/Misc';
import SymptomSlider from './SymptomSlider';

const SymptomScale = ({ name, value, setValue }: any) => {
	const [toggleStatus, setToggleStatus] = useState<boolean>(false);
	const scaleOpacityAnim = new Animated.Value(0);

	useEffect(() => {
		Animated.timing(scaleOpacityAnim, {
			toValue: toggleStatus ? 1 : 0,
			duration: 400,
			useNativeDriver: true,
		}).start();
	}, [toggleStatus]);

	return (
		<View
			style={{
				flexGrow: 1,
				justifyContent: 'center',
				alignItems: 'stretch',
			}}
		>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					overflow: 'hidden',
				}}
			>
				<Subheading>{name}</Subheading>
				<Checkbox
					status={
						toggleStatus
							? ButtonStatus.ACTIVE
							: ButtonStatus.INACTIVE
					}
					onPress={() => setToggleStatus(!toggleStatus)}
					color={ColorPalette.PRIMARY_BLUE}
				/>
			</View>
			{toggleStatus && (
				<Animated.View
					style={{
						overflow: 'hidden',
						transformOrigin: 'top center',
						transform: [{ scaleY: scaleOpacityAnim }],
						opacity: scaleOpacityAnim,
						paddingBottom: 6,
					}}
				>
					<Caption>RATE INTENSITY</Caption>
					<SymptomSlider value={value} setValue={setValue} />
				</Animated.View>
			)}
		</View>
	);
};

export default SymptomScale;
