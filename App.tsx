import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import { StyleSheet } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { Provider as ReduxProvider } from 'react-redux';
import {
	ColorPalette,
	MainRoutes,
	ModalRoutes,
	RouteIcons,
} from './constants/Misc';
import { LoadingModal, SymptomReportModal } from './containers/overlays';
import { HomeScreen } from './containers/views';
import RootReducer from './features';

export const Store = configureStore({
	reducer: RootReducer,
});

const Styles = StyleSheet.create({
	bottomNavigator: {
		backgroundColor: ColorPalette.PRIMARY_GREY,
	},
});

const MainStack = createMaterialBottomTabNavigator();
const RootStack = createStackNavigator();

const MainStackScreen = () => {
	return (
		<MainStack.Navigator
			initialRouteName={MainRoutes.HOME}
			barStyle={Styles.bottomNavigator}
			activeColor={ColorPalette.PRIMARY_BLUE}
		>
			<MainStack.Screen
				name={MainRoutes.PRESCRIPTIONS}
				component={HomeScreen}
				options={{
					tabBarIcon: RouteIcons.PRESCRIPTIONS,
					tabBarAccessibilityLabel: MainRoutes.PRESCRIPTIONS,
				}}
			/>
			<MainStack.Screen
				name={MainRoutes.HOME}
				component={HomeScreen}
				options={{
					tabBarIcon: RouteIcons.HOME,
					tabBarAccessibilityLabel: MainRoutes.HOME,
				}}
			/>
			<MainStack.Screen
				name={MainRoutes.LOGS}
				component={HomeScreen}
				options={{
					tabBarIcon: RouteIcons.LOGS,
					tabBarAccessibilityLabel: MainRoutes.LOGS,
				}}
			/>
		</MainStack.Navigator>
	);
};

const App = () => {
	return (
		<ReduxProvider store={Store}>
			<NavigationContainer>
				<RootStack.Navigator
					mode='modal'
					headerMode='none'
					screenOptions={{ animationEnabled: true }}
				>
					<RootStack.Screen
						name={MainRoutes.CONTAINER}
						component={MainStackScreen}
					/>
					<RootStack.Screen
						name={ModalRoutes.REPORT}
						component={SymptomReportModal}
					/>
					<RootStack.Screen
						name={ModalRoutes.LOADING}
						component={LoadingModal}
					/>
				</RootStack.Navigator>
			</NavigationContainer>
		</ReduxProvider>
	);
};

export default App;
