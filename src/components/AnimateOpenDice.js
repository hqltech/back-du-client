import React from 'react';
import {Image} from 'react-native'
import Animated, {useSharedValue, useAnimatedStyle, useCode, withSpring, withSequence} from "react-native-reanimated";
import {scaleHeight, scaleSize} from "../utils/scale";

const AnimateOpenDice = ({source}) => {

	const animateValue = useSharedValue(0)

	useCode(()=>{

	},[source])

	const animateStyle = useAnimatedStyle(()=>{
		return {

		}
	})

	return (
		<Animated.Image
			source={source}
			style={[styles.style_image, animateStyle]}
		/>
	);
};

const styles = StyleSheet.create({
	style_image: {
		resizeMode: 'contain',
		width: scaleSize(150),
		height: scaleHeight(150)
	}
})

export default AnimateOpenDice;