import React, { useState, useEffect } from 'react';
import {
	NavigationContainer,
	DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import {
	DarkTheme as PaperDarkTheme,
	Provider as PaperProvider,
	Provider,
} from 'react-native-paper';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { View, StyleSheet } from 'react-native';
import { LogTemplate, RootState } from './types';
import { ButtonStatus, RouteIcons, Routes } from './constants/Misc';
import { useSelector, Provider as ReduxProvider } from 'react-redux';
import RootReducer from './features';
import { configureStore } from '@reduxjs/toolkit';
import { completeLog, createLog, fetchLogs } from './features/Logs';
import { useAppDispatch } from './utils/Redux';
import moment from 'moment';
import { LoadingIcon, RecordIcon } from './components';
import { SymptomReportModal } from './containers/overlays';

export const Store = configureStore({
	reducer: RootReducer,
});

const Styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

const CombinedDarkTheme = {
	...PaperDarkTheme,
	...NavigationDarkTheme,
	colors: { ...PaperDarkTheme.colors, ...NavigationDarkTheme.colors },
};

const Tab = createMaterialBottomTabNavigator();

const HomeScreen = () => {
	const logs = useSelector((state: RootState) => state.logs);
	const container = [...logs.container];

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchLogs());
	}, []);

	let currentRecord: LogTemplate | undefined = {
		startDateTime: moment().toString(),
	};

	let status = ButtonStatus.INACTIVE;
	let child = <LoadingIcon />;

	if (container.length) {
		currentRecord = container.pop()!;

		if (currentRecord.startDateTime && !currentRecord.endDateTime) {
			status = ButtonStatus.ACTIVE;
		}
	}

	const onButtonToggle = () => {
		if (status === ButtonStatus.INACTIVE) {
			dispatch(createLog());
		} else {
			dispatch(completeLog({}));
		}
	};

	return (
		<Provider>
			<SymptomReportModal />
			<View style={Styles.container}>
				<RecordIcon status={status} onButtonToggle={onButtonToggle} />
			</View>
		</Provider>
	);
};

export default function App() {
	return (
		<ReduxProvider store={Store}>
			<PaperProvider theme={CombinedDarkTheme}>
				<NavigationContainer theme={CombinedDarkTheme}>
					<Tab.Navigator initialRouteName={Routes.HOME}>
						<Tab.Screen
							name={Routes.PRESCRIPTIONS}
							component={HomeScreen}
							options={{ tabBarIcon: RouteIcons.PRESCRIPTIONS }}
						/>
						<Tab.Screen
							name={Routes.HOME}
							component={HomeScreen}
							options={{ tabBarIcon: RouteIcons.HOME }}
						/>
						<Tab.Screen
							name={Routes.LOGS}
							component={HomeScreen}
							options={{ tabBarIcon: RouteIcons.LOGS }}
						/>
					</Tab.Navigator>
				</NavigationContainer>
			</PaperProvider>
		</ReduxProvider>
	);
}
