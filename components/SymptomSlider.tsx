import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Slider } from 'react-native-elements';
import { Paragraph, Surface } from 'react-native-paper';
import { ColorPalette } from '../constants/Misc';
enum Dimensions {
	TRACK_HEIGHT = 10,
	THUMB_WIDTH = 25,
	THUMB_HEIGHT = 25,
}

const Styles = StyleSheet.create({
	circle: {
		backgroundColor: ColorPalette.WHITE,
		elevation: 6,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: Dimensions.THUMB_HEIGHT / 2,
		height: Dimensions.THUMB_HEIGHT,
		width: Dimensions.THUMB_WIDTH,
	},
	track: {
		height: Dimensions.TRACK_HEIGHT,
		borderRadius: Dimensions.TRACK_HEIGHT / 2,
	},
	thumb: {
		height: Dimensions.THUMB_HEIGHT,
		width: Dimensions.THUMB_WIDTH,
		borderRadius: Dimensions.THUMB_HEIGHT / 2,
	},
});
const CircleWithValue = ({ value }: { value: number }) => {
	return (
		<Surface
			accessibilityValue={{ text: `Circle with value of ${value}` }}
			style={Styles.circle}
			focusable={false}
		>
			<Paragraph
				style={{
					color: ColorPalette.PRIMARY_BLUE,
					fontWeight: '600',
				}}
			>
				{value}
			</Paragraph>
		</Surface>
	);
};
const SymptomSlider = ({ value, setValue }: any) => {
	return (
		<View>
			<Slider
				value={value}
				onValueChange={(newValue: number) => setValue(newValue)}
				maximumValue={10}
				minimumValue={0}
				minimumTrackTintColor={ColorPalette.PRIMARY_BLUE}
				maximumTrackTintColor={ColorPalette.PRIMARY_GREY}
				step={1}
				thumbProps={{
					children: <CircleWithValue value={value} />,
				}}
				thumbTintColor={ColorPalette.WHITE}
				trackStyle={Styles.track}
				thumbStyle={Styles.thumb}
			/>
		</View>
	);
};

export default SymptomSlider;
