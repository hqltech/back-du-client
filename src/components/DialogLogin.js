import React, {useEffect, useRef} from 'react';
import {Modal, StyleSheet, View, ImageBackground, TouchableOpacity, TextInput} from "react-native";
import images from "../assets/images";
import {scaleHeight, scaleSize} from "../utils/scale";
import Text from "./Text";
import i18n from "../i18n";
import {Ionicons} from "@expo/vector-icons";
import ButtonImage from "./ButtonImage";
import {useDispatch, useSelector} from "react-redux";
import {cleanLoginState, loginAction} from "../reducers/login/action";
import { showMessage } from "react-native-flash-message";
import Spinner from 'react-native-loading-spinner-overlay';
import {createAnonymous} from "../reducers/user/action";

const DialogLogin = ({
	show=false,
	onCloseDialog = () => {}
}) => {

	const username = useRef('')
	const password = useRef('')

	const dispatch = useDispatch()

	const {isLoading, response} = useSelector(state => state.loginReducer)

	const loginHandle = () => {
		const user = {username: username.current, password: password.current}
		dispatch(loginAction(user))
	}

	useEffect(()=>{
		if(response?.msg) {
			showMessage({
				message: response.msg,
				type: "info"
			})
			if(response.msg === 'Đăng nhập thành công.') {
				onCloseDialog()
				dispatch(createAnonymous(response.user))
			}
			// dispatch(cleanLoginState())
		}
	},[response])

	// console.log(response?.user)

	const setUsername = (text) => {
		username.current = text
	}

	const setPassword = (text) => {
		password.current = text
	}

	return (
		<Modal
			animationType={'none'}
			transparent={true}
			visible={show}
			supportedOrientations={['portrait', 'landscape']}
		>
			<View style={styles.container}>
				<Spinner
					visible={isLoading}
					textContent={'Loading...'}
					textStyle={styles.spinnerTextStyle}
				/>
				<View style={{width: scaleSize(1000), height: scaleHeight(650),}}>
					<ImageBackground style={styles.style_img_bg} source={images.dialog_login_bg}>
						<View style={styles.style_view_header}>
							<Text style={styles.style_text_header}>{i18n.t('login')}</Text>
							<View style={{position: 'absolute', right: 0}}>
								<TouchableOpacity onPress={onCloseDialog}>
									<Ionicons color={'white'} size={32} name={'ios-close'}/>
								</TouchableOpacity>
							</View>
						</View>
						<View style={styles.style_view_main}>
							<View style={{alignSelf: 'center'}}>
								<TextInput
									placeholder={i18n.t('username')}
									style={styles.style_text_input}
									onChangeText={setUsername}
								/>
								<TextInput
									placeholder={i18n.t('password')}
									style={styles.style_text_input}
									onChangeText={setPassword}
								/>
							</View>
							<View style={{alignSelf: 'center'}}>
								<ButtonImage onPress={loginHandle} source={images.login_btn}/>
							</View>
						</View>
					</ImageBackground>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		top: 0, left: 0, right: 0, bottom: 0,
		backgroundColor: 'rgba(52, 52, 52, 0.8)'
	},
	style_img_bg: {
		resizeMode: 'contain',
		padding: scaleSize(32),
		flex: 1
	},
	style_view_header: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginBottom: scaleSize(16)
	},
	style_text_header: {
		color: 'white',
		fontFamily: 'Montserrat_600SemiBold',
		fontSize: 24,

	},
	style_text_input: {
		paddingHorizontal: scaleSize(16),
		paddingVertical: scaleSize(24),
		borderWidth: 1,
		marginVertical: scaleSize(16),
		borderColor: '#dcdde1',
		borderRadius: 40,
		width: 375,
		backgroundColor: 'rgba(0, 0, 0, 0.3)',
		color: 'white'
	},
	style_view_main: {
		justifyContent: 'center'
	},
	spinnerTextStyle: {
		color: '#FFF'
	},
})

export default DialogLogin;