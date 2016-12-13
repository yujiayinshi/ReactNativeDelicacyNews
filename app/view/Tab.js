/**
 * Created by HuangKai on 2016/12/5.
 */
import React, {Component} from 'react';
import {
    Navigator,
    BackAndroid,
    View,
    Image,
    Text
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Home from './Home';
import Suggest from './Suggest';
import Find from './Find';
import Personal from './Personal';

const TAB_ITEM = [{
    id: 'Home',
    name: '首页',
    icon: require('../images/tab/tab_messagecenter_n.png'),
    selectedIcon: require('../images/tab/tab_messagecenter_p.png'),
    contentView: Home
}, {
    id: 'Suggest',
    name: '推荐',
    icon: require('../images/tab/tab_contact_n.png'),
    selectedIcon: require('../images/tab/tab_contact_p.png'),
    contentView: Suggest
}, {
    id: 'Find',
    name: '发现',
    icon: require('../images/tab/tab_discovery_n.png'),
    selectedIcon: require('../images/tab/tab_discovery_p.png'),
    contentView: Find
}, {
    id: 'Mine',
    name: '我的',
    icon: require('../images/tab/tab_myself_n.png'),
    selectedIcon: require('../images/tab/tab_myself_p.png'),
    contentView: Personal
}];

export default class Tab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: TAB_ITEM,
            selectedTab: TAB_ITEM[0].id
        }
    }

    onPress(id) {
        if (id) {
            this.setState({
                selectedTab: id
            });
        }
    }

    renderTabView(option) {
        return (
            <TabNavigator.Item
                key={option.id}
                title={option.name}
                renderIcon={() => <Image source={option.icon} style={styles.tabIcon}/>}
                renderSelectedIcon={() => <Image source={option.selectedIcon} style={styles.tabIcon}/>}
                selected={this.state.selectedTab === option.id}
                onPress={() => this.onPress(option.id)}>
                <option.contentView route={this.props.route} navigator={this.props.navigator}/>
            </TabNavigator.Item>
        );
    }

    render() {
        const items = this.state.items.map((item) => (
            this.renderTabView(item)
        ));

        return (
            <View style={styles.container}>
                <TabNavigator tabBarStyle={styles.tab}>
                    {items}
                </TabNavigator>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    tab: {
        height: 55,
        alignItems: 'center',
        backgroundColor: '#f4f5f6'
    },
    tabIcon: {
        width: 25,
        height: 25
    }
};