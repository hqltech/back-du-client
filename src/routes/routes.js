import {
	MainAppScreen,
	// SettingScreen,
	// HomeScreen
	ChatScreen
} from './index';

const routers = {
	MainAppScreen: {name: 'MainAppScreen', component: MainAppScreen},
	ChatScreen: {name: 'ChatScreen', component: ChatScreen},
	// HomeScreen: {name: 'HomeScreen', component: HomeScreen},
	// SettingScreen: {name: 'SettingScreen', component: SettingScreen},
}

export {routers};