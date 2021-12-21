import React, {useRef} from 'react';
import {View, StyleSheet, TouchableOpacity, TextInput} from "react-native";
import Text from "../components/Text";
import {STATUSBAR_HEIGHT} from "./LoginScreen";

const HomeScreen = ({navigation}) => {

	const username = useRef('')

	return (
		<View style={styles.container}>
			<Text>{'HOME_SCREEN'}</Text>
			<TextInput placeholder={'Enter name chat'} onChangeText={(value)=>username.current = value}/>
			<TouchableOpacity onPress={()=>navigation.navigate('ChatScreen', {name: username})}>
				<Text>{'GO TO CHAT'}</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		marginTop: STATUSBAR_HEIGHT
	}
})

export default HomeScreen;