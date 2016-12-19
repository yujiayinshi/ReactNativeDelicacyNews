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
    TextInput,
    Button
} from 'react-native';
import {connect} from 'react-redux';
import Register from './Register';
import AV from '../LeanCloud';
import PostPage from './PostPage';
import {login, logout} from '../actions/user';

class Personal extends Component {
    constructor(props) {
        super(props);
        this.pressNewUser = this.pressNewUser.bind(this);
        this.pressLogin = this.pressLogin.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.pressPostBtn = this.pressPostBtn.bind(this);
        this.pressLogout = this.pressLogout.bind(this);
        this.state = {
            username: '',
            password: ''
        };
    }

    handleUsername(text) {
        this.setState({username: text})
    }

    handlePassword(text) {
        this.setState({password: text})
    }

    pressNewUser() {
        this.props.navigator.push({
            name: 'Register',
            component: Register
        })
    }

    pressLogin() {
        const user = {
            username: this.state.username,
            password: this.state.password
        };
        this.props.dispatch(login(user));
    }

    pressPostBtn() {
        this.props.navigator.push({
            name: 'post',
            component: PostPage
        })
    }

    pressLogout() {
        this.props.dispatch(logout());
    }

    render() {
        const loginView = (
            <View style={styles.dynamicView}>
                <View style={styles.inputView}>
                    <TextInput placeholder="手机/邮箱" style={styles.textInput} underlineColorAndroid="transparent"
                               onChangeText={this.handleUsername}/>
                    <View style={styles.dividerView}>
                        <View style={styles.divider}/>
                    </View>
                    <TextInput placeholder="密码" style={styles.textInput} secureTextEntry
                               underlineColorAndroid="transparent" onChangeText={this.handlePassword}/>
                </View>
                <View style={styles.bottomView}>
                    <TouchableOpacity onPress={this.pressLogin}>
                        <View style={styles.buttonView}>
                            <Text style={styles.loginText}>登录</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.bottomButtonsView}>
                        <View style={styles.bottomLeftView}>
                            <Text style={styles.bottomBtn}>无法登录？</Text>
                        </View>
                        <TouchableOpacity onPress={this.pressNewUser}>
                            <View style={styles.bottomRightView}>
                                <Text style={styles.bottomBtn}>新用户</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerBtn}/>
                    <View style={styles.headerCenter}>
                        <Text style={styles.headerTitle}>我的</Text>
                    </View>
                </View>
                <View style={styles.avatarView}>
                    <Image source={require('../images/chihuo.jpg')} style={styles.avatarImage}/>
                </View>
                {
                    this.props.hasLogin ?
                        (<View style={styles.usernameView}>
                                <Text style={styles.username}>{this.props.user.username}</Text>
                                <View style={styles.postBtn}>
                                    <Button onPress={this.pressPostBtn} title="发帖" style={{top: 5}} color={'#49afcd'}/>
                                </View>
                                <View style={styles.logout}>
                                    <Button onPress={this.pressLogout} title="退出登录" color={'#49afcd'}/>
                                </View>
                            </View>
                            ) : loginView
                }
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
    username: {
        fontSize: 18,
        color: '#2A2A2A'
    },
    postBtn: {
      marginTop: 10
    },
    logout: {
        marginTop: 20
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
    },
    dynamicView: {
        flex: 1
    },
    usernameView: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ECEDF1'
    },
    postBtnView: {
        alignItems: 'center',
        backgroundColor: '#ECEDF1'
    },
    logoutView: {
        alignItems: 'center',
        backgroundColor: '#ECEDF1'
    }

};

function select(store) {
    return {
        hasLogin: store.userStore.hasLogin,
        user: store.userStore.user
    }
}

export default connect(select)(Personal);
