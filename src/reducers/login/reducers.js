import * as defines from './defines'

const initState = {
    response: null,
    isLoading: false
}

export default function loginReducer(state = initState, action) {
    switch (action.type) {
        case defines.LOGIN_ACTION:
            return { ...state, isLoading: true }
        case defines.LOGIN_COMPLETED:
            return { ...state, response: action.payload, isLoading: false }
        case defines.LOGIN_FAILED:
            return { ...state, response: action.payload, isLoading: false }
        default:
            return state
    }
}