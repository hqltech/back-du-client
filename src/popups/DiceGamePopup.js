import React, {useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react';
import {
	Animated,
	Image,
	ImageBackground,
	PanResponder,
	Platform,
	StyleSheet,
	TouchableOpacity,
	View
} from "react-native";
import {scaleHeight, scaleSize, WINDOW_HEIGHT, WINDOW_WIDTH} from "../utils/scale";
import images from "../assets/images";
import ButtonImage from "../components/ButtonImage";
import AnimateText from "../components/AnimateText";
import Text from "../components/Text";
import {Ionicons} from "@expo/vector-icons";
import AnimateDice from "../components/AnimateDice";
import Dice from "../components/Dice";
import io from "socket.io-client";
import {useSelector} from "react-redux";
import {showMessage} from "react-native-flash-message";
import {environmentConfig} from "../apis";
import ResultDicePopup from "../components/ResultDicePopup";
import {useToggle} from "rooks";
import PopupChat from "../components/PopupChat";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DIALOG_WIDTH = 1000;
const DIALOG_HEIGHT = 600;

const CIRCLE_RADIUS = 80

export {DIALOG_WIDTH}
export {DIALOG_HEIGHT}

const BET_ARR = [
	{path: images.chip_100, value: 100},
	{path: images.chip_200, value: 200},
	{path: images.chip_500, value: 500},
	{path: images.chip_1000, value: 1000},
	{path: images.chip_2000, value: 2000},
	{path: images.chip_5000, value: 5000},
]
const socket = io(environmentConfig.END_POINT_SOCKET, {transports: ['websocket']});
const DiceGamePopup = () => {

	const [dice, setDice] = useState({
		dice_1: Math.floor(Math.random() * 6) + 1,
		dice_2: Math.floor(Math.random() * 6) + 1,
		dice_3: Math.floor(Math.random() * 6) + 1
	});

	const {user} = useSelector(state => ({
		user: state.userReducer.user
	}))

	const [currentCount, setCurrentCount] = useState(0)

	const [openTimer, setOpenTimer] = useState()
	const [serverBet, setServerBet] = useState({t: 0, x: 0})
	const [betT, setBetT] = useState(0)
	const [betX, setBetX] = useState(0)
	const [currentBet, setCurrentBet] = useState(100);

	function total (number1, number2, number3) {
		return number1 + number2 + number3;
	}

	const pan = useRef(new Animated.ValueXY()).current;

	const panResponder = useRef(
		PanResponder.create({
			onMoveShouldSetPanResponder: () => true,
			onPanResponderGrant: () => {
				pan.setOffset({
					x: pan.x._value,
					y: pan.y._value
				});
			},
			onPanResponderMove: Animated.event(
				[
					null,
					{ dx: pan.x, dy: pan.y }
				],
				{useNativeDriver: false}
			),
			onPanResponderRelease: () => {
				pan.flattenOffset();
			}
		})
	).current;

	useLayoutEffect(()=>{
		const socket = io(environmentConfig.END_POINT_SOCKET, {transports: ['websocket']});
		socket.connect();
		socket.emit('openDicePopup', ()=>{

		})
	},[]);

	const [countTai, setCountTai] = useState(0);
	const [countXiu, setCountXiu] = useState(0);
	const [diceResult, setDiceResult] = useState()
	const [messages, setMessages] = useState([]);

	useEffect(()=>{

		// socket.connect();
		socket.on('messages', (msg)=>{
			setMessages(msg)
		})

		socket.on('connect', () => {
			console.log(socket.id);
		});

		socket.on('connect_error', (err)=>{
			console.log('err', err)
			setTimeout(()=>{
				socket.connect()
			}, 3500)
		})

		socket.on("countDownDiceServer", data => {
			setCurrentCount(data)
		});

		socket.on("arrResultDice", data => {
			setDiceResult(data)
		});

		socket.on("countTaiXiu", data => {
			setCountTai(data.t)
			setCountXiu(data.x)
		});

		socket.on('betDiceT', data=>{
			setServerBet(prevState => ({...prevState, t: data}))
		})

		socket.on('betDiceX', data=>{
			setServerBet(prevState => ({...prevState, x: data}))
		})

		socket.on("diceResults", data => {
			setDice(prevState => ({
				...prevState,
				dice_1: data.dices.dice_1,
				dice_2: data.dices.dice_2,
				dice_3: data.dices.dice_3,
			}))
			if(total(data.dices.dice_1,data.dices.dice_2, data.dices.dice_3) - 10 > 0) {
				setTimeout(
					() => {
						setCountTai(data.countTaiXiu.t);
						setBetT((betT)=>{
							console.log('eb', betT)
							if(betT > 0) {
								AsyncStorage.getItem('key').then(token=>{
									socket.emit('user_update_coin', {token: token, coin: betT * 1.7, type: 'PLUS'});
								})
							}
							return 0
						});
						setBetX(0)
					},
					3000
				);
			}else{
				setTimeout(
					() => {
						setCountXiu(data.countTaiXiu.x);
						setBetX((betX)=>{
							if(betX > 0) {
								AsyncStorage.getItem('key').then(token=>{
									socket.emit('user_update_coin', {token: token, coin: betX * 1.7, type: 'PLUS'});
								})
							}
							return 0
						})
						setBetT(0)
					},
					3000
				);
			}
			setDiceResult(data.arrResultDice)
		});
		socket.on("timeOpen", data => {
			setOpenTimer(data)
		})
		return () => {
			socket.disconnect();
			socket.removeAllListeners()
		}
	},[])

	async function minusCoin (type) {
		const token = await AsyncStorage.getItem('key')
		// console.log('token', token)
		if(user.total_gold < currentBet){
			showMessage({
				message: 'BC không đủ để cược!',
				type: 'warning'
			})
		}
		else {
			if(currentCount > 5) {
				if(type === 1) {
					setBetT(betT + currentBet)
					socket.emit('betDiceT', currentBet)
					socket.emit('user_update_coin', {token: token, coin: currentBet, type: 'MINUS'});
				}
				if(type === 2){
					setBetX(betX + currentBet)
					socket.emit('betDiceX', currentBet)
					socket.emit('user_update_coin', {token: token, coin: currentBet, type: 'MINUS'});
				}
			} else {
				alert('Hết thời gian cược')
			}
		}
	}

	const resultTotal = useMemo(() => total(dice.dice_1, dice.dice_2, dice.dice_3), [dice.dice_1, dice.dice_2, dice.dice_3]);

	function addZeroNumber (number) {
		return number - 10 < 0 ? `0${number}`: number
	}

	const [isResultDicePopup, setIsResultDicePopup] = useToggle(false);

	const [showChat, setShowChat] = useToggle(false);

	return (
		<Animated.View style={[styles.drag_view,{
			transform: [{ translateX: pan.x }, { translateY: pan.y }]
		}]}  {...panResponder.panHandlers}>
			<ImageBackground style={styles.style_image_bg} source={images.tx_table_bg}>
				<ButtonImage style={styles.style_chat_btn} onPress={setShowChat} source={images.chat_table}/>
				<View style={styles.style_main_dialog_dice}>
				<View style={styles.style_view_bet}>
					<AnimateText win={countTai} source={images.tai}/>
					<Text style={styles.style_text_bet}>{serverBet.t}</Text>
					<Text style={styles.style_text_bet_user}>{betT}</Text>
					<View style={{marginTop: scaleSize(16)}}>
						<TouchableOpacity onPress={()=>minusCoin(1)}>
							<Ionicons color={'#fdcb6e'} name={'ios-hand-left'} size={42}/>
						</TouchableOpacity>
					</View>
				</View>
				<View style={{alignItems: 'center'}}>
					<AnimateDice>
						{currentCount===0&&(
							<View style={{position: 'absolute', alignItems: 'center', alignSelf: 'center', top: 15}}>
								<View style={styles.style_circle_result}>
									<Text style={{fontSize: 16, color: 'white', fontWeight: 'bold'}}>{resultTotal}</Text>
								</View>
								<Dice key={'dice1'} number={dice.dice_1}/>
								<View style={{flexDirection: 'row'}}>
									<Dice key={'dice2'} number={dice.dice_2}/>
									<Dice key={'dice3'} number={dice.dice_3}/>
								</View>
								<Text>{openTimer}</Text>
							</View>
						)}
						{currentCount > 0 &&(
							<View style={{position: 'absolute', left: 45, top: 25}}>
								<Text style={[styles.style_text_count_dice, currentCount <= 5 && styles.style_text_last]}>{addZeroNumber(currentCount)}</Text>
							</View>
						)}
					</AnimateDice>
					<View style={[styles.style_view_row]}>
						{BET_ARR.map((item)=>(
							<View style={[styles.current_bet, currentBet===item.value?styles.active_current_bet:null]} key={item.value}>
								<TouchableOpacity onPress={()=>{setCurrentBet(item.value)}}
												  style={{width: 22, height: 22, justifyContent: 'center', alignItems: 'center'}}>
									<Image style={{width: 22, height: 22}} source={item.path} resizeMode={'stretch'}/>
								</TouchableOpacity>
							</View>
						))}
						<ButtonImage style={styles.style_btn_img} source={images.btn_soi_cau} onPress={setIsResultDicePopup}/>
					</View>
				</View>
				<View style={styles.style_view_bet}>
					<AnimateText win={countXiu} source={images.xiu}/>
					<Text style={styles.style_text_bet}>{serverBet.x}</Text>
					<Text style={styles.style_text_bet_user}>{betX}</Text>
					<View style={{marginTop: scaleSize(16)}}>
						<TouchableOpacity onPress={()=>minusCoin(2)}>
							<Ionicons color={'#3498db'} name={'ios-hand-right'} size={42}/>
						</TouchableOpacity>
					</View>
				</View>
			</View>
			{showChat&&(
				<PopupChat mess={messages}/>
			)}
			{isResultDicePopup&&(
				<ResultDicePopup countTai={countTai} countXiu={countXiu} result={diceResult}/>
			)}
			</ImageBackground>
		</Animated.View>
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
		flexDirection: 'row',
	},
	view_main: {
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
	drag_view: {
		position: 'absolute',
		top: WINDOW_HEIGHT / 2 - scaleHeight(DIALOG_HEIGHT) / 2,
		left: WINDOW_WIDTH / 2 - scaleSize(DIALOG_WIDTH) / 2,
		width: scaleSize(DIALOG_WIDTH),
		height: scaleHeight(DIALOG_HEIGHT),
		// borderWidth: 1,
		flexDirection: 'row',
	},
	style_view_dialog_dice_header: {
		// flexDirection: 'row',
		// justifyContent: 'space-between',
		// borderWidth: 1
	},
	style_main_dialog_dice: {
		flexDirection: 'row',
		flex: 1,
		justifyContent: 'space-evenly',
		paddingHorizontal: scaleSize(40),
		// alignItems: 'center',
		alignSelf: 'center'
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
	style_circle_dice_count_down: {
		backgroundColor: '#1abc9c',
		width: CIRCLE_RADIUS*2,
		height: CIRCLE_RADIUS*2,
		borderRadius: CIRCLE_RADIUS,
		justifyContent: 'center',
		alignItems: 'center'
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
	style_image_bg: {
		width: scaleSize(DIALOG_WIDTH),
		height: scaleHeight(DIALOG_HEIGHT),
		// flexDirection: 'row',
		// justifyContent: 'center',
		// alignItems: 'center'
		resizeMode: 'center'
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
	},
	style_btn_img: {
		width: scaleSize(70)
	},
	style_chat_btn: {
		width: scaleSize(70),
		height: scaleHeight(60),
		resizeMode: 'contain',
	}
})

export default DiceGamePopup;