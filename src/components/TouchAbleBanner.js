import {Image, TouchableOpacity, View, StyleSheet} from "react-native";
import React from "react";
import {scaleHeight, scaleSize} from "../utils/scale";

const TouchAbleBannerComponent = ({source, onPress = () => {}}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.style_touch_image} onPress={onPress}>
                <Image style={styles.style_image} resizeMode={'contain'} source={source}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    style_image: {
        width: '100%',
        height: '100%'
    },
    style_touch_image: {
        width: scaleSize(310),
        height: scaleHeight(480)
    }
})

const TouchAbleBanner = React.memo(
    TouchAbleBannerComponent,
    (prevProps, nextProps) => prevProps.onPress === nextProps.onPress
)

export default TouchAbleBanner

