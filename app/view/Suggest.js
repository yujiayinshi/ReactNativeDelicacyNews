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
    TouchableOpacity
} from 'react-native';
import NewsList from './newsList';
import AV from '../LeanCloud';

const WINDOW_WIDTH = Dimensions.get('window').width;

export default class Suggest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newsData: []
        };
        this.getData = this.getData.bind(this);
    }

    getData() {
        const query = new AV.Query('Post');
        query.addDescending('createdAt');
        query.equalTo('recommend', true);
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
        this.getData();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerBtn}/>
                    <View style={styles.headerCenter}>
                        <Text style={styles.headerTitle}>精品推荐</Text>
                    </View>
                </View>
                <NewsList data={this.state.newsData} route={this.props.route} navigator={this.props.navigator}/>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        bottom: 5,
        justifyContent: 'flex-start'
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
    slide: {
        width: WINDOW_WIDTH,
        height: 200,
        resizeMode: 'stretch'
    }
};