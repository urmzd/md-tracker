import React from 'react';
import { Appbar } from 'react-native-paper';

const HeaderBar = ({ title }: any) => {
	return (
		<Appbar.Header
			accessibilityValue={{ text: `${title} header` }}
			focusable={false}
		>
			<Appbar.Content
				title={title}
				accessibilityValue={{ text: `${title} title` }}
				focusable={false}
			/>
		</Appbar.Header>
	);
};

export default HeaderBar;
