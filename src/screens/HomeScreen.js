import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
	View,
	StyleSheet,
	TouchableOpacity,
	ImageBackground, StatusBar,
	ScrollView,
	Image, Platform, Dimensions, Animated, PanResponder, ImageBackgroundComponent
} from "react-native";
import Text from "../components/Text";
import images from "../assets/images";
import ButtonGame from "../components/ButtonGame";
import TouchAbleBanner from "../components/TouchAbleBanner";
import {scaleHeight, scaleSize, WINDOW_HEIGHT, WINDOW_WIDTH} from "../utils/scale";
import useToggle from "@rooks/use-toggle";
import {useDispatch, useSelector} from "react-redux";
import ButtonImage from "../components/ButtonImage";
import DialogLogin from "../components/DialogLogin";
import PopupChat from "../components/PopupChat";
import Header from "../components/Header";
import {showMessage} from "react-native-flash-message";
import i18n from "i18n-js";
import DiceGamePopup from "../popups/DiceGamePopup";
import io from "socket.io-client/build/esm-debug";
import {environmentConfig} from "../apis";
import {updateUser} from "../reducers/user/action";

const socket = io(environmentConfig.END_POINT_SOCKET, {transports: ['websocket']});
const HomeScreen = ({navigation}) => {

	const {user} = useSelector(state => ({
		user: state.userReducer.user
	}))

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

	useEffect(()=>{
		socket.on('user_changed', (data)=>{
			dispatch(updateUser(data))
		})
	},[])

	const dispatch = useDispatch();

	const [showDialogDice, setShowDialogDice] = useToggle(false)

	const [showDialogLogin, setShowDialogLogin] = useToggle(false)

	return (
		<View style={styles.container}>
			<ImageBackground source={images.featured_game_bg} style={styles.style_background}  resizeMode={'cover'}>
				<View style={styles.container}>
				<View style={[]}>
					{!user&&(
						<View style={styles.style_header_bar}>
							<ButtonImage onPress={setShowDialogLogin} source={images.login_btn}/>
							<ButtonImage source={images.register_btn}/>
						</View>)}
					{user&&(
						<Header/>
					)}
				</View>
				<View style={styles.view_main}>
					<View>
						<Animated.ScrollView pagingEnabled style={styles.style_slider_banner} horizontal showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
							{bannerSlider.map((item)=>(
								<TouchAbleBanner key={item.id} source={item.path}/>
							))}
						</Animated.ScrollView>
					</View>
					<ScrollView horizontal showsHorizontalScrollIndicator={false}>
						<View style={{alignSelf: 'center'}}>
							<ButtonGame onPress={()=>{
								if(!user){
									showMessage({
										message: i18n.t('msg_user_not_login'),
										type: 'danger'
									})
								} else {
									setShowDialogDice(true)
								}
							}} key={'1'} source={images.dice_game}/>
							<ButtonGame onPress={()=>{navigation.navigate('LotteryGameScreen')}} key={'2'} source={images.poker_game}/>
						</View>
						<ButtonGame key={'1'} source={images.machine_game}/>
					</ScrollView>
				</View>
				<View style={styles.style_view_footer}>
				</View>
				{showDialogDice&&(
					<DiceGamePopup/>
				)}
					{/*{showChat&&(*/}
					{/*	<PopupChat/>*/}
					{/*)}*/}
				</View>
			</ImageBackground>
			<StatusBar translucent backgroundColor="transparent" hidden/>
			<DialogLogin onCloseDialog={setShowDialogLogin}  show={showDialogLogin}/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
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
		flexDirection: 'row',
		justifyContent: 'center'
	},
	style_slider_banner: {
		width: scaleSize(310),
		height: scaleHeight(480),
		alignSelf: 'center'
	},
	style_group_view_bet: {
		alignItems: 'center',
	},
	style_view_footer: {
		// alignSelf: 'flex-end'
	},
	style_view_dialog_dice_header: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	style_main_dialog_dice: {
		flexDirection: 'row',
		flex: 1,
		justifyContent: 'space-evenly',
		paddingHorizontal: scaleSize(40)
	},
	style_text_dice: {
		fontFamily: 'Montserrat_900Black',
		fontSize: 28,
		textTransform: 'uppercase',
		color: '#EA2027',
	},
	style_view_bet: {
		alignItems: 'center',
		// borderWidth: 1,
		alignSelf: 'baseline',
		// width: scaleSize(300)
	},
	style_text_bet: {
		fontFamily: 'Montserrat_700Bold',
		color: '#f1c40f',
		marginVertical: -scaleSize(30),
		fontSize: 16
	},
	style_text_count_dice: {
		fontFamily: 'Montserrat_900Black',
		fontSize: 60,
		color: 'white',
	},
	style_text_last: {
		color: 'red'
	},
	current_bet: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: scaleSize(16),
		marginHorizontal: scaleSize(16),
		width: 25, height: 25
	},
	active_current_bet: {
		borderWidth: 2,
		borderRadius: 40,
		borderColor: '#d63031',

	},
	style_view_row: {
		flexDirection: 'row',
		marginTop: scaleSize(16)
	},
	style_text_bet_user: {
		color: 'white',
		marginTop: scaleSize(32)
	},
	style_circle_result: {
		position: 'absolute',
		right: 0,
		backgroundColor: '#833471',
		borderRadius: 30,
		width: 30,
		height: 30,
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 12,
		},
		shadowOpacity: 0.58,
		shadowRadius: 16.00,

		elevation: 24,
	}
})

export default HomeScreen;