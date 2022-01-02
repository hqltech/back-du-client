import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Platform, TouchableOpacity, TextInput, Keyboard, TouchableWithoutFeedback, ScrollView} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Text from "../components/Text";
import i18n from "../i18n";
import {scaleHeight, scaleSize} from "../utils/scale";
import CheckBox from "../components/CheckBox";
import RBSheet from "react-native-raw-bottom-sheet";
import {Ionicons} from "@expo/vector-icons";
import {pop} from "../navigations";
import ConfirmDialog from "../components/ConfirmDialog";

const LotteryGameScreen = () => {

	const [date, setDate] = useState(new Date());
	const [show, setShow] = useState(Platform.OS === 'ios')

	const domains = [
		{id: 1, name: i18n.t('domain_mb'), value: 'mb'},
		{id: 2, name: i18n.t('domain_mn'), value: 'mn'},
		{id: 3, name: i18n.t('domain_mt'), value: 'mt'},
	]
	const [selectDomain, setSelectDomain] = useState('mb');
	const [selectType, setSelectType] = useState(1);

	const onChangePickDate = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setShow(Platform.OS === 'ios');
		setDate(currentDate);
	};

	const onChangeDomain = useCallback((value) => {
		setSelectDomain(value)
	},[])
	const onChangeType = useCallback((value) => {
		setSelectType(value)
	},[])

	const typePicks = [
		{id: 1, name: 'Đánh lô', value: 1},
		{id: 2, name: '3 càng', value: 2},
		{id: 3, name: 'Đánh đề', value: 3},
		{id: 4, name: 'Đầu đuôi', value: 4},
		{id: 5, name: 'Lô xiên', value: 5},
	]

	const [pickerNumber, setPickerNumber] = useState([])

	const totalMoney = useRef(0)

	const setTotalMoney = (value) => {
		totalMoney.current = value
	}

	const bottomSheetRef = useRef();

	const handleNumericPicker = (arr) => {
		let result = '';
		if(Array.isArray(arr)){
			for(let i = 0; i < arr.length; i++ ) {
				if(arr[i-1] !== undefined){
					result += ' - ' + arr[i]
				} else {
					result += arr[i]
				}
			}
		}
		return result
	};

	useEffect(()=>{

	},[])

	const onChangePickNumber = (value) => {
		let filter = pickerNumber.filter(v=>v!==value)
		if(filter.length === pickerNumber.length){
			setPickerNumber([...pickerNumber, value])
		} else {
			setPickerNumber(filter)
		}
	};

	const isPickerChecked = (value) => {
		let filter = pickerNumber.find(v=>v===value)
		return filter !== undefined
	}

	function addZeroNumber (number) {
		return number - 10 < 0 ? `0${number}`: number
	}

	const ArrayPicker = ({length = 100}) => {
		let i = -1
		return Array.from(Array(length / 10).keys()).map((p)=>{
			return(
				<View style={[styles.style_view_row, {justifyContent: 'space-between'}]} key={p}>
					{Array.from(Array(length / 10).keys()).map((k)=>{
						i++;
						return(
							<TouchPickerNumber active={isPickerChecked(addZeroNumber(i))} value={addZeroNumber(i)} key={i}/>
						)
					})}
				</View>
			)
		});
	};

	const TouchPickerNumber = ({value, active = false}) => {
		return(
			<View style={[styles.style_touch_picker_number, active&&styles.style_touch_picker_number_active]}>
				<TouchableOpacity style={{width: '100%', alignItems: 'center'}} onPress={()=>onChangePickNumber(value)}>
					<Text>{value}</Text>
				</TouchableOpacity>
			</View>
		)
	}
	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View style={styles.container}>
				<View style={styles.style_view_header}>
					<TouchableOpacity onPress={()=>pop()}>
						<Ionicons size={32} name={'ios-arrow-back'}/>
					</TouchableOpacity>
				</View>
				<View style={styles.style_view_main}>
					<View style={styles.style_view_pick_date}>
						{
							Platform.OS !== 'ios' &&(
								<View style={styles.style_btn}>
									<TouchableOpacity style={{width: '100%', alignItems: 'center'}} onPress={()=>setShow(true)}>
										<Text style={{color: 'white'}}>{i18n.t('pick_date')}</Text>
									</TouchableOpacity>
								</View>
							)
						}
						{Platform.OS === 'ios' && (
							<Text style={{fontSize: 16}}>{`${i18n.t('pick_date')}: `}</Text>
						)}
						{show && (
							<View style={{width: scaleSize(220)}}>
								<DateTimePicker
									testID="dateTimePicker"
									value={date}
									mode={'date'}
									is24Hour={true}
									display="default"
									onChange={onChangePickDate}
								/>
							</View>
						)}
						<Text style={{fontSize: 16}}>{`${i18n.t('pick_domain')}: `}</Text>
						<View style={styles.style_view_row}>
							{domains.map(item=>(
								<TouchableOpacity onPress={()=>onChangeDomain(item.value)}
												  style={[styles.style_view_row, styles.style_view_check_box]}>
									<CheckBox checked={item.value===selectDomain}
											  key={item.id} />
									<Text style={{marginStart: scaleSize(3)}}>{item.name}</Text>
								</TouchableOpacity>
							))}
						</View>
					</View>
					<View style={[styles.style_view_row, {marginTop: scaleSize(32), justifyContent: 'space-between'}]}>
						{typePicks.map(item=>(
							<View style={[styles.style_view_base_check_type, item.value===selectType&&styles.style_view_active_check_type]}>
								<TouchableOpacity onPress={()=>onChangeType(item.value)}
												  style={[styles.style_view_row, styles.style_view_check_box]}>
									<CheckBox checked={item.value===selectType}
											  key={item.id} />
									<Text style={{marginStart: scaleSize(5)}}>{item.name}</Text>
								</TouchableOpacity>
							</View>
						))}
					</View>
					<View style={[styles.style_view_row, {marginTop: scaleSize(32)}]}>
						<View>
							<View style={{marginBottom: scaleSize(16)}}>
								<Text style={styles.style_label_text_input}>{i18n.t('pick_number')}</Text>
								<View style={[styles.style_view_row, styles.style_view_text_input]}>
									<TextInput
										style={styles.style_text_input}
										placeholder={'xx'}
										keyboardType={'number-pad'}
										value={handleNumericPicker(pickerNumber)}
										editable={false}
										// multiline
									/>
									<View style={styles.style_label_last_text_input}>
										<TouchableOpacity onPress={()=>bottomSheetRef.current?.open()}>
											<Text>{i18n.t('pick_number')}</Text>
										</TouchableOpacity>
									</View>
								</View>
							</View>
							<View>
								<Text style={styles.style_label_text_input}>{i18n.t('total_money')}</Text>
								<View style={[styles.style_view_row, styles.style_view_text_input]}>
									<TextInput
										keyboardType={'number-pad'}
										style={styles.style_text_input}
										placeholder={'0'}
										onChangeText={setTotalMoney}
									/>
									<View style={styles.style_label_last_text_input}>
										<Text>{'K'}</Text>
									</View>
								</View>
							</View>
						</View>
						<View style={{flex: 1, marginStart: scaleSize(16)}}>
							<Text style={{fontFamily: 'Montserrat_700Bold'}}>{'Luật chơi 2 số'}</Text>
							<Text style={{flexWrap: 'wrap', textAlign: 'justify', lineHeight: 20}}>{i18n.t('luat_lo_2_so')}</Text>
						</View>
					</View>
					<View style={{width: scaleSize(240), backgroundColor: '#EE5A24', borderRadius: 22, marginTop: scaleSize(16)}}>
						<TouchableOpacity style={{width: '100%', alignItems: 'center', paddingVertical: scaleSize(16)}}>
							<Text style={{color: 'white'}}>{i18n.t('confirm')}</Text>
						</TouchableOpacity>
					</View>
				</View>
				<RBSheet
					ref={bottomSheetRef}
					height={300}
					openDuration={250}
					customStyles={{
						container: {
							// justifyContent: "center",
							// alignItems: "center",
							paddingHorizontal: 40,
							borderTopStartRadius: 20,
							borderTopEndRadius: 20,
						}
					}}
				>
					{/*<Text>{i18n.t('luat_lo_2_so')}</Text>*/}
					<ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
						<ArrayPicker/>
					</ScrollView>
				</RBSheet>
				<ConfirmDialog/>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	style_view_header: {
		marginStart: 40,
		marginVertical: scaleSize(16)
	},
	style_view_main: {
		flex: 1,
		marginHorizontal: 40
	},
	style_btn: {
		width: scaleSize(180),
		backgroundColor: '#EE5A24',
		padding: scaleSize(8),
		borderRadius: 180,
		justifyContent: 'center',
		alignItems: 'center',
		height: scaleHeight(70)
	},
	style_view_pick_date: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	style_view_row: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	style_view_check_box: {
		marginHorizontal: scaleSize(16),
		paddingVertical: scaleSize(16)
	},
	style_view_base_check_type: {
		borderWidth: 1.5,
		paddingHorizontal:scaleSize(16),
		paddingVertical: scaleSize(8),
		borderRadius: 8,
		marginHorizontal: scaleSize(8),
		borderColor: '#b2bec3'
	},
	style_view_active_check_type: {
		borderColor: 'red'
	},
	style_label_text_input: {
		fontWeight: '500',
		fontFamily: 'Montserrat_600SemiBold',
		fontSize: 16,
		marginBottom: scaleSize(8)
	},
	style_text_input: {
		paddingVertical: scaleSize(16),
		backgroundColor: 'white',
		width: 375,
		shadowColor: "#000",
		borderWidth: 1,
		borderColor: '#eee',
		paddingStart: scaleSize(16)
	},
	style_view_text_input: {
		width: 450,
	},
	style_label_last_text_input: {
		backgroundColor: '#eee',
		paddingVertical: scaleSize(20),
		width: scaleSize(140),
		alignItems: 'center',
		borderRadius: scaleSize(8),
	},
	style_touch_picker_number: {
		width: scaleSize(86),
		alignItems: 'center',
		height: scaleHeight(80),
		borderWidth: 1,
		justifyContent: 'center',
		marginVertical: scaleSize(8),
		borderRadius: 100
	},
	style_touch_picker_number_active: {
		backgroundColor: '#ff4757',
		borderColor: '#ff4757'
	}
})

export default LotteryGameScreen;