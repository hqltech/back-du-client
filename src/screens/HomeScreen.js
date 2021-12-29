import React, {useRef} from 'react';
import {
	View,
	SafeAreaView,
	StyleSheet,
	TouchableOpacity,
	TextInput,
	ImageBackground, StatusBar,
	ScrollView,
} from "react-native";
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import Text from "../components/Text";
import images from "../assets/images";
import ButtonGame from "../components/ButtonGame";
import i18n from "i18n-js";

const HomeScreen = ({navigation}) => {

	const navigateToDice = () => {
		navigation.navigate('DiceGameScreen')
	}

	return (
		<SafeAreaView style={styles.container}>
			<ImageBackground source={images.featured_game_bg} style={styles.style_background} resizeMode={'cover'}>
				<ScrollView style={styles.view_main} horizontal showsHorizontalScrollIndicator={false}>
					<ButtonGame onPress={navigateToDice} key={'1'} source={images.dice_game}/>
					<ButtonGame key={'2'} source={images.poker_game}/>
					<ButtonGame key={'3'} source={images.machine_game}/>
				</ScrollView>
			</ImageBackground>
			<StatusBar translucent backgroundColor="transparent" hidden/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',

	},
	style_background: {
		width: '100%',
		height: '100%',
		// backgroundColor:'rgba(0,0,0,0.4)',
		flexDirection: 'row',
	},
	view_main: {
		// alignSelf: 'center',
		flexDirection: 'row',
	}
})

export default HomeScreen;