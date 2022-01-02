import { Dimensions } from 'react-native';
const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

export const scaleSize = (size) => size * (
	Math.min(WINDOW_WIDTH / guidelineBaseWidth,
		WINDOW_HEIGHT / guidelineBaseHeight));
export const scaleHeight = (size) =>
	(WINDOW_HEIGHT / guidelineBaseHeight) * size;

export {WINDOW_WIDTH}
export {WINDOW_HEIGHT}