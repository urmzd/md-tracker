import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { HelperText, Paragraph, TextInput } from 'react-native-paper';
import { ColorPalette } from '../constants/Misc';

interface TextInputWithHelperProps {
	label?: string;
	inputValue: string;
	setInputValue: (value: string) => void;
	keyboardType?: 'default' | 'numeric';
	errorText?: string;
	hasErrors?: () => boolean;
	[x: string]: any;
}
const TextInputWithHelper = ({
	label,
	inputValue,
	setInputValue,
	keyboardType,
	errorText,
	hasErrors,
	...additionalProps
}: TextInputWithHelperProps) => {
	return (
		<KeyboardAvoidingView
			style={{ paddingTop: 6, paddingBottom: 6 }}
			behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
		>
			<TextInput
				label={label && label}
				value={inputValue}
				accessibilityValue={{ text: `${label} input` }}
				onChangeText={(value: string) => setInputValue(value)}
				focusable={true}
				showSoftInputOnFocus={true}
				keyboardType={keyboardType || 'default'}
				style={{
					backgroundColor: ColorPalette.WHITE,
				}}
				error={hasErrors && hasErrors()}
				underlineColor={ColorPalette.PRIMARY_BLUE}
				{...additionalProps}
			/>
			{hasErrors && hasErrors() && (
				<HelperText type='error'>{errorText}</HelperText>
			)}
		</KeyboardAvoidingView>
	);
};

export default TextInputWithHelper;
