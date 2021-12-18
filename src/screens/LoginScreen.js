import React, {useState} from 'react';
import { View, StyleSheet, TouchableOpacity, ActivityIndicator, Platform, NativeModules, Image, StatusBar, Dimensions } from "react-native";
import Text from '../components/Text'
import i18n from "../i18n/index";
import { TextInput } from 'react-native'
import {scaleSize} from "../utils/scale";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../reducers/login/action";
import images from "../assets/images";
import colors from "../defines/colors";
import { Feather } from '@expo/vector-icons';
import useToggle from "../utils/hooks/useToggle";
i18n.fallbacks = true;

const { StatusBarManager } = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : Platform.OS === 'web' ? 0 : StatusBarManager.HEIGHT;
const WIDTH_SCREEN = Dimensions.get('window').width

const LoginScreen = () => {
	const dispatch = useDispatch();

	const [userData, setUserData] = useState({
		Username: '',
		Password: ''
	});

	const {user, isLoading} = useSelector(state => ({
		user: state.loginReducer.response,
		isLoading: state.loginReducer.isLoading
	}));

	console.log('dssssssssss', isLoading)

	const handleLogin = () => {
		dispatch(loginAction(userData))
	};

	const [lock, setLock] = useToggle(false);

	return (
		<View style={styles.container}>
			<View style={styles.style_view_header_row}>
				<Image style={styles.style_img} source={images.circle_double}/>
					<Text style={styles.style_title_login}>{i18n.t('login')}</Text>
			</View>
			<View style={styles.style_main_login}>
				<View style={styles.style_view_row_social}>
					<View key={'fb'} style={styles.style_view_card}>
						<TouchableOpacity style={styles.style_touch}>
							<Image style={styles.style_img_icon_fb} source={images.ic_fb}/>
							<Text style={styles.style_text_social}>{'Facebook'}</Text>
						</TouchableOpacity>
					</View>
					<View key={'gg'} style={styles.style_view_card}>
						<TouchableOpacity style={styles.style_touch}>
							<Image style={styles.style_img_icon_gg} source={images.ic_gg}/>
							<Text style={styles.style_text_social}>{'Google'}</Text>
						</TouchableOpacity>
					</View>
				</View>
				<View style={styles.view_text_input}>
					<Text>{i18n.t('username')}</Text>

					<TextInput style={styles.style_text_input} placeholder={i18n.t('placeholder_username')}
							   onChangeText={(value)=>{
								   setUserData(prevState => ({
									   ...prevState,
									   Username: value
								   }))
							   }}
					/>

				</View>
				<View style={styles.view_text_input}>
					<Text>{i18n.t('password')}</Text>
					<View style={styles.style_view_row}>
						<TextInput secureTextEntry={lock} style={styles.style_text_input} placeholder={i18n.t('placeholder_password')}
								   onChangeText={(value)=>{
									   setUserData(prevState => ({
										   ...prevState,
										   Password: value
									   }))
								   }}
						/>
						<View style={{position: 'absolute', right: 10}}>
							<TouchableOpacity onPress={setLock}>
								<Feather name={lock?'eye':'eye-off'} size={16} color={'rgba(37, 50, 116, 0.6)'} />
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</View>
			{/*<Text>{JSON.stringify(user)}</Text>*/}
			{/*{isLoading?<ActivityIndicator size="large" color="#00ff00" />:null}*/}
			<View style={styles.style_btn}>

				<TouchableOpacity style={{width: '100%', justifyContent: 'center', alignItems: 'center'}} onPress={handleLogin}>
					{
						isLoading?<ActivityIndicator size="large" color="#00ff00" />:<Text>{i18n.t('login')}</Text>
					}
				</TouchableOpacity>
			</View>
			{/*<Image style={styles.style_bg_footer} source={images.footer_login}/>*/}
			<StatusBar barStyle={'dark-content'} backgroundColor={'white'}/>
			{/*{console.log('LOAAAAAA', isLoading)}*/}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		paddingTop: STATUSBAR_HEIGHT,
		backgroundColor: '#FCFBFB',
		paddingHorizontal: scaleSize(34)
	},
	view_text_input: {
		marginVertical: scaleSize(8)
	},
	style_text_input: {
		paddingVertical: scaleSize(16),
		borderWidth: 1,
		borderRadius: 6,
		borderColor: 'rgba(37, 50, 116, 0.28)',
		paddingStart: scaleSize(20),
		width: '100%'
	},
	style_btn: {
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#7189FF',
		borderRadius: 6,
		height: scaleSize(64),
		marginVertical: scaleSize(38)
	},
	style_view_header_row: {
		flexDirection: 'row',
		marginBottom: scaleSize(16),
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '100%'
	},
	style_img: {
		resizeMode: 'contain',
		width: scaleSize(23),
		height: scaleSize(48)
	},
	style_title_login: {
		fontSize: 32,
		fontFamily: 'Montserrat_700Bold',
		color: colors.template_color
	},
	style_main_login: {
		width: '100%'
	},
	style_view_row_social: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-evenly'
	},
	style_view_card: {
		borderRadius: 8,
		width: scaleSize(154),
		height: scaleSize(60),
		shadowColor: 'rgba(0, 0, 0, 0.06)',
		shadowOffset: {
			width: 0,
			height: 12,
		},
		shadowOpacity: 0.58,
		shadowRadius: 16.00,
		elevation: 24,
		justifyContent: 'center'
	},
	style_touch: {
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
	},
	style_img_icon_fb: {
		width: 11.25,
		height: 18,
		resizeMode: 'contain'
	},
	style_img_icon_gg: {
		width: 18,
		height: 18,
		resizeMode: 'contain'
	},
	style_text_social: {
		color: 'rgba(37, 50, 116, 0.6)'
	},
	style_view_row: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	style_bg_footer: {
		width: WIDTH_SCREEN,
		height: 160,
		resizeMode: 'cover',
		position: 'absolute',
		bottom: 0
	}
})

export default LoginScreen;