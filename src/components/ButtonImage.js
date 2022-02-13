import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native'
import {scaleSize} from "../utils/scale";
const ButtonImageComponent = ({source, onPress=()=>{}, style}) => {
	return (
		<View>
			<TouchableOpacity onPress={onPress}>
				<Image style={[styles.style_image, style]} source={source}/>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	style_image: {
		resizeMode: 'contain',
		width: scaleSize(250)
	}
})

const ButtonImage = React.memo(
	ButtonImageComponent,
)

export default ButtonImage;