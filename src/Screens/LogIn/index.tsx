/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useContext} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import Colors from '../../Utils/color';
import {Icon} from 'react-native-elements';
import Route from '../../Utils/router';
import {TextField, Button, IconBox} from '../../Components';
import StoreData from '../../Utils/storeData';
import AuthApi from '../../Api/authApi';
import {GlobalContext, StoreProviderInterface} from '../../Utils/StoreProvider';
import UserInfo from '../../Models/userInfo';
import {vs, hs, ms} from '../../Utils/Scaling';
interface Props {
  navigation: any;
}

const LoginScreen: React.FC<Props> = ({navigation}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const {userInfo} = useContext<StoreProviderInterface>(GlobalContext);

  async function logIn() {
    dismissKeyboard();
    setIsLogin(true);
    const response: any = await AuthApi.loginByPassword(
      'rv7yjdz10sh0q06362ugd1n4gjpy4b',
      email,
      password,
    );

    if (response.Success) {
      StoreData.setUserInfo(response);
      let userData = new UserInfo(
        response.CustomerID,
        response.Login,
        response.CustomerName,
        response.Email,
        response.Token,
      );
      userInfo?.setData(userData);
      navigation.navigate(Route.HomePage);
    } else {
      Alert.alert('Error', response.Message);
    }
    setIsLogin(false);
  }

  const handleEmail = (val: string) => setEmail(val);
  const handlePassword = (val: string) => setPassword(val);

  const dismissKeyboard = () => Keyboard.dismiss();

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={style.container}>
        <View style={style.header}>
          <View
            style={{
              flex: 1,
              alignItems: 'flex-start',
              marginTop: vs(20),
              marginLeft: hs(15),
            }}>
            <Icon
              name="chevron-back"
              type="ionicon"
              color="white"
              size={33}
              onPress={() => {
                navigation.pop();
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
          <TextField title="Email" icon="envelope" onChangeText={handleEmail} />
          <TextField
            style={{marginTop: vs(15)}}
            title="Password"
            isPassword={true}
            onChangeText={handlePassword}
          />
          <Button
            style={style.btn}
            tittle="LOG IN"
            isDisable={isLogin}
            onPress={logIn}
          />
          <Button
            style={style.btn}
            tittle="REGISTER"
            isReserve={true}
            onPress={() => {
              navigation.navigate(Route.Register);
            }}
          />
        </View>
        <View style={style.footer}>
          <Text
            style={{
              fontSize: ms(14),
              color: Colors.SubText,
              marginTop: vs(15),
            }}>
            Forgot Password?
          </Text>
          <Text
            style={{
              fontSize: ms(14),
              color: '#A4A7A9',
              marginVertical: vs(14),
            }}>
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
    </TouchableWithoutFeedback>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flex: 2.5,
    backgroundColor: Colors.Background,
  },
  middle: {
    flex: 3,
    backgroundColor: 'white',
    marginHorizontal: hs(20),
    marginTop: hs(15),
  },
  footer: {
    flex: 1.8,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  titleStyle: {
    fontSize: ms(24),
    color: Colors.Text,
    fontWeight: '700',
    textAlign: 'center',
  },
  subTitleStyle: {
    fontSize: ms(16),
    color: Colors.Text,
    textAlign: 'center',
  },
  btn: {height: vs(55), marginTop: vs(10)},
});
export default LoginScreen;
