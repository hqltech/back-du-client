import * as defines from './defines'

const initState = {
    respones: null,
    listBranches: null,
}

export default function loginReducer(state = initState, action) {
    switch (action.type) {
        case defines.LOGIN_ACTION:
            return { ...state }
        case defines.LOGIN_COMPLETED:
            return { ...state, respones: action.payload }
        case defines.CALL_GET_BRANCHES_COMPLETED:
            return { ...state, listBranches: action.payload }
        default:
            return state
    }
}