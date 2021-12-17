import * as defines from './defines';
import definesApi from '../../apis/definesApi'

export const loginAction = bodyParameters => async dispatch => {
    
    dispatch({
        type: defines.LOGIN_ACTION,
        meta: {
            ...definesApi.login,
            bodyParameters
        }
    })
}
