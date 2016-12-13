/**
 * Created by HuangKai on 2016/12/6.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import Tab from './view/Tab';

export default class Splash extends Component {
    componentWillMount() {
        setTimeout(() => {
            this.props.navigator.replace({
                name: 'Tab',
                component: Tab
            });
        }, 1000);
    }

    render() {
        return(
            <View style={styles.container}>
                <Image source={require('./images/hello_page_bg.png')} style={styles.backgroundImage}/>
            </View>
        )
    }
}

const styles = {
    container: {
        flex: 1
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: null,
        height: null,
        backgroundColor: 'transparent',
        resizeMode: 'cover'
    }
};