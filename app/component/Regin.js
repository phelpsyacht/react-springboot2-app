import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ToastAndroid,
    AsyncStorage,
    TouchableOpacity,
    TextInput
} from 'react-native';

import UserIndex from './UserIndex';
import Login　from './Login';

var Dimensions = require('Dimensions');
var {width,height} = Dimensions.get('window');

export default class Regin extends Component {
    constructor(props){
        super(props);
        this. _onChangeUserName = this._onChangeUserName.bind(this);
        this._onChangePassWord = this._onChangePassWord.bind(this);
        this._onConfirmPassword = this._onConfirmPassword.bind(this);

        this.state = {
            userName:"",
            passWord:"",
            confirmPassword:'',
            loginText:"登录",
            status:"",
            token:""
        };
        navigation = this.props.navigation;
    }
    _onChangeUserName(inputData){
        this.setState({userName:inputData});
    }
    _onChangePassWord(pw){
                this.setState({passWord:pw});
    }
    _onConfirmPassword = (confirmPw) => {
            this.setState({confirmPassword:confirmPw});
    }

    _signIn = ()=>{
         this.props.navigation.navigate('UserIndex');
    }

    reg=()=>{
        let dataForm ={
            "name": this.state.userName,
            "password": this.state.passWord,
            /*"confirmPassword":this.state.confirmPassword*/
        };

        var url = 'http://192.168.111.188:8080/regin';

        var opts = {
            method:"POST",
            mode: "cors",
            headers: {
                 "Content-Type": "application/json"
             },
             body: JSON.stringify(dataForm)

        };

        if (dataForm.password == this.state.confirmPassword){
            fetch(url, opts)
                .then((response) =>{
                    console.log(response);
                    return response.json();
                })
                .then((json) => {
                    if (json.status == 0){
                        ToastAndroid.show('注册成功',ToastAndroid.SHORT);
                        AsyncStorage.setItem("token", json.result);
                        console.log( AsyncStorage.getItem('token'))
                        this._signIn();
                    }else if(json.status == 2) {
                        ToastAndroid.show('用户名被占用',ToastAndroid.SHORT);
                    }else{
                        ToastAndroid.show('注册失败',ToastAndroid.SHORT);
                    }
                })
                .catch((e) => {
                   console.log(e);
                })
        }else{
            ToastAndroid.show('输入密码不匹配',ToastAndroid.SHORT);
        }

    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../../img/6.png')} style={styles.tgIconStyle}/>
                <TextInput
                    placeholder={'请输入用户名'}
                    autoCapitalize='none'
                    editable={true}//是否可编辑
                    onChangeText={this. _onChangeUserName}//输入框改变触发的函数
                    style={styles.tgTextInputStyle}
                />
                <TextInput
                    placeholder={'请输入密码'}
                    autoCapitalize='none'
                    password={true}
                    editable={true}//是否可编辑
                    onChangeText={this._onChangePassWord}
                    style={styles.tgTextInputStyle}
                />
                <TextInput
                    placeholder={'确认密码'}
                    autoCapitalize='none'
                    password={true}
                    editable={true}//是否可编辑
                    onChangeText={this._onConfirmPassword}
                    style={styles.tgTextInputStyle}
                />

                <View style={styles.tgOtherLoginStyle}>
                    <Text>其他登录方式: </Text>
                    <Image  source={require('../../img/6.png')}  style={styles.tgOtherImageStyle} />
                    <Image  source={require('../../img/6.png')}  style={styles.tgOtherImageStyle} />
                    <Image  source={require('../../img/6.png')}  style={styles.tgOtherImageStyle} />
                </View>
                <TouchableOpacity  disabled={this.state.waiting}
                    onPress={this.reg}
                >
                    <View style={styles.button}>
                        <Text　style={styles.btText}>注册</Text>
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

