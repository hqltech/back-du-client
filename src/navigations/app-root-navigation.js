import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { routers } from '../routes/routes';

const AppRoot = () => {
	const Stack = createStackNavigator();
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}>
			{Object.keys(routers).map((component, index) => (
				<Stack.Screen {...routers[component]} key={index.toString()} />
			))}
		</Stack.Navigator>
	);
};

export default AppRoot;