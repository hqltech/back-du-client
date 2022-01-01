import {
	MainAppScreen,
	// SettingScreen,
	HomeScreen,
	DiceGameScreen,
	LotteryGameScreen,
	ChatScreen
} from './index';

const routers = {
	// MainAppScreen: {name: 'MainAppScreen', component: MainAppScreen},

	HomeScreen: {name: 'HomeScreen', component: HomeScreen},
	DiceGameScreen: {name: 'DiceGameScreen', component: DiceGameScreen},
	LotteryGameScreen: {name: 'LotteryGameScreen', component: LotteryGameScreen},
	ChatScreen: {name: 'ChatScreen', component: ChatScreen},
	// SettingScreen: {name: 'SettingScreen', component: SettingScreen},
}

export {routers};