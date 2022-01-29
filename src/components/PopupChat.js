import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Animated, PanResponder, View, StyleSheet, FlatList, TextInput, TouchableOpacity} from 'react-native'
import {scaleHeight, scaleSize, WINDOW_HEIGHT, WINDOW_WIDTH} from "../utils/scale";
import {GiftedChat} from "react-native-gifted-chat";
import {useSelector} from "react-redux";
import Text from "./Text";
import {Ionicons} from "@expo/vector-icons";
import io from "socket.io-client";
import {environmentConfig} from "../apis";

const DIALOG_WIDTH = 500;
const DIALOG_HEIGHT = 700;

const PopupChat = ({
}) => {

	const [messages, setMessages] = useState([
	])

	const msg = useRef('')

	const cleanSendRef = useRef()

	const setMsg = (text) => {
		msg.current = text
	}

	useEffect(()=>{
		const socket = io(environmentConfig.END_POINT_SOCKET, {transports: ['websocket']});
		socket.on('messages', (msg)=>{
			setMessages(msg)
		})
	},[])

	const {user} = useSelector(state => ({
		user: state.userReducer.user
	}))

	const ChatRender = ({item}) => (
		<View style={{flexDirection: 'row', width: 120, margin: scaleSize(8)}}>
			<Text style={{color: 'black', fontSize: 10}}>{item.username}{':'}</Text>
			<View style={{flexWrap: 'wrap', backgroundColor: '#bdc3c7', marginStart: scaleSize(8), borderRadius: 12, paddingHorizontal: scaleSize(16), alignItems: 'center'}}>
				<Text style={{fontSize: 10}}>{item.message}</Text>
			</View>
		</View>
	)

	const sendChat = () => {
		if(msg.current !== '') {
			const socket = io(environmentConfig.END_POINT_SOCKET, {transports: ['websocket']});
			const msgs = {username: user.username, message: msg.current}
			socket.emit('setMessages', msgs)
			cleanSendRef.current?.clear()
			msg.current = ''
		}
	}

	return (
		<Animated.View style={[styles.drag_view]}>
			<View style={{backgroundColor: 'white', flex: 1}}>
				<FlatList
					data={messages}
					renderItem={ChatRender}
					showsVerticalScrollIndicator={false}
					keyExtractor={(item, index) => index}
				/>
				<View style={{flexDirection: 'row', alignItems: 'center'}}>
					<TextInput
						placeholder={'Nhập chat...'}
						style={styles.style_text_chat}
						onChangeText={setMsg}
						ref={cleanSendRef}
					/>
					<View style={{position: 'absolute', right: 10, height: scaleHeight(50)}}>
						<TouchableOpacity onPress={sendChat}>
							<Ionicons name={'ios-send'} size={22}/>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: scaleSize(DIALOG_WIDTH),
		height: scaleHeight(DIALOG_HEIGHT),
		backgroundColor: 'white'
	},
	style_text_chat: {
		backgroundColor: 'white',
		paddingVertical: scaleSize(4),
		paddingHorizontal: scaleSize(16),
		borderRadius: 20,
		width: 140,
		borderWidth: 1,
		marginBottom: scaleSize(4)
	}
})

export default PopupChat;