import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
	View,
	StyleSheet,
	TouchableOpacity,
	ImageBackground, StatusBar,
	ScrollView,
	Image, Platform, Dimensions, Animated, PanResponder
} from "react-native";
import Text from "../components/Text";
import images from "../assets/images";
import ButtonGame from "../components/ButtonGame";
import TouchAbleBanner from "../components/TouchAbleBanner";
import {scaleHeight, scaleSize, WINDOW_HEIGHT, WINDOW_WIDTH} from "../utils/scale";
import {Ionicons} from "@expo/vector-icons";
import Dice from "../components/Dice";
import useToggle from "@rooks/use-toggle";
import {useDispatch, useSelector} from "react-redux";
import {minusCoins, plusCoins} from "../reducers/user/action";

const DIALOG_WIDTH = 820;
const DIALOG_HEIGHT = 550;

const CIRCLE_RADIUS = 80

const BET_ARR = [
	{path: images.chip_100, value: 100},
	{path: images.chip_200, value: 200},
	{path: images.chip_500, value: 500},
	{path: images.chip_1000, value: 1000},
	{path: images.chip_2000, value: 2000},
	{path: images.chip_5000, value: 5000},
]

const HomeScreen = ({navigation}) => {

	const navigateToDice = () => {
		navigation.navigate('DiceGameScreen')
	}

	const [dice, setDice] = useState({
		dice_1: Math.floor(Math.random() * 6) + 1,
		dice_2: Math.floor(Math.random() * 6) + 1,
		dice_3: Math.floor(Math.random() * 6) + 1
	});

	let [currentCount, setCount] = useState(50);

	const timer = () => setCount(currentCount - 1);

	function total (number1, number2, number3) {
		return number1 + number2 + number3;
	}
	const resultTotal = useMemo(() => total(dice.dice_1, dice.dice_2, dice.dice_3), [dice.dice_1, dice.dice_2, dice.dice_3]);

	const {user} = useSelector(state => ({
		user: state.userReducer.user
	}))

	function plusCoin (coin) {
		let userUpdate = {...user}
		userUpdate.coins += coin
		dispatch(plusCoins(userUpdate));
	}

	function minusCoin (type) {
		if(user.coins < currentBet){
			alert('COIN không đủ để cược')
		}
		else {
			let userUpdate = {...user};
			userUpdate.coins -= currentBet;
			dispatch(minusCoins(userUpdate));
			if(type === 1) setBet(prevState => ({...prevState, t: bet.t + currentBet}));
			if(type === 2) setBet(prevState => ({...prevState, x: bet.x + currentBet}));
		}
	}

	useEffect(()=>{
		if (currentCount === 0) {
			const dice_1 = Math.floor(Math.random() * 6) + 1;
			const dice_2 = Math.floor(Math.random() * 6) + 1;
			const dice_3 = Math.floor(Math.random() * 6) + 1;
			const total = dice_1+dice_2+dice_3
			setDice(prevState => ({
				...prevState,
				dice_1: dice_1,
				dice_2: dice_2,
				dice_3: dice_3,
			}))
			if(tx(total) === 'Tài') plusCoin(bet.t*1.9)
			if(tx(total) === 'Xỉu') plusCoin(bet.x*1.9)
			setBet(prevState => ({
				...prevState,
				t: 0,
				x: 0
			}))
			setTimeout(
				() => setCount(currentCount+=50),
				11000
			);
		}
		const id = setInterval(timer, 1000);
		return () => clearInterval(id);
	},[currentCount]);
	function tx (number) {
		if(number - 10 >= 1) return 'Tài'
		return 'Xỉu'
	}

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

	const dispatch = useDispatch();

	const [currentBet, setCurrentBet] = useState(100);

	const [bet, setBet] = useState({t: 0, x: 0});

	const [showDialogDice, setShowDialogDice] = useToggle(false)

	const resultTX = useMemo(() => tx(dice.dice_1 + dice.dice_2 + dice.dice_3), [dice.dice_1 + dice.dice_2 + dice.dice_3]);

	return (
		<View style={styles.container}>
			<ImageBackground source={images.featured_game_bg} style={styles.style_background}  resizeMode={'cover'}>
				<View style={styles.style_header_bar}>

				</View>
				<View style={styles.view_main}>
					<Animated.ScrollView pagingEnabled style={styles.style_slider_banner} horizontal showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
						{bannerSlider.map((item)=>(
							<TouchAbleBanner key={item.id} source={item.path}/>
						))}
					</Animated.ScrollView>
					<ScrollView horizontal showsHorizontalScrollIndicator={false}>
						<View style={{alignSelf: 'center'}}>
							<ButtonGame onPress={setShowDialogDice} key={'1'} source={images.dice_game}/>
							<ButtonGame onPress={()=>{navigation.navigate('LotteryGameScreen')}} key={'2'} source={images.poker_game}/>
						</View>
						<ButtonGame key={'1'} source={images.machine_game}/>
					</ScrollView>
				</View>
				<View style={styles.style_view_footer}>

				</View>
				{showDialogDice&&(
					<Animated.View style={[styles.drag_view,{
						transform: [{ translateX: pan.x }, { translateY: pan.y }]
					}]} {...panResponder.panHandlers}>
						<View style={styles.style_view_dialog_dice_header}>
							<View>
								<TouchableOpacity>
									<Ionicons size={24} name={'ios-chatbox-outline'}/>
								</TouchableOpacity>
							</View>
							<View style={styles.style_view_row}>
								<Text>{user.Username}</Text>
								<Text style={{color: 'red'}}> {'Coin:'} {user.coins}</Text>
							</View>
							<View>
								<TouchableOpacity onPress={setShowDialogDice}>
									<Ionicons size={24} name={'ios-close'}/>
								</TouchableOpacity>
							</View>
						</View>
						<View style={styles.style_main_dialog_dice}>
							<View style={styles.style_view_bet}>
								<Text style={styles.style_text_dice}>{'Tài'}</Text>
								<Text style={styles.style_text_bet}>{bet.t}</Text>
								<View style={{marginTop: scaleSize(16)}}>
									<TouchableOpacity onPress={()=>minusCoin(1)}>
										<Ionicons color={'#fdcb6e'} name={'ios-hand-left'} size={42}/>
									</TouchableOpacity>
								</View>
							</View>
							<View style={{alignItems: 'center'}}>
								<View style={styles.style_circle_dice_count_down}>
									{currentCount<=0&&(
										<View style={{alignItems: 'center'}}>
											<View style={styles.style_view_row}>
												<Text style={{fontSize: 18}}>{resultTotal}</Text>
												<Text style={{fontSize: 20, color: 'red'}}>{resultTX}</Text>
											</View>

											<Dice key={'dice1'} number={dice.dice_1}/>
											<View style={styles.style_view_row}>
												<Dice key={'dice2'} number={dice.dice_2}/>
												<Dice key={'dice3'} number={dice.dice_3}/>
											</View>
										</View>
									)}
									{currentCount > 0 &&(
										<Text style={styles.style_text_count_dice}>{currentCount}</Text>
									)}
								</View>
								<View style={styles.style_view_row}>
									{BET_ARR.map((item)=>(
										<View style={[styles.current_bet, currentBet===item.value?styles.active_current_bet:null]} key={item.value}>
											<TouchableOpacity onPress={()=>{setCurrentBet(item.value)}}
															  style={{width: 30, height: 30, justifyContent: 'center', alignItems: 'center'}}>
												<Image style={{width: 30, height: 30}} source={item.path} resizeMode={'stretch'}/>
											</TouchableOpacity>
										</View>
									))}
								</View>

							</View>

							<View style={styles.style_view_bet}>
								<Text style={styles.style_text_dice}>{'Xỉu'}</Text>
								<Text style={styles.style_text_bet}>{bet.x}</Text>
								<View style={{marginTop: scaleSize(16)}}>
									<TouchableOpacity onPress={()=>minusCoin(2)}>
										<Ionicons color={'#6c5ce7'} name={'ios-hand-right'} size={42}/>
									</TouchableOpacity>
								</View>
							</View>
						</View>
					</Animated.View>
				)}

			</ImageBackground>
			<StatusBar translucent backgroundColor="transparent" hidden/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',

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

	},
	style_slider_banner: {
		width: scaleSize(310),
		height: scaleHeight(480),
		alignSelf: 'center'
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
		// alignSelf: 'center',
		backgroundColor: 'white',
		borderRadius: 20,
		padding: scaleSize(16),
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 12,
		},
		shadowOpacity: 0.58,
		shadowRadius: 16.00,
		elevation: 24,
	},
	style_view_dialog_dice_header: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	style_main_dialog_dice: {
		flexDirection: 'row',
		flex: 1,
		justifyContent: 'space-between',

	},
	style_text_dice: {
		fontFamily: 'Montserrat_900Black',
		fontSize: 28,
		textTransform: 'uppercase',
		color: '#EA2027',
	},
	style_view_bet: {
		alignItems: 'center'
	},
	style_text_bet: {
		fontFamily: 'Montserrat_700Bold',
		color: '#ff5252',
		marginVertical: scaleSize(16)
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
		color: 'white'
	},
	current_bet: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: scaleSize(16),
		marginHorizontal: scaleSize(16),
		width: 34, height: 34
	},
	active_current_bet: {
		borderWidth: 2,
		borderRadius: 40,
		borderColor: '#d63031',

	},
	style_view_row: {
		flexDirection: 'row',
		marginTop: scaleSize(16)
	}
})

export default HomeScreen;