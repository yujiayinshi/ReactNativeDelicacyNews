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
    TextInput,
    CameraRoll,
    Picker
} from 'react-native';
import GalleryImages from './GalleryImages';
import ImagePicker from 'react-native-image-picker';
import Tab from './Tab.js'

import AV from '../LeanCloud';
const Post = AV.Object.extend('Post');
const Scene = AV.Object.extend('Scene');

export default class PostPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            avatarSource: '',
            images: [],
            scenes: [],
            scene: ''
        };
        this.handleTitle = this.handleTitle.bind(this);
        this.handleContent = this.handleContent.bind(this);
        this.pressPost = this.pressPost.bind(this);
        this.selectPhoto = this.selectPhoto.bind(this);
        this.getScene = this.getScene.bind(this);
        this.changePicker = this.changePicker.bind(this);
    }

    componentDidMount() {
        this.getScene();
    }

    getScene() {
        const query = new AV.Query('Scene');
        query.addDescending('createdAt');
        query.find().then((results)=>{
            this.setState({
                scenes: results.map((item)=>({
                    id: item.id,
                    name: item.get('name'),
                    value: item.get('value')
                }))
            });
            this.setState({
                scene: results[0].get('value')
            });
        })
    }

    pressPost() {
        const post = new Post();
        if (this.state.title && this.state.content && this.state.image) {
            post.set('title', this.state.title);
            post.set('content', this.state.content);
            post.set('img', this.state.image);
            post.set('sceneValue', this.state.scene);
            post.save().then((post)=>{
                this.props.navigator.replace({
                    name: 'Tab',
                    component: Tab
                })
            }, (error)=>{
                console.error(error.message)
            })
        } else {
            alert('信息不完整！');
        }
    }

    handleTitle(text) {
        this.setState({
            title: text
        })
    }

    handleContent(text) {
        this.setState({
            content: text
        })
    }

    selectPhoto() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };
        ImagePicker.showImagePicker(options, (response)=>{
            if (response.didCancel) {
            } else if (response.error) {
                alert('error');
            } else if (response.customButton) {
                alert('customButton');
            } else {
                const source = {uri: response.uri, isStatic: true};
                this.setState({avatarSource: source});
                this.setState({fileName: response.fileName});
                const file = new AV.File(response.fileName, {blob: response});
                this.setState({image: file});
            }
        });
    }

    changePicker(scene) {
        this.setState({
            scene: scene
        });
    }

    render() {
        const pickers = [];
        this.state.scenes.map((item)=>{
            pickers.push(<Picker.Item label={item.name} value={item.value} key={item.id}/>)
        });
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerBtn}/>
                    <View style={styles.headerCenter}>
                        <Text style={styles.headerTitle}>发帖</Text>
                    </View>
                </View>
                <View style={styles.inputView}>
                    <TextInput placeholder="标题" style={styles.titleInput} underlineColorAndroid="transparent"
                               onChangeText={this.handleTitle} autoFocus/>
                    <View style={styles.dividerView}>
                        <View style={styles.divider}/>
                    </View>
                    <TextInput placeholder="正文" style={styles.contentInput}  multiline={true} numberOfLines={20} textAlignVertical={'top'}
                               underlineColorAndroid="transparent" onChangeText={this.handleContent}/>
                </View>
                <View style={styles.imageView}>
                    <TouchableOpacity onPress={this.selectPhoto} style={styles.avatarImage}>
                        {
                            this.state.avatarSource ? (<Image source={this.state.avatarSource} style={styles.avatarImage}/>)
                                :(<Image source={require('../images/upload.jpg')} style={styles.avatarImage}/>)
                        }
                    </TouchableOpacity>
                </View>
                <View style={styles.bottomView}>
                    <Picker
                    selectedValue={this.state.scene}
                    onValueChange={this.changePicker}>
                        {pickers}
                    </Picker>
                </View>
                <View style={styles.bottomView}>
                    <TouchableOpacity onPress={this.pressPost}>
                        <View style={styles.buttonView}>
                            <Text style={styles.loginText}>发布</Text>
                        </View>
                    </TouchableOpacity>
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
        backgroundColor: 'white',
    },
    titleInput: {
        flex: 1,
        fontSize: 16,
        height: 40,
    },
    contentInput: {
        flex: 1,
        fontSize: 16,
        height: 180,
        alignItems: 'flex-start',
    },
    avatarImage: {
        height: 100,
        width: 100,
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
    },
    imageGrid: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    imageView: {
        marginTop: 20,
        marginBottom: 20
    },
    image: {
        width: 100,
        height: 100,
        margin: 4
    }

};