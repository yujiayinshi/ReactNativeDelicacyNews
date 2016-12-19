/**
 * Created by HuangKai on 2016/12/16.
 */
import {applyMiddleware, createStore, compose} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, autoRehydrate} from 'redux-persist';
import {AsyncStorage} from 'react-native';
import reducers from '../reducers/index';

const logger = store => next => action => {
    if (typeof action === 'function') {
        console.log('dispatching a function');
    } else {
        console.log('dispatching', action);
    }
    let result = next(action);
    console.log('next state', store.getState());
    return result;
};

let middlewares = [
    logger,
    thunk
];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let createAppStore = composeEnhancers(applyMiddleware(...middlewares))(createStore);

export default function configureStore(onComplete: ()=>void) {
    const store = autoRehydrate()(createAppStore)(reducers);
    let opt = {
        storage: AsyncStorage,
        transform: []
    };
    persistStore(store, opt, onComplete);
    return store
};