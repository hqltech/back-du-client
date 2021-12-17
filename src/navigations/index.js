import React, { useEffect } from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigation from './auth-navigation';
import AppRoot from "./app-root-navigation";

const navigationRef = React.createRef();

export const navigate = (name, params = {}) => {
    navigationRef.current?.navigate(name, params);
};

export function pop(index) {
    const action = StackActions.pop(index?index:1)
    navigationRef && navigationRef.current?.dispatch(action)
}

export function popToTop() {
    const action = StackActions.popToTop()
    navigationRef && navigationRef.current?.dispatch(action)
}

export const replace = (name, params = {}) => {
    const action = StackActions.replace(name, params)
    navigationRef && navigationRef.current?.dispatch(action)
}

const RootNavigation = () => {
    const Stack = createStackNavigator();
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator>
                <Stack.Screen name={'AuthNavigation'} component={AuthNavigation} options={{ headerShown: false }} />
                <Stack.Screen name={'AppRoot'} component={AppRoot} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default RootNavigation;