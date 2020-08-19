/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Icon} from 'react-native-elements';
import Colors from '../../Utils/color';
import {Button} from '../../Components';
import Route from '../../Utils/router';
import LottieView from 'lottie-react-native';
interface Props {
  navigation: any;
  route: any;
}

const WelcomeScreen: React.FC<Props> = ({navigation, route}) => {
  const {newBookData, bestSellerData, categoryData} = route.params;

  const onStartBrowsing = () => {
    navigation.navigate(Route.HomePage, {
      newBookData: newBookData,
      bestSellerData: bestSellerData,
      categoryData: categoryData,
    });
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
          style={{marginBottom: 10}}
          tittle="LOGIN / REGISTER"
          onPress={onLoginNav}
        />
        <Button
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
    flex: 7,
    backgroundColor: Colors.Background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 3,
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  tittleStyle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
  subFooterStyle: {
    fontSize: 15,
    marginVertical: 20,
    color: Colors.SubText,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  hightLightStyle: {
    color: Colors.Background,
    fontSize: 15,
    textDecorationLine: 'underline',
  },
});

export default WelcomeScreen;
