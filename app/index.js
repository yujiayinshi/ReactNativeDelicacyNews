/**
 * Created by HuangKai on 2016/12/16.
 */
import React, {Component} from 'react';
import {Provider} from 'react-redux';

import configureStore from './store/index';
import Main from './Main';

let store = configureStore();

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            store: configureStore(() => {
                this.setState({isLoading: false})
            })
        }
    }

    render() {
        if (this.state.isLoading) {
            console.log('loading app');
            return null;
        }
        return (
            <Provider store={this.state.store}>
                <Main/>
            </Provider>
        )

    }
}