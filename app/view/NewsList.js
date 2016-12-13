/**
 * Created by HuangKai on 2016/12/5.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    TouchableHighlight,
    ScrollView,
    ListView
} from 'react-native';
import NewsDetail from './NewsDetail';
import AV from '../LeanCloud';

const WINDOW_WIDTH = Dimensions.get('window').width;

export default class NewsList extends Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: this.ds.cloneWithRows(this.props.data)
        };
        this.renderRow = this.renderRow.bind(this);
        this.pressRow = this.pressRow.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dataSource: this.ds.cloneWithRows(nextProps.data)
        });
    }

    pressRow(row) {
        this.props.navigator.push({
            name: '',
            component: NewsDetail,
            params: {
                row: row
            }
        })
    }

    renderRow(row) {
        return (
            <TouchableHighlight
                underlayColor='#c8c7cc'
                onPress={this.pressRow.bind(this, row)}>
                <View style={styles.row}>
                    <Image style={styles.left} source={{uri: row.img}}/>
                    <View style={styles.right}>
                        <Text style={styles.title} numberOfLines={1}>{row.title}</Text>
                        <Text style={styles.content} numberOfLines={3}>{row.content}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <ListView
                enableEmptySections
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}/>
        );
    }
}

const styles = {
    row: {
        width: WINDOW_WIDTH,
        flexDirection: 'row',
        borderColor: '#d4d4d4',
        borderBottomWidth: 1
    },
    left: {
        width: 80,
        height: 80,
        margin: 10
    },
    right: {
        flex: 1,
        padding: 10,
        paddingLeft: 0
    },
    title: {
        fontSize: 19,
        color: '#656565'
    },
    content: {
        fontSize: 15,
        color: '#656565'
    }
};