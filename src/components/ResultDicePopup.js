import React, {memo} from 'react';
import {StyleSheet, View} from "react-native";
import {DIALOG_HEIGHT, DIALOG_WIDTH} from "../popups/DiceGamePopup";
import {scaleHeight, scaleSize} from "../utils/scale";
import Text from "./Text";
import * as Animatable from 'react-native-animatable';

const ResultDicePopup = ({countTai = 0, countXiu = 0, result}) => {

	const mainStyle = {
		width: scaleSize(DIALOG_WIDTH)-250,
		height: scaleHeight(DIALOG_HEIGHT),
		left: scaleSize(DIALOG_WIDTH),
	}

	return (
		<View style={[styles.container, mainStyle]}>
			<View style={styles.style_view_row}>
				<View style={styles.style_view_tai}>
					<Text style={{color: 'white'}}>{`Tài: ${countTai}`}</Text>
				</View>
				<View style={styles.style_view_xiu}>
					<Text>{`Xỉu: ${countXiu}`}</Text>
				</View>
			</View>
			<View style={styles.style_flat_list}>
				{Array.isArray(result)&&(
					result.map((it, index)=>(
						<Animatable.View style={{width: '10%', flexDirection: 'row', justifyContent: 'center', margin: scaleSize(2)}} key={index} animation={index + 1 === result.length?'bounce':undefined} useNativeDriver iterationCount={index + 1 === result.length?'infinite':0}>
							<View style={[{flexDirection: 'row', justifyContent: 'center', width: '90%', backgroundColor: 'black', borderRadius: 40}, it - 10 <= 0 &&{backgroundColor: 'white'}]}>
								<Text style={it - 10 > 0 ? styles.text_tai : styles.text_xiu}>{it}</Text>
							</View>
						</Animatable.View>
				)))}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		backgroundColor: '#5C8DD4',
		alignSelf: 'flex-end',
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 9,
		},
		shadowOpacity: 0.48,
		shadowRadius: 11.95,
		elevation: 18,
		borderRadius: 15
		// zIndex: 90000
	},
	style_view_row: {
		flexDirection: 'row',
		alignSelf: 'center',
		marginVertical: scaleSize(16)
	},
	style_view_tai: {
		backgroundColor: 'black',
		borderTopLeftRadius: 10,
		borderBottomLeftRadius: 10,
		flexDirection: 'row',
		justifyContent: 'center',
		paddingHorizontal: scaleSize(16)
	},
	style_view_xiu: {
		backgroundColor: 'white',
		borderTopRightRadius: 10,
		borderBottomRightRadius: 10,
		flexDirection: 'row',
		justifyContent: 'center',
		paddingHorizontal: scaleSize(16)
	},
	style_loop_view_row: {
		flexDirection: "row"
	},
	style_flat_list: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		paddingHorizontal: scaleSize(8)
	},
	text_tai: {
		color: 'white'
	},
	text_xiu: {
		color: 'black',
	}
});

export default memo(ResultDicePopup);