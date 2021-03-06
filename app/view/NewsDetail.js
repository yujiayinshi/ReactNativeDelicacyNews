/**
 * Created by HuangKai on 2016/12/5.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    ListView,
    WebView
} from 'react-native';
const WINDOW_WIDTH = Dimensions.get('window').width;
export default class NewsDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgHeight: null
        };
    }

    goback() {
        if (this.props.navigator) {
            this.props.navigator.pop();
        }
    }

    componentDidMount() {
        Image.getSize(this.props.route.params.row.img, (width, height) => {
            this.setState({
                imgHeight: height * WINDOW_WIDTH / width
            })
        })
    }

    render() {
        const row = this.props.route.params.row;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => this.goback()}>
                        <Image source={require('../images/header/back.png')}
                               style={[styles.headerIcon, styles.headerBtn]}/>
                    </TouchableOpacity>
                    <View style={styles.headerCenter}>
                        <Text style={styles.headerTitle}>{row.title}</Text>
                    </View>
                </View>
                <ScrollView style={styles.contentView}>
                    <Image source={{uri: row.img}} style={{flex: 1, width: WINDOW_WIDTH, height: this.state.imgHeight}}/>
                    <Text style={styles.contentText}>
                        {row.content}
                    </Text>
                </ScrollView>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1
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
        height: 40,
        width: 60
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
    content: {
        flex: 1
    },
    contentText: {
        fontSize: 16
    },
    contentView: {
        flex: 1
    }
};