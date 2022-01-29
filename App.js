import React, {useEffect,useRef,useState} from 'react';
import {StyleSheet, View, Platform} from 'react-native';
import {Provider} from 'react-redux';
import configureStore, {persist} from './src/reducers/configureStore';
import {PersistGate} from 'redux-persist/integration/react';
import RootNavigation from "./src/navigations";
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import FlashMessage from "react-native-flash-message";
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Warning: Async Storage has been extracted from react-native core']);
import {
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
	useFonts,
} from '@expo-google-fonts/montserrat';
import AppLoading from 'expo-app-loading';
Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: false,
	}),
});
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

	const [expoPushToken, setExpoPushToken] = useState('');
	const [notification, setNotification] = useState(false);
	const notificationListener = useRef();
	const responseListener = useRef();

	function onBeforeLift() {

	}

	useEffect(()=>{
		if(Platform.OS !== 'web') {
			registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

			// This listener is fired whenever a notification is received while the app is foregrounded
			notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
				setNotification(notification);
			});

			// This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
			responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
				console.log(response);
			});

			return () => {
				Notifications.removeNotificationSubscription(notificationListener.current);
				Notifications.removeNotificationSubscription(responseListener.current);
			};
		}
	},[])

	async function registerForPushNotificationsAsync() {
		let token;
		if (Constants.isDevice) {
			const { status: existingStatus } = await Notifications.getPermissionsAsync();
			let finalStatus = existingStatus;
			if (existingStatus !== 'granted') {
				const { status } = await Notifications.requestPermissionsAsync();
				finalStatus = status;
			}
			if (finalStatus !== 'granted') {
				alert('Failed to get push token for push notification!');
				return;
			}
			token = (await Notifications.getExpoPushTokenAsync()).data;
			console.log(token);
		} else {
			alert('Must use physical device for Push Notifications');
		}

		if (Platform.OS === 'android') {
			await Notifications.setNotificationChannelAsync('default', {
				name: 'default',
				importance: Notifications.AndroidImportance.MAX,
				vibrationPattern: [0, 250, 250, 250],
				lightColor: '#FF231F7C',
			});
		}

		return token;
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
					<FlashMessage position={'top'} />
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
