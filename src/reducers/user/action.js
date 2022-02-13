import * as defines from './defines';
import definesApi from '../../apis/definesApi'

export const createAnonymous = bodyParameters => {
    return(dispatch, getState) => {
        dispatch({
            type: defines.CREATE_ACTION,
            data: bodyParameters
        })
    }
}
export const updateUser = bodyParameters => {
    return (dispatch, getState) => {
        const testState = getState()
        const a = testState.userReducer
        console.log('aaaaaaa', bodyParameters)
        console.log('a', a.user)
        if(bodyParameters._id === a.user?._id) {
            console.log('aaaa')
            dispatch({
                type: defines.UPDATE_ACTION,
                data: bodyParameters,
            })
        }
    }
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