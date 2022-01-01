import React, {useState, useCallback, useEffect} from 'react';
import {View, LogBox} from 'react-native'
import Text from "../components/Text";
import {GiftedChat} from 'react-native-gifted-chat';
import {db, send, uid} from "../services/FirebaseConfig";
import {onValue, query, ref, off, limitToLast, orderByKey} from "firebase/database";
import _ from "lodash";

const ChatScreen = ({navigation, route}) => {
	const [messages, setMessages] = useState([]);


	LogBox.ignoreLogs(['Setting a timer']);
	const onDataChange = (items) => {
		const arrMsg = _.toArray(items.val());
		let index = 0;
		let initMsg = []
		// console.log('a', arrMsg)
		for (const property in items.val()) {
			let urAV = {...arrMsg[index].user};
			if(urAV.name?.current !== undefined) {
				urAV.avatar = `https://ui-avatars.com/api/?background=0dbc3f&color=FFF&name=${urAV.name?.current}`;
				const obj = {
					_id: property,
					createdAt: new Date(arrMsg[index].timestamp),
					text: arrMsg[index].text,
					user: urAV,
				}
				console.log('OBJ', obj)
				initMsg.push(obj)
			}
			index++
		}
		const order = _.orderBy(initMsg, ['createdAt'],['desc'])
		// console.log('ORR', order)
		setMessages(order);
	};

	useEffect(() => {
		onValue(query(ref(db, `messages`), orderByKey()), snapshot => {
			onDataChange(snapshot)
		})

		return () => {
			off(query(ref(db, `messages`), orderByKey()), "value", snapshot => {})
		};
	}, [])

	// console.log('MESS', messages)

	const user = () => {
		return {
			name: (Math.random() + 1).toString(36).substring(7),
			_id: uid()
		}
	};

	const onSend = useCallback((messages = []) => {
		send(messages)
	}, []);

	return (
		<View style={{flex: 1,}}>
			<View style={{flex: 1, marginHorizontal: 40}}>
				<GiftedChat
					messages={messages}
					onSend={messages => onSend(messages)}
					user={user()}
				/>
			</View>


		</View>
	);
};

async function sendPushNotification(messages) {
	const message = {
		to: 'ExponentPushToken[lkBRHaMF851DmuY45K3DM-]',
		sound: 'default',
		title: 'Tin nhắn mới',
		body: messages,
	};

	await fetch('https://exp.host/--/api/v2/push/send', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Accept-encoding': 'gzip, deflate',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(message),
	});
}

export default ChatScreen;