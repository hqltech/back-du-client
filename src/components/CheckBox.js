import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

const CheckBox = ({checked, onChange = () => {}}) => {

	function onCheckmarkPress() {
		onChange(!checked);
	}

	return (
		<Pressable style={[styles.checkboxBase, checked && styles.checkboxChecked]} onPress={onCheckmarkPress}/>
	);
};

const styles = StyleSheet.create({
	checkboxBase: {
		width: 24,
		height: 24,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 20,
		borderWidth: 2,
		borderColor: 'coral',
		backgroundColor: 'transparent',
	},
	checkboxChecked: {
		backgroundColor: 'coral',
	},
})

export default CheckBox;