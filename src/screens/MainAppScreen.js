import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from "./HomeScreen";
import SettingScreen from "./SettingScreen";

const Tab = createBottomTabNavigator();
const MainAppScreen = () => {
	return (
		<Tab.Navigator screenOptions={{headerShown: false}}>
			<Tab.Screen name="Home" component={HomeScreen}/>
			<Tab.Screen name="Setting" component={SettingScreen}/>
		</Tab.Navigator>
	);
};

export default MainAppScreen;