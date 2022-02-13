import React, {useEffect, useRef, useState} from 'react';
import { View, StyleSheet, FlatList} from 'react-native'
import {scaleHeight, scaleSize} from "../utils/scale";
import {useSelector} from "react-redux";
import Text from "./Text";
import {Ionicons} from "@expo/vector-icons";
import io from "socket.io-client";
import {environmentConfig} from "../apis";
import {DIALOG_HEIGHT, DIALOG_WIDTH} from "../popups/DiceGamePopup";
import {TouchableOpacity, TextInput} from 'react-native-gesture-handler'

const PopupChat = ({mess}) => {

	const msg = useRef('')

	const cleanSendRef = useRef()

	const setMsg = (text) => {
		msg.current = text
	}

	// useEffect(()=>{
	// 	const socket = io(environmentConfig.END_POINT_SOCKET, {transports: ['websocket']});
	// 	socket.on('messages', (msg)=>{
	// 		setMessages(msg)
	// 	})
	// },[])

	const {user} = useSelector(state => ({
		user: state.userReducer.user
	}))

	const ChatRender = ({item}) => (
		<View style={{flexDirection: 'row', width: 120, margin: scaleSize(8)}}>
			<Text style={{color: '#f39c12', fontSize: 10}}>{item.username}{':'}</Text>
			<View style={{flexWrap: 'wrap', backgroundColor: '#bdc3c7', marginStart: scaleSize(8), borderRadius: 12, paddingHorizontal: scaleSize(16), alignItems: 'center'}}>
				<Text style={{fontSize: 10}}>{item.message}</Text>
			</View>
		</View>
	)

	const sendChat = () => {
		if(msg.current !== '') {
			const socket = io(environmentConfig.END_POINT_SOCKET, {transports: ['websocket']});
			const msgs = {username: user.name, message: msg.current}
			socket.emit('setMessages', msgs)
			cleanSendRef.current?.clear()
			msg.current = ''
		}
	}

	return (
		<View style={styles.container}>
			{Array.isArray(mess) &&(
				<FlatList
					data={mess}
					renderItem={ChatRender}
					showsVerticalScrollIndicator={false}
					keyExtractor={(item, index) => `index+${index}`}
				/>
			)}
			<View style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: scaleSize(16), marginBottom: scaleSize(16)}}>
				<TouchableOpacity style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}} onPress={()=>cleanSendRef.current?.focus()}>
					<TextInput
						placeholder={'Nhập chat...'}
						style={styles.style_text_chat}
						onChangeText={setMsg}
						ref={cleanSendRef}
						placeholderTextColor={'#6A676A'}
					/>
				</TouchableOpacity>
				<View style={{position: 'absolute', right: 12, height: scaleHeight(50)}}>
					<TouchableOpacity onPress={sendChat}>
						<Ionicons color={'white'} name={'ios-send'} size={22}/>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		width: scaleSize(DIALOG_WIDTH)-300,
		height: scaleHeight(DIALOG_HEIGHT),
		backgroundColor: '#4422C6',
		alignSelf: 'flex-start',
		right: scaleSize(DIALOG_WIDTH),
		// shadowColor: "#000",
		// shadowOffset: {
		// 	width: 0,
		// 	height: 9,
		// },
		// shadowOpacity: 0.48,
		// shadowRadius: 11.95,
		//
		// elevation: 18,
		borderRadius: 15,
		// zIndex: 9000,
		borderWidth: 1,
		borderColor: '#998DD5',
	},
	style_text_chat: {
		backgroundColor: '#2D0E45',
		paddingVertical: scaleSize(4),
		paddingHorizontal: scaleSize(16),
		borderRadius: 20,
		width: '100%',
		borderWidth: 1,
		borderColor: '#6934CB',
	}
})

export default PopupChat;