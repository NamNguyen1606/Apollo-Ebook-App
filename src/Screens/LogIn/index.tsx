/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Colors from '../../Utils/color';
import {Icon} from 'react-native-elements';
import Route from '../../Utils/router';
import {TextField, Button, IconBox} from '../../Components';
import AuthApi from '../../Api/authApi';
import AsyncStorage from '@react-native-community/async-storage';
interface Props {
  navigation: any;
}

const LoginScreen: React.FC<Props> = ({navigation}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  async function logIn() {
    console.log(`${email} + ${password}`);
    const response = await AuthApi.loginByPassword(email, password);
    console.log(response);
    // navigation.navigate('HomePage');
  }

  return (
    <View style={style.container}>
      <View style={style.header}>
        <View
          style={{
            flex: 1,
            alignItems: 'flex-start',
            marginTop: 20,
            marginLeft: 15,
          }}>
          <Icon
            name="chevron-back"
            type="ionicon"
            color="white"
            size={33}
            onPress={() => {
              navigation.navigate(Route.Welcome);
            }}
          />
        </View>
        <View style={{flex: 8, justifyContent: 'center'}}>
          <Text style={style.titleStyle}>Welcome Back!</Text>
          <Text style={style.subTitleStyle}>
            Log in with your email & password
          </Text>
        </View>
      </View>
      <View style={style.middle}>
        <TextField
          title="Email"
          icon="envelope"
          onChangeText={(val) => setEmail(val)}
        />
        <TextField
          style={{marginTop: 10}}
          title="Password"
          isPassword={true}
          onChangeText={(val) => setPassword(val)}
        />
        <Button
          style={{height: 55, marginTop: 14}}
          tittle="LOG IN"
          onPress={logIn}
        />
      </View>
      <View style={style.footer}>
        <Text style={{fontSize: 15, color: Colors.SubText, marginTop: 15}}>
          Forgot Password?
        </Text>
        <Text style={{fontSize: 15, color: '#A4A7A9', marginVertical: 25}}>
          Log in With
        </Text>
        <View
          style={{
            width: '60%',
            flexDirection: 'row',
            justifyContent: 'space-around',
            // marginTop: 20,
          }}>
          <IconBox icon="facebook" />
          <IconBox icon="twitter" />
          <IconBox icon="google" />
        </View>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flex: 5,
    backgroundColor: Colors.Background,
  },
  middle: {
    flex: 2.5,
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: 15,
  },
  footer: {
    flex: 2.5,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  titleStyle: {
    fontSize: 25,
    color: Colors.Text,
    fontWeight: '700',
    textAlign: 'center',
  },
  subTitleStyle: {
    fontSize: 16,
    color: Colors.Text,
    textAlign: 'center',
  },
});
export default LoginScreen;
