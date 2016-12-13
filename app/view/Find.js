/**
 * Created by HuangKai on 2016/12/5.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    TextInput
} from 'react-native';
import NewsList from './newsList';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import AV from '../LeanCloud';

export default class Find extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newsData: [],
            tabs: [],
            text: '',
            sceneValue: ''
        };
        this.getData = this.getData.bind(this);
        this.searchNews = this.searchNews.bind(this);
        this.getScene = this.getScene.bind(this);
        this.changeTab = this.changeTab.bind(this);
    }

    getScene() {
        const query = new AV.Query('Scene');
        query.addDescending('createdAt');
        query.find().then((results)=>{
            this.setState({
                tabs: results.map((item)=>({
                    id: item.id,
                    name: item.get('name'),
                    value: item.get('value')
                }))
            }, () => {
                this.getData();
            });
        })
    }

    getData() {
        let query = new AV.Query('Post');
        query.addDescending('createdAt');
        const text = this.state.searchText;
        if (text) {
            const titleQuery = new AV.Query('Post');
            titleQuery.contains('title', text);
            const contentQuery = new AV.Query('Post');
            contentQuery.contains('content', text);
            query = AV.Query.or(titleQuery, contentQuery)
        }
        query.equalTo('sceneValue', this.state.sceneValue||this.state.tabs[0].value);
        query.find().then((results) => {
            const data = results.map((item) => ({
                id: item.id,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
                title: item.get('title'),
                content: item.get('content'),
                img: item.get('img').url(),
            }));
            this.setState({
                newsData: data
            });
        }, (error) => {
            console.log(error);
        });
    }

    componentDidMount() {
        this.getScene();
    }

    searchNews(text) {
        this.setState({
            searchText: text
        }, ()=>{
            this.getData()
        });
    }

    changeTab(tab) {
        this.setState({
            sceneValue: this.state.tabs[tab.i].value
        }, ()=>{
            this.getData();
        });
    }

    render() {
        const tabs = [];
        this.state.tabs.map((item) => {
            tabs.push(
                <NewsList tabLabel={item.name} key={item.id} data={this.state.newsData} route={this.props.route}
                          navigator={this.props.navigator}/>
            )
        });
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerBtn}/>
                    <View style={styles.headerCenter}>
                        <Text style={styles.headerTitle}>发现</Text>
                    </View>
                </View>
                <View style={styles.inputView}>
                    <TextInput placeholder="搜索" style={styles.textInput} underlineColorAndroid="transparent"
                               onChangeText={this.searchNews}/>
                </View>
                <ScrollableTabView
                    tabBarUnderlineStyle={{backgroundColor: 'steelblue'}}
                    tabBarActiveTextColor="steelblue"
                    tabBarBackgroundColor="#FFF"
                    onChangeTab={this.changeTab}>
                    {tabs}
                </ScrollableTabView>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        bottom: 5,
    },
    header: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 20,
        height: 68,
        backgroundColor: 'steelblue',
        alignItems: 'center'
    },
    headerBtn: {
        height: 30,
        width: 30
    },
    headerIcon: {
        resizeMode: 'stretch'
    },
    headerCenter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerTitle: {
        fontSize: 18,
        color: 'white'
    },
    inputView: {
        height: 50,
        backgroundColor: '#F5F5F5'
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        lineHeight: 16,
        padding: 5,
        marginLeft: 15,
        marginTop: 10,
        marginRight: 15,
        marginBottom: 10,
        backgroundColor: 'white'
    }
};