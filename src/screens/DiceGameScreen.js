import React, {useEffect, useMemo, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Image, ImageBackground, ImageBackgroundComponent} from 'react-native';
import Dice from "../components/Dice";
import Text from "../components/Text";
import i18n from "i18n-js";
import {useDispatch, useSelector} from "react-redux";
import {scaleSize} from "../utils/scale";
import {FontAwesome} from "@expo/vector-icons";
import images from "../assets/images";
import {minusCoins, plusCoins} from "../reducers/user/action";

const BET_ARR = [
	{path: images.chip_100, value: 100},
	{path: images.chip_200, value: 200},
	{path: images.chip_500, value: 500},
	{path: images.chip_1000, value: 1000},
	{path: images.chip_2000, value: 2000},
	{path: images.chip_5000, value: 5000},
]

const DiceGameScreen = ({navigation}) => {

	const [dice, setDice] = useState({
		dice_1: Math.floor(Math.random() * 6) + 1,
		dice_2: Math.floor(Math.random() * 6) + 1,
		dice_3: Math.floor(Math.random() * 6) + 1
	});

	let [currentCount, setCount] = useState(20);

	const {user} = useSelector(state => ({
		user: state.userReducer.user
	}))
	const dispatch = useDispatch();

	const timer = () => setCount(currentCount - 1);

	useEffect(()=>{
		if (currentCount <= 0) {
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
			setCount(currentCount+=20)
		}
		const id = setInterval(timer, 1000);
		return () => clearInterval(id);
	},[currentCount]);

	function tx (number) {
		if(number - 10 >= 1) return 'Tài'
		return 'Xỉu'
	}

	function total (number1, number2, number3) {
		return number1 + number2 + number3;
	}

	function plusCoin (coin) {
		let userUpdate = {...user}
		userUpdate.coins += coin
		dispatch(plusCoins(userUpdate));
	}

	const resultTX = useMemo(() => tx(dice.dice_1 + dice.dice_2 + dice.dice_3), [dice.dice_1 + dice.dice_2 + dice.dice_3]);
	const resultTotal = useMemo(() => total(dice.dice_1, dice.dice_2, dice.dice_3), [dice.dice_1, dice.dice_2, dice.dice_3]);

	const [currentBet, setCurrentBet] = useState(100);

	const [bet, setBet] = useState({
		t: 0,
		x: 0
	})

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

	return (
		<View style={styles.container}>
			{/*<ImageBackground style={styles.container} resizeMode={'cover'} source={images.newsletter}>*/}
				<View style={{flexDirection: 'row', alignItems: 'center'}}>
					<TouchableOpacity onPress={()=>navigation.goBack()}>
						<FontAwesome size={24} name={'close'}/>
					</TouchableOpacity>
					<Text style={styles.style_text_info}>{i18n.t('welcome_user_d')}{user?.Username}</Text>
					<Text style={styles.style_text_info}>{i18n.t('last_coin_d')}{user?.coins}</Text>
				</View>
				<View style={styles.wrapper_dice}>
					<Text style={{textAlign: 'center', fontFamily: 'Montserrat_900Black', fontSize: 22, color: '#d63031'}}>{resultTX} {resultTotal}</Text>
					<View style={{flexDirection: 'row'}}>
						<Dice key={'dice1'} number={dice.dice_1}/>
						<Dice key={'dice2'} number={dice.dice_2}/>
						<Dice key={'dice3'} number={dice.dice_3}/>
					</View>
					<Text style={{textAlign: 'center', marginVertical: scaleSize(16), color: 'black'}}>{`${i18n.t('time_count_down')} ${currentCount}`}</Text>
					{/*<Text style={{textAlign: 'center'}}>{`${i18n.t('total')}: ${resultTotal}`}</Text>*/}
				</View>
				<View style={{alignSelf: 'center', marginTop: scaleSize(16), flexDirection: 'row'}}>
					<View style={{marginEnd: scaleSize(100), alignItems: 'center'}}>
						<TouchableOpacity onPress={()=>minusCoin(1)} style={{flexDirection: 'row', alignItems: 'center'}}>
							<Text>{'Tài'}</Text>
							<FontAwesome name={'arrow-up'}/>
						</TouchableOpacity>
						<Text>{bet.t} coin</Text>
					</View>
					<View style={{marginStart: scaleSize(100), alignItems: 'center'}}>
						<TouchableOpacity onPress={()=>minusCoin(2)} style={{flexDirection: 'row', alignItems: 'center'}}>
							<Text>{'Xỉu'}</Text>
							<FontAwesome name={'arrow-up'}/>
						</TouchableOpacity>
						<Text>{bet.x} coin</Text>
					</View>
				</View>
				<View style={{position: 'absolute', flexDirection: 'row', alignSelf: 'center', bottom: 30}}>
				{BET_ARR.map((item)=>(
					<View style={[styles.current_bet, currentBet===item.value?styles.active_current_bet:null]} key={item.value}>
						<TouchableOpacity onPress={()=>{setCurrentBet(item.value)}}
							style={{width: 30, height: 30, justifyContent: 'center', alignItems: 'center'}}>
							<Image style={{width: 30, height: 30}} source={item.path} resizeMode={'stretch'}/>
						</TouchableOpacity>
					</View>
				))}
			</View>
			{/*</ImageBackground>*/}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	wrapper_dice: {
		alignSelf: 'center',

	},
	style_text_info: {
		color: '#f9314b',
		marginHorizontal: scaleSize(8),
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

	}
})

export default DiceGameScreen;