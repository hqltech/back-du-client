import React, {useEffect, useState} from 'react';
import Animated, {useSharedValue, withSpring, useAnimatedStyle, withTiming, withSequence} from "react-native-reanimated";
import images from "../assets/images";
import {scaleHeight, scaleSize} from "../utils/scale";

const DiceComponent = ({number = Math.floor(Math.random() * 6) + 1}) => {

	const [uri, setUri] = useState(images.dice_1);

	const rotateValue = useSharedValue(0);

	useEffect(()=>{
		setUri(change(number))
		// rotateValue.value = withSequence(
		// 	withTiming(rotateValue.value+90, {duration: 600}),
		// 	withSpring(rotateValue.value+270)
		// );
	},[number]);

	function change (number) {
		switch (number) {
			case 1:
				return images.dice_1
			case 2:
				return images.dice_2
			case 3:
				return images.dice_3
			case 4:
				return images.dice_4
			case 5:
				return images.dice_5
			case 6:
				return images.dice_6
			default:
				return images.dice_1
		}
	}

	const animateStyle = useAnimatedStyle(()=>{
		return{
			transform: [{
				rotate: rotateValue.value + 'deg'
			}]
		}
	})

	return (
		<Animated.Image style={[{
			width: scaleSize(100),
			height: scaleHeight(100),
			margin: scaleSize(16),
			resizeMode: 'contain'
		}]} source={uri}/>
	);
};

const Dice = React.memo(
	DiceComponent,
	(prevProps, nextProps) => prevProps.number === nextProps.number
)

export default Dice;