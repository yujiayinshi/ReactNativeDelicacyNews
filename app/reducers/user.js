/**
 * Created by HuangKai on 2016/12/15.
 */
import * as TYPES from '../actions/actionTypes';

const initialState = {
    hasLogin: false,
    user: {}
};

export default function user(state=initialState, action) {
    switch (action.type) {
        case TYPES.SIGN_UP:
            return {
                ...state,
                user: action.user,
                hasLogin: true
            };

        case TYPES.LOGIN:
            return {
                ...state,
                user: action.user,
                hasLogin: true
            };
        case TYPES.LOGOUT:
            return {
                ...state,
                user: {},
                hasLogin: false
            };
        default:
            return state;
    }
}