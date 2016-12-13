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
    TouchableOpacity,
    TextInput
} from 'react-native';

import AV from '../LeanCloud';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.pressHaveAccount = this.pressHaveAccount.bind(this);
        this.pressRegister = this.pressRegister.bind(this);
    }

    pressHaveAccount() {
        if (this.props.navigator) {
            this.props.navigator.pop();
        }
    }

    pressRegister() {
        const user = new AV.User();
        user.setUsername(this.state.username);
        user.setPassword(this.state.password);
        user.signUp().then((user) => {
            this.props.navigator.pop();
        }, (error) => {
            console.log(JSON.stringify(error))
        });
    }

    handleUsername(text) {
        this.setState({
            username: text
        })
    }

    handlePassword(text) {
        this.setState({
            password: text
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerBtn}/>
                    <View style={styles.headerCenter}>
                        <Text style={styles.headerTitle}>注册账号</Text>
                    </View>
                </View>
                <View style={styles.avatarView}/>
                <View style={styles.inputView}>
                    <TextInput placeholder="手机/邮箱" style={styles.textInput} underlineColorAndroid="transparent"
                               onChangeText={this.handleUsername}/>
                    <View style={styles.dividerView}>
                        <View style={styles.divider}/>
                    </View>
                    <TextInput placeholder="密码" style={styles.textInput} secureTextEntry value={this.state.password}
                               underlineColorAndroid="transparent" onChangeText={this.handlePassword}/>
                </View>
                <View style={styles.bottomView}>
                    <View style={styles.buttonView}>
                        <TouchableOpacity onPress={this.pressRegister}>
                            <Text style={styles.loginText}>注册</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottomButtonsView}>
                        <View style={styles.bottomRightView}>
                            <TouchableOpacity
                                onPress={this.pressHaveAccount}>
                                <Text style={styles.bottomBtn}>已有账号</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
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
    inputView: {
        height: 100,
        backgroundColor: '#F5F5F5'
    },
    textInput: {
        flex: 1,
        fontSize: 16,
    },
    avatarView: {
        height: 150,
        backgroundColor: '#ECEDF1',
        justifyContent: 'center'
    },
    avatarImage: {
        height: 100,
        width: 100,
        borderRadius: 100,
        alignSelf: 'center'
    },
    dividerView: {
        flexDirection: 'row'
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#ECEDF1'
    },
    bottomView: {
        backgroundColor: '#ECEDF1',
        flex: 1
    },
    buttonView: {
        backgroundColor: '#1DBAF1',
        margin: 10,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginText: {
        fontSize: 17,
        color: '#FFF',
        marginTop: 10,
        marginBottom: 10
    },
    bottomButtonsView: {
        flexDirection: 'row'
    },
    bottomLeftView: {
        flex: 1,
        height: 50,
        paddingLeft: 10,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    bottomRightView: {
        flex: 1,
        height: 50,
        paddingRight: 10,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    bottomBtn: {
        fontSize: 15,
        color: '#1DBAF1'
    }

};