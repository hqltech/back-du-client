import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { environmentConfig, responseStatus } from '../apis';

const apiMiddleware = ({ dispatch }) => next => action => {
    const result = Array.isArray(action) ? action.filter(Boolean).map(dispatch) : next(action)
    if (!action.meta) {
        return result
    }

    const { uri, method = 'POST', bodyParameters, hasToken } = action.meta;
    if (!uri) {
        throw new Error(`'path' not specified for async action ${action.type}`)
    }

    // let url = `${environmentConfig.API_ENVIRONMENT_URL}${uri}`;

    return callService(uri, method, bodyParameters, hasToken)
        .then((response) => {
            next({
                type: `${action.type}_COMPLETED`,
                payload: response,
                meta: action.meta,
            })
            return response
        }).catch((error) => {
            console.log(`${action.type}_FAILED`)
            next({
                type: `${action.type}_FAILED`,
                payload: error,
                meta: action.meta,
            })
            console.log('Error callService:' + error);
            return error
        });
};

export default apiMiddleware;

export async function callService(uri, method, bodyParameters, hasToken) {
    // console.log(hasToken);
    // console.log(url);
    let url = `${environmentConfig.API_ENVIRONMENT_URL}${uri}`;
    console.log('URL', url)
    try {
        let authentication_token
        if (hasToken) {
            authentication_token = await AsyncStorage.getItem('key');
        }
        let headers = !hasToken ? { 'Content-Type': 'application/json;charset=UTF-8' } : { 'Content-Type': 'application/json;charset=UTF-8', Authorization: `Bearer ${authentication_token}` }
        let configAxios
        configAxios = {
            url,
            method,
            headers,
            data: bodyParameters,
            timeout: environmentConfig.TIME_OUT
        }

        return new Promise((resolve, reject) => {
            axios(configAxios)
                .then((response) => {
                    if (response.status === responseStatus.SUCCESS && response.data === '') {
                        return handleResponseSuccess({ status: 200, data: { statusRequest: 200 } }, resolve);
                    }
                    return handleResponseSuccess(response, resolve);
                }).catch((error) => {
                    return handleResponseFail(error, reject);
                });
        });
    } catch (error) {
        console.log('Error :' + error);
    }
}


const handleResponseSuccess = (response, resolve) => {
    switch (response.status) {
        case responseStatus.SUCCESS:
            return resolve(response.data)
        default:
            break;
    }
}

const handleResponseFail = (error, reject) => {
    const status = error.response ? error.response.status : error.status
    switch (status) {
        case responseStatus.TOKEN_EXPIRED:
        case responseStatus.NOT_CONNECT:
        case responseStatus.FILE_NOT_FOUND:
        case responseStatus.REQUEST_TIMEOUT:
            return reject(error)
        default:
            return reject(error)
    }
}