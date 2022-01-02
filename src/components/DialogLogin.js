import React from 'react';
import {Modal, StyleSheet, View, ImageBackground, TouchableOpacity, TextInput} from "react-native";
import images from "../assets/images";
import {scaleHeight, scaleSize} from "../utils/scale";
import Text from "./Text";
import i18n from "../i18n";
import {Ionicons} from "@expo/vector-icons";
import ButtonImage from "./ButtonImage";

const DialogLogin = ({
	show=false,
	onCloseDialog = () => {}
}) => {
	return (
		<Modal
			animationType={'none'}
			transparent={true}
			visible={show}
			supportedOrientations={['portrait', 'landscape']}
		>
			<View style={styles.container}>
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
								/>
								<TextInput
									placeholder={i18n.t('password')}
									style={styles.style_text_input}
								/>
							</View>
							<View style={{alignSelf: 'center'}}>
								<ButtonImage source={images.login_btn}/>
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
		borderRadius: 22,
		width: 375,
	},
	style_view_main: {
		justifyContent: 'center'
	}
})

export default DialogLogin;