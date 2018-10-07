import React,{Component} from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Login from './Login';
import Regin from './Regin';


var navigation = null;
export default class Index extends Component {
    constructor(props){
            super(props);
            this.state = {
                selectedTab: 'setting'
            };
            navigation = this.props.navigation;
        }
      render() {
        return (
          <View style={styles.container}>
            <Text style={styles.instructions}></Text>
            <TabNavigator
                      tabBarStyle={styles.tab}>
                      <TabNavigator.Item
                          title="注册"
                          selected={this.state.tab=='setting'}
                          onPress={this.props.navigator.navigate('Regin')}
                          renderIcon={()=><Image
                              style={styles.img}
                              source={require('../../img/setting.png')}></Image>}
                          >
                      <Regin />
                      </TabNavigator.Item>
                      <TabNavigator.Item
                          title="登录"
                          selected={this.state.tab=='introduction'}
                          onPress={()=>this.props.navigator.navigate('Regin')}
                          renderIcon={()=><Image
                              style={styles.img}
                              source={require('../../img/person.png')}></Image>}
                          >
                      <Login />
                      </TabNavigator.Item>
             </TabNavigator>
          </View>
        );
      }
    }



    const styles = StyleSheet.create({
      instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
      },
      container: {
            justifyContent: 'center',
            flex: 1
      },
      tab: {
          height: 70,
          backgroundColor: '#222222',
          alignItems: 'center'

      },
      tabText: {
          marginTop: 1,
          color: '#ffffff',
          fontSize: 16
      },
      selectedTabText: {
          marginTop: 1,
          color: '#FFD700',
          fontSize: 16
      },
      img:{
           width:33,
           height:33
      }
});