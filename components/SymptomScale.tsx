import React, { useEffect, useState } from 'react';
import { Animated, View, Switch } from 'react-native';
import { Caption, Subheading } from 'react-native-paper';
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
				}}
			>
				<Subheading>{name}</Subheading>
				<Switch
					trackColor={{
						false: ColorPalette.SECONDARY_GREY,
						true: ColorPalette.PRIMARY_BLUE,
					}}
					thumbColor={
						toggleStatus
							? ColorPalette.SECONDARY_BLUE
							: ColorPalette.WHITE
					}
					onValueChange={setToggleStatus}
					value={toggleStatus}
					ios_backgroundColor={ColorPalette.PRIMARY_BLUE}
				/>
			</View>
			{toggleStatus && (
				<Animated.View
					style={{
						transform: [
							{
								scaleY: scaleOpacityAnim,
							},
						],
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
