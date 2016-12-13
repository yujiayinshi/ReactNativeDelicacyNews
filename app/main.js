/**
 * Created by HuangKai on 2016/12/5.
 */
import React, {Component} from 'react';
import {
    Navigator,
    BackAndroid
} from 'react-native';
import Splash from './Splash'

let _navigator;
export default class Main extends Component {

    renderScene(route, navigator) {
        _navigator = navigator;
        let Component = route.component;
        return <Component route={route} navigator={navigator}/>
    }

    render() {
        return (
            <Navigator
                initialRoute={{name: 'Splash', component: Splash}}
                renderScene={this.renderScene}
                configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromRight}/>
        );
    }

}

BackAndroid.addEventListener('hardwareBackPress', function () {
    if (_navigator == null) {
        return false;
    }
    if (_navigator.getCurrentRoutes().length === 1) {
        return false;
    }
    _navigator.pop();
    return true;
});