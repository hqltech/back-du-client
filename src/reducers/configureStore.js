import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as reducers from './index';
import {baseRequests} from '../apis'

const logger = ({ getState }) => {
    return next => action => {
        return next(action)
    }
}

const rootReducer = combineReducers({
    ...reducers,
});

/* persist redux config */
const persistConfig = {
    key: 'root',
    storage: AsyncStorage, // KeychainStorage for sensitive data and if normal data can use AsyncStorage
    whitelist: [], //Things u want to persist
    blacklist: [], //Things u dont
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const configureStore = () => {
    return createStore(persistedReducer, applyMiddleware(baseRequests, thunkMiddleware, logger));
};
export default configureStore;
export let persist = persistStore(configureStore());