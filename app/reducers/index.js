/**
 * Created by HuangKai on 2016/12/16.
 */
import {combineReducers} from 'redux';
import userReducer from './user';

export default combineReducers({
    userStore: userReducer
})