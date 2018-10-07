import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ToastAndroid,
    TextInput
} from 'react-native';

import UserIndex from './UserIndex';
import Regin from './Regin';

var Dimensions = require('Dimensions');
var {width,height} = Dimensions.get('window');


export default class Login extends Component {
    constructor(props){
        super(props);
        this._onChangeUserName = this._onChangeUserName.bind(this);
        this._onChangePassWord = this._onChangePassWord.bind(this);
        this._onUsernameChanged = this._onUsernameChanged.bind(this);
        this.state = {
            userName:"",
            passWord:"",
            loginText:"登录",
            reginText:"注册",
            status:"",
            token:"",
            loginStatus:-1
        };


    }
    _onChangeUserName(inputData){
        this.setState({userName:inputData});
    }
    _onChangePassWord(inputData){
                this.setState({passWord:inputData});
    }
    _onUsernameChanged = (newUsername) => {
            this.username = newUsername;
    }

    _signIn = ()=>{
         this.props.navigation.navigate('UserIndex');
    }

    _redirect = ()=>{
         this.props.navigation.navigate('Regin');
    }

    login =()=>{
        let dataForm ={
            "name": this.state.userName,
            "password": this.state.passWord
        };

        var url = 'http://192.168.111.188:8080/login';
        var opts = {
            method:"POST",
            mode: "cors",
            headers: {
                 "Content-Type": "application/json"
             },
             body: JSON.stringify(dataForm)
            
        };
        fetch(url, opts)
            .then((response) =>{
                console.log(response);
                return response.json();
            })
            .then((json) => {
                if (json.status == 0){
                    this._signIn();
                }else{
                    ToastAndroid.show('登录失败',ToastAndroid.SHORT);
                }
            })
            .catch((e) => {
               console.log(e);
            })
    }

    render() {

        return (
            <View style={styles.container}>
                <Image source={require('../../img/6.png')} style={styles.tgIconStyle}/>
                <TextInput
                    placeholder={'请输入用户名'}
                    autoCapitalize='none'
                    editable={true}//是否可编辑
                    onChangeText={this._onChangeUserName}
                    style={styles.tgTextInputStyle}
                />
                <TextInput
                    placeholder={'请输入密码'}
                    autoCapitalize='none'
                    password={true}
                    editable={true}
                    onChangeText={this._onChangePassWord}
                    style={styles.tgTextInputStyle}
                />
                <View >
                <Text onPress={this._redirect}>{this.state.reginText}</Text>
                </View>
                <TouchableOpacity
                    onPress={this.login}
                >
                    <View style={styles.button}>
                    <Text　style={styles.btText}>{this.state.loginText}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center'
    },

    tgIconStyle:{
        width:80,
        height:80,
        marginTop:60,
        marginBottom:30,
        borderRadius:40,
        borderWidth:1,
        borderColor:'grey'
    },

    tgTextInputStyle:{
        width:width*0.8,
        height:38,
        borderColor: 'lightgrey',
        borderWidth: 1,
        marginBottom:8,
        borderRadius:4,
        textAlign:'left',
        alignSelf:'center'
    },

    tgLoginBtnStyle:{
        height:38,
        width:width*0.8,
        backgroundColor:'#00BB00',
        marginTop:8,
        marginBottom:20,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:4
    },

    tgSettingStyle:{
        flexDirection:'row',
        width:width*0.8,
        fontSize: 20,
        justifyContent:'space-between'
    },

    tgOtherLoginStyle:{
        flexDirection:'row',
        alignItems:'center',
        position:'absolute',
        bottom:width*0.1,
        left:width*0.1
    },

    tgOtherImageStyle:{
        width:40,
        height:40,
        borderRadius:20,
        marginLeft:8
    },

    button: {
        height: 50,
        width: 280,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#58812F',
        marginTop: 20,
    },

    btText: {
        color: '#fff',
        fontSize: 20,
    }
});

