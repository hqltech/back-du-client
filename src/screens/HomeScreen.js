import React, {useRef} from 'react';
import {
	View,
	SafeAreaView,
	StyleSheet,
	TouchableOpacity,
	TextInput,
	ImageBackground, StatusBar,
	ScrollView, TouchableOpacityComponent,
	Image, Platform
} from "react-native";
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import Text from "../components/Text";
import images from "../assets/images";
import ButtonGame from "../components/ButtonGame";
import i18n from "i18n-js";
import TouchAbleBanner from "../components/TouchAbleBanner";
import {scaleHeight, scaleSize} from "../utils/scale";

const HomeScreen = ({navigation}) => {

	const navigateToDice = () => {
		navigation.navigate('DiceGameScreen')
	}

	const bannerSlider = [
		{
			id: 1,
			path: images.banner_home_1
		},
		{
			id: 2,
			path: images.banner_home_2
		},
		{
			id: 3,
			path: images.banner_home_3
		},
	]



	return (
		<View style={styles.container}>
			<ImageBackground source={images.featured_game_bg} style={styles.style_background}  resizeMode={'cover'}>
				<View style={styles.style_header_bar}>

				</View>
				<View style={styles.view_main}>
					<Animated.ScrollView pagingEnabled style={styles.style_slider_banner} horizontal showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
						{bannerSlider.map((item)=>(
							<TouchAbleBanner key={item.id} source={item.path}/>
						))}
					</Animated.ScrollView>
					<ScrollView horizontal showsHorizontalScrollIndicator={false}>
						<View style={{alignSelf: 'center'}}>
							<ButtonGame onPress={navigateToDice} key={'1'} source={images.dice_game}/>
							<ButtonGame onPress={()=>{navigation.navigate('LotteryGameScreen')}} key={'2'} source={images.poker_game}/>
						</View>
						<ButtonGame key={'1'} source={images.machine_game}/>
					</ScrollView>
				</View>
				<View style={styles.style_view_footer}>

				</View>

			</ImageBackground>
			<StatusBar translucent backgroundColor="transparent" hidden/>
		</View>
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
		flex: 1,
		// backgroundColor:'rgba(0,0,0,0.4)',
		flexDirection: 'row',
	},
	view_main: {
		// alignSelf: 'center',
		// flex: 1,
		flexDirection: 'row',
		paddingHorizontal: Platform.OS === 'ios'? 40 : 0
	},
	style_header_bar: {

	},
	style_slider_banner: {
		width: scaleSize(310),
		height: scaleHeight(480),
		alignSelf: 'center'
	},
	style_view_footer: {
		// alignSelf: 'flex-end'
	}
})

export default HomeScreen;