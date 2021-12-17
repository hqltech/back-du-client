import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import i18n from './src/i18n/index';
import { Provider } from 'react-redux';
import configureStore, { persist } from './src/reducers/configureStore';
import { PersistGate } from 'redux-persist/integration/react';
import RootNavigation from "./src/navigations";
import {
	useFonts,
	Montserrat_100Thin,
	Montserrat_100Thin_Italic,
	Montserrat_200ExtraLight,
	Montserrat_200ExtraLight_Italic,
	Montserrat_300Light,
	Montserrat_300Light_Italic,
	Montserrat_400Regular,
	Montserrat_400Regular_Italic,
	Montserrat_500Medium,
	Montserrat_500Medium_Italic,
	Montserrat_600SemiBold,
	Montserrat_600SemiBold_Italic,
	Montserrat_700Bold,
	Montserrat_700Bold_Italic,
	Montserrat_800ExtraBold,
	Montserrat_800ExtraBold_Italic,
	Montserrat_900Black,
	Montserrat_900Black_Italic,
} from '@expo-google-fonts/montserrat';
import AppLoading from 'expo-app-loading';



export default function App() {

	let [fontsLoaded] = useFonts({
		Montserrat_100Thin,
		Montserrat_100Thin_Italic,
		Montserrat_200ExtraLight,
		Montserrat_200ExtraLight_Italic,
		Montserrat_300Light,
		Montserrat_300Light_Italic,
		Montserrat_400Regular,
		Montserrat_400Regular_Italic,
		Montserrat_500Medium,
		Montserrat_500Medium_Italic,
		Montserrat_600SemiBold,
		Montserrat_600SemiBold_Italic,
		Montserrat_700Bold,
		Montserrat_700Bold_Italic,
		Montserrat_800ExtraBold,
		Montserrat_800ExtraBold_Italic,
		Montserrat_900Black,
		Montserrat_900Black_Italic,
	});

	function onBeforeLift() {

	}

	if(!fontsLoaded) {
		return(
			<AppLoading/>
		)
	}
	return (
		<Provider store={configureStore()}>
			<PersistGate onBeforeLift={onBeforeLift} persistor={persist}>
				<View style={styles.container}>
					<RootNavigation/>
				</View>
			</PersistGate>
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
