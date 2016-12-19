/**
 * Created by HuangKai on 2016/12/15.
 */
import AV from '../LeanCloud';
import * as TYPES from './actionTypes';

export function signUp(userobj) {
    return (dispatch) => {
        const user = new AV.User();
        user.setUsername(userobj.username);
        user.setPassword(userobj.password);
        user.signUp().then((user) => {
            dispatch({
                type: TYPES.SIGN_UP,
                user: user.toJSON()
            });
        }, (error) => {
            alert(JSON.stringify(error));
        });

    }
}

export function login(param) {
    return (dispatch)=>{
        AV.User.logIn(param.username, param.password).then((user) => {
            dispatch({
                type: TYPES.LOGIN,
                user: user.toJSON()
            });
        }, (error) => {
            alert(JSON.stringify(error))
        });
    }
}

export function logout() {
    return (dispatch)=>{
        AV.User.logOut().then(()=>{
            dispatch({
                type: TYPES.LOGOUT
            });
        }, (error) => {
            alert(JSON.stringify(error))
        });
    }
}
