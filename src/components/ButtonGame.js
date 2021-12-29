import React, {useEffect, useRef} from 'react';
import Animated, { useSharedValue, useValue,useAnimatedStyle, withTiming, Easing, useCode, withRepeat } from 'react-native-reanimated';
import {TouchableOpacity, View, StyleSheet, Image} from "react-native";
import Text from "./Text";
import {scaleHeight, scaleSize} from "../utils/scale";
import sizes from "../defines/sizes";
// import {} from 'react-native-redash';

// const {set, concat} = Animated

const ButtonGameComponent = ({
	onPress = () => {},
	source
}) => {

	const animatedValue = useSharedValue(0.4);

	useCode(()=>{
		animatedValue.value = withRepeat(
			withTiming(1, {duration: 2000}, (finished, currentValue) => {
				// if (finished) {
				// 	console.log('current withRepeat value is ' + currentValue);
				// } else {
				// 	console.log('inner animation cancelled');
				// }
			}),
			999999999999999999,
			true,
			(finished) => {

			}
		);
	},[])

	const animationStyle = useAnimatedStyle(() => {
		return{
			opacity: animatedValue.value
		}
	});

	return (
		<Animated.View style={[styles.wrapper, animationStyle]}>
			<TouchableOpacity style={styles.touchOpacity} onPress={onPress}>
				<Image style={styles.style_background} source={source} resizeMode={'contain'}/>
			</TouchableOpacity>
		</Animated.View>
	);
};

const ButtonGame = React.memo(
	ButtonGameComponent,
	(prevProps, nextProps) => prevProps.onPress === nextProps.onPress
)

const styles = StyleSheet.create({
	wrapper: {
		width: 120,
		marginHorizontal: scaleSize(20),
		alignItems: 'center',
		justifyContent: 'center',
		// opacity: 0.2,
	},
	touchOpacity: {
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	style_background: {
		width: '100%',
		height: scaleHeight(200),
		alignItems: 'center',
		justifyContent: 'center',
		resizeMode: 'contain',

	},
	style_text_content: {
		fontFamily: 'Montserrat_900Black',
		fontSize: sizes.title_btn,
		color: '#ffff',
	}
})

export default ButtonGame;