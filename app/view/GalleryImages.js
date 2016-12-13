/**
 * Created by HuangKai on 2016/12/9.
 */

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
    NativeModules
} from 'react-native';

export default class GalleryImages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images:[],
            selected: ''
        };
        this.selectImage = this.selectImage.bind(this);
    }

    componentDidMount() {
        CameraRoll.getPhotos({first: 9}).then((data)=>{
            const images = data.edges.map((asset) => asset.node.image);
            this.setState({images: images})
        }, (err)=>{
            console.log(err)
        })
    }

    selectImage(image) {
        this.state.images.forEach((item)=>{
            if (item.uri === image.uri) {
                item.selected = !item.selected;
            }
        });
        this.setState(this.state);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerBtn}/>
                    <View style={styles.headerCenter}>
                        <Text style={styles.headerTitle}>发帖</Text>
                    </View>
                    <View style={styles.rightView}>
                        <Text style={styles.rightText}>下一步</Text>
                    </View>
                </View>
                <ScrollView style={{flex: 1}}>
                    <View style={styles.imageGrid}>
                        {this.state.images.map((image)=>(
                            <TouchableOpacity key={image.uri} onPress={this.selectImage.bind(image.uri)}>
                                <Image source={{uri: image.uri}} style={image.selected ? styles.selectedImage : styles.image}/>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
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
    imageGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    image: {
        width: 100,
        height: 100,
        margin: 4,
    },
    selectedImage: {
        width: 100,
        height: 100,
        margin: 4,
        borderRadius: 5
    }
};