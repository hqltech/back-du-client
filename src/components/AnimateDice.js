import React from 'react';
import {View, StyleSheet, Image} from 'react-native'
import {scaleHeight, scaleSize} from "../utils/scale";
import * as Animatable from 'react-native-animatable';
import images from "../assets/images";
import Svg, { Circle } from 'react-native-svg';

const AnimateDice = ({children}) => {

	return (
		<View style={styles.container}>
			<Svg viewBox="0 0 100 100" height={scaleHeight(360)} width={scaleSize(360)}>
				<Circle cx="50" cy="50" r="45" stroke="#BBC3B8" strokeWidth="2.5" fill="#36064E" />
			</Svg>
			<Animatable.Image style={styles.style_image_2} source={images.animate_dice_1} animation={'rotate'} easing={'linear'} duration={15000} iterationCount="infinite"/>
			<Animatable.Image style={styles.style_image_2} source={images.animate_dice_2} animation={'rotate'} easing={'linear'} duration={1000} iterationCount="infinite"/>
			{children}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: scaleSize(350),
		height: scaleHeight(350),
		justifyContent: 'center',
		alignItems: 'center',
		// borderWidth: 1
	},
	style_image_2: {
		position: 'absolute',
		width: scaleSize(360),
		height: scaleHeight(360),
		resizeMode: 'contain'
	}
})

export default AnimateDice;