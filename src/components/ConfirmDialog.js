import React from 'react';
import { View, Modal, StyleSheet, ActivityIndicator, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import Text from './Text'
import {scaleSize} from "../utils/scale";

const ConfirmDialog = ({
	show = false,
	title = '',
	messages = '',
	cancelTitle = '',
	confirmTitle = '',
	cancelPress = () => { },
	confirmPress = () => { },
	closeIconPress = () => { },
	isLoading,
	children,
}) => {
    const widthCalculateByDimension = Dimensions.get('screen').width

    // console.log('modal rerender')
	return(
		<Modal animationType={'none'} transparent={true} visible={show}>
			<View style={styles.container}>
				<View style={[styles.style_view_body,{width:widthCalculateByDimension - scaleSize(45)}]}>
					{
						isLoading ? <ActivityIndicator/>:
							<View>
								<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
									<Text style={styles.style_txt_title}>{title}</Text>
									<TouchableOpacity style={{ position: 'absolute', right: 0 }} onPress={closeIconPress}>
										<Ionicons size={20} name={'ios-close'} />
									</TouchableOpacity>
								</View>
								<Text style={styles.style_txt_messages}>{messages}</Text>
								{children}
								<View style={styles.style_view_button}>
									<TouchableOpacity onPress={cancelPress} style={[styles.style_button, styles.cancel_button]}>
										<Text style={{ color: '#A7A4A4',fontWeight: 'bold' }}>{cancelTitle}</Text>
									</TouchableOpacity>
									<TouchableOpacity onPress={confirmPress} style={[styles.style_button, styles.confirm_button]} >
										<Text style={{ color: 'white', fontWeight: 'bold' }}>{confirmTitle}</Text>
									</TouchableOpacity>
								</View>
							</View>
					}
				</View>
			</View>
			<StatusBar backgroundColor={'rgba(52, 52, 52, 0.8)'} animated={true} />
		</Modal>
	)
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
	none: {
		display: 'none'
	},
	style_view_body: {
		backgroundColor: 'white',
		borderRadius: 8,
		paddingHorizontal: scaleSize(14),
		paddingVertical: scaleSize(16),
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	},
	style_txt_title: {
		fontWeight: 'bold'
	},
	style_txt_messages: {
		marginTop: scaleSize(24),
		color: '#1C1939',
	},
	style_view_button: {
		width: scaleSize(271),
		flexDirection: 'row',
		marginTop: scaleSize(40),
		alignSelf: 'center'
	},
	style_button: {
		paddingVertical: scaleSize(12),
		paddingHorizontal: scaleSize(10),
		borderRadius: scaleSize(22),
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: 6,
		flex: 1
	},
	confirm_button: {
		backgroundColor: '#FF671F'
	},
	cancel_button: {
		borderWidth: 1,
		borderColor: '#A7A4A4'
	}
})

export default ConfirmDialog;