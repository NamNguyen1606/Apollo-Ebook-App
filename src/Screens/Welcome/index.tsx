/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Icon} from 'react-native-elements';
import Colors from '../../Utils/color';
import {Button} from '../../Components';
import Route from '../../Utils/router';
import LottieView from 'lottie-react-native';
import {hs, vs, ms} from '../../Utils/Scaling';
interface Props {
  navigation: any;
}

const WelcomeScreen: React.FC<Props> = ({navigation}) => {
  const onStartBrowsing = () => {
    navigation.navigate(Route.HomePage);
  };

  const onLoginNav = () => {
    navigation.navigate(Route.Login);
  };

  return (
    <View style={style.container}>
      <LottieView source={require('../../Asset/Animation/loading.json')} />
      <View style={style.header}>
        <Icon name="book" type="Feather" size={70} color="white" />
        <Text style={style.tittleStyle}>Apollo</Text>
      </View>
      <View style={style.footer}>
        <Button
          style={{marginBottom: vs(10), height: vs(55)}}
          tittle="LOGIN / REGISTER"
          onPress={onLoginNav}
        />
        <Button
          style={style.btn}
          tittle="START BROWSING"
          isReserve={true}
          onPress={onStartBrowsing}
        />
        <Text style={style.subFooterStyle}>
          by signing up to you agree to our{' '}
          <Text style={style.hightLightStyle}>
            TOS, Privacy Policy, Cookies Policy
          </Text>
        </Text>
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
    flex: 6.5,
    backgroundColor: Colors.Background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 3,
    backgroundColor: 'white',
    marginHorizontal: hs(20),
    marginVertical: vs(20),
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  tittleStyle: {
    fontSize: vs(40),
    fontWeight: 'bold',
    color: 'white',
  },
  subFooterStyle: {
    fontSize: ms(16),
    marginVertical: vs(20),
    color: Colors.SubText,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  hightLightStyle: {
    color: Colors.Background,
    fontSize: ms(15),
    textDecorationLine: 'underline',
  },
  btn: {
    height: vs(55),
  },
});

export default WelcomeScreen;
