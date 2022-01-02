import * as defines from './defines'

const initState = {
    response: null,
    isLoading: false,
    user: {Username: `Test#${Math.floor(Math.random() * 10000) + 1}`, coins: 1000}
}

export default function userReducer(state = initState, action) {
    // console.log('', action.data)
    switch (action.type) {
        case defines.CREATE_ACTION:
            return { ...state, user: action.data }
        case defines.MINUS_COIN_ACTION:
            return { ...state, user: action.data }
        case defines.PLUS_COIN_ACTION:
            return { ...state, user: action.data }
        default:
            return state
    }
}