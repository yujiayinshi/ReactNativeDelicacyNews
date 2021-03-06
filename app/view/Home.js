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
import Swiper from 'react-native-swiper';
import NewsList from './NewsList';
import AV from '../LeanCloud';

const WINDOW_WIDTH = Dimensions.get('window').width;
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newsData: [],
            slides: []
        };
        this.getData = this.getData.bind(this);
        this.getSlides = this.getSlides.bind(this);
    }

    getData() {
        const query = new AV.Query('Post');
        query.addDescending('createdAt');
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

    getSlides() {
        const query = new AV.Query('Slide');
        query.addDescending('createdAt');
        query.find().then((results) => {
            const data = results.map((item) => ({
                id: item.id,
                img: item.get('img').url(),
            }));
            this.setState({
                slides: data
            });
        }, (error) => {
            console.log(error);
        });
    }

    componentDidMount() {
        this.getData();
        this.getSlides();
    }

    render() {
        const slides = this.state.slides.map((item) => (
            <Image key={item.img} style={styles.slide} source={{uri: item.img}}/>
        ));
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerBtn}/>
                    <View style={styles.headerCenter}>
                        <Text style={styles.headerTitle}>美食诱惑</Text>
                    </View>
                </View>
                <ScrollView>
                    <Swiper showButtons={false} autoplay height={200} showsPagination>
                        {slides}
                    </Swiper>
                    <NewsList data={this.state.newsData} route={this.props.route} navigator={this.props.navigator}/>
                </ScrollView>
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
        backgroundColor: '#363636',
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