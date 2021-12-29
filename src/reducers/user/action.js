import * as defines from './defines';
import definesApi from '../../apis/definesApi'

export const createAnonymous = bodyParameters => async dispatch => {
    dispatch({
        type: defines.CREATE_ACTION,
        data: bodyParameters
    })
}
export const plusCoins = bodyParameters => async dispatch => {
    dispatch({
        type: defines.PLUS_COIN_ACTION,
        data: bodyParameters
    })
}
export const minusCoins = bodyParameters => async dispatch => {
    dispatch({
        type: defines.MINUS_COIN_ACTION,
        data: bodyParameters
    })
}