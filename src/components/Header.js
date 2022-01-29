import React from 'react';
import {View, StyleSheet} from "react-native";
import {useSelector} from "react-redux";
import Text from "./Text";
import {scaleSize} from "../utils/scale";

const Header = () => {

	const {user} = useSelector(state => state.userReducer)

	return (
		<View style={styles.container}>
			<Text style={styles.style_name}>{user?.name}</Text>
			<Text style={styles.style_gold}>{'BC: '}{user?.total_gold}</Text>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		margin: scaleSize(16)
	},
	style_name: {
		color: 'white',
		fontFamily: 'Montserrat_600SemiBold',
	},
	style_gold: {
		color: 'yellow'
	}
})

export default Header;