import React from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native'
import Animated, {useSharedValue, useAnimatedStyle, useCode, withRepeat, withTiming} from "react-native-reanimated";
import images from "../assets/images";
import {scaleHeight, scaleSize} from "../utils/scale";

const AnimateDice = ({children}) => {

	const rotateValue = useSharedValue(0);
	const rotateValue2 = useSharedValue(360);

	useCode(()=>{
		rotateValue.value = withRepeat(
			withTiming(rotateValue.value+360, {duration: 10000}, (finished, currentValue) => {
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
		rotateValue2.value = withRepeat(
			withTiming(0, {duration: 10000}, (finished, currentValue) => {
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

	const animateStyle = useAnimatedStyle(()=>{
		return{
			transform: [{
				rotate: rotateValue.value + 'deg'
			}]
		}
	})

	const animateStyle2 = useAnimatedStyle(()=>{
		return{

			transform: [{
				rotate: rotateValue2.value + 'deg'
			}]
		}
	})

	return (
		<View style={styles.container}>
			<Animated.View style={[animateStyle]}>
				<ImageBackground style={styles.style_image_bg} source={images.animate_dice_1}/>
			</Animated.View>
			<Animated.Image style={[styles.style_image_bg, styles.style_image_2, animateStyle2]} source={images.animate_dice_2}/>
			{children}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: scaleSize(350),
		height: scaleHeight(350),
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 12,
		},
		shadowOpacity: 0.58,
		shadowRadius: 16.00,
		elevation: 24,
		// borderWidth: 1
	},
	style_image_bg: {
		width: '100%',
		height: '100%',
		resizeMode: 'contain'
	},
	style_image_2: {
		position: 'absolute'
	}
})

export default AnimateDice;