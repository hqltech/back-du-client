import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import {
    persistStore,
    persistReducer
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as reducers from './index';
import { baseRequests } from '../apis'

const logger = ({ getState }) => {
    return next => action => {
        // console.log('will dispatch', action)

        // Call the next dispatch method in the middleware chain.
        const returnValue = next(action)

        // console.log('state after dispatch', getState())

        // This will likely be the action itself, unless
        // a middleware further in chain changed it.
        return returnValue
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
    const store = createStore(persistedReducer, applyMiddleware(baseRequests, thunkMiddleware, logger));
    return store;
};
export default configureStore;
export let persistor = persistStore(configureStore());