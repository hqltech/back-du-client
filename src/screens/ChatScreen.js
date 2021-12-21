import React, {useState, useCallback, useEffect, useRef, useLayoutEffect} from 'react';
import {View, LogBox} from 'react-native'
import Text from "../components/Text";
import {GiftedChat} from 'react-native-gifted-chat';
import {db, send, uid} from "../services/FirebaseConfig";
import {limitToLast, onValue, query, ref, get, orderByChild, onChildAdded, onChildChanged, off} from "firebase/database";
import _ from "lodash";

const ChatScreen = ({navigation, route}) => {
	const [messages, setMessages] = useState([]);


	LogBox.ignoreLogs(['Setting a timer']);
	const onDataChange = (items) => {
		const arrMsg = _.toArray(items.val());
		let index = 0;
		let initMsg = []
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
				initMsg.push(obj)
			}
			// console.log(urAV)
			index++
		}
		let compareMessages = [...messages]
		const order = _.orderBy(initMsg, ['createdAt'],['desc'])
		console.log('COMPARE MESSSSS', compareMessages)
		if (compareMessages.length !== 0) {
			const results = initMsg.filter(({ _id: id1 }) => !compareMessages.some(({ _id: id2 }) => id2 === id1));
			console.log('resssssssssssssss', results)
			// for(let m = 0; m < results.length; m++) {
			// 	console.log('a', results[m].text)
			// 	// sendPushNotification(results[m].text).then(r=>{}).catch(err=>console.log('Error Call Notification', err));
			// }
			// console.log('aaaaaaa', results)
		}
		setMessages(order);
	};

	useEffect(() => {
		onValue(query(ref(db, `messages`)), snapshot => {
			onDataChange(snapshot)
			// console.log('CHANGEE  ', snapshot)
		})

		return () => {
			off(query(ref(db, `messages`)), "value", snapshot => {
				console.log('SNAPPPPP', snapshot)
			})
		};
	}, [])

	const user = () => {
		return {
			name: route.params?.name,
			_id: uid()
		}
	};

	const onSend = useCallback((messages = []) => {
		send(messages)
	}, []);

	return (
		<View style={{flex: 1}}>
			<Text>{'CHAT SCREEN'}</Text>
			<GiftedChat
				messages={messages}
				onSend={messages => onSend(messages)}
				user={user()}
			/>
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