import React from 'react';

import { createStackNavigator} from '@react-navigation/stack';
import LoginScreen from "../screens/LoginScreen";

const Stack = createStackNavigator();

const AuthNavigation = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name={'LoginScreen'} options={{ headerShown: false }} component={LoginScreen}/>
		</Stack.Navigator>
	);
};

export default AuthNavigation;