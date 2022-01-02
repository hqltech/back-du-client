import React, {useEffect, useRef} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import Animated, {useSharedValue, useAnimatedStyle, withRepeat, withTiming, useCode} from "react-native-reanimated";
import {scaleSize} from "../utils/scale";

const AnimateText = ({source, win = 0}) => {

	const opacityValue = useSharedValue(1)
	const isFirst = useRef(0);

	useCode(()=>{
		if(isFirst.current !== 0) {
			opacityValue.value = withRepeat(
				withTiming(0.3, {duration: 200}, (finished, currentValue) => {

				}),
				60,
				true,
				(finished) => {}
			);
		}
		isFirst.current = 1
	},[win])
	const animateStyle = useAnimatedStyle(()=>{
		return{
			opacity: opacityValue.value
		}
	})

	return (
		<Animated.Image
			style={[styles.style_source, animateStyle]}
			source={source}
		/>
	);
};

const styles = StyleSheet.create({
	style_source: {
		width: scaleSize(120),
		resizeMode: 'contain'
	}
})

export default AnimateText;