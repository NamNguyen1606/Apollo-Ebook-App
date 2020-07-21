/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Colors from '../../ultils/color';
import {Icon} from 'react-native-elements';
import Route from '../../ultils/router';

interface Props {
  navigation: any;
}

const RegisterScreen: React.FC<Props> = ({navigation}) => {
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
          <Text style={style.titleStyle}>Join Apollo Today!</Text>
          <Text style={style.subTitleStyle}>
            Create an account to start reading
          </Text>
        </View>
      </View>
      <View style={style.middle} />
      <View style={style.footer} />
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flex: 4,
    backgroundColor: Colors.Background,
  },
  middle: {
    flex: 3,
    backgroundColor: 'white',
  },
  footer: {
    flex: 2,
    backgroundColor: 'blue',
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
export default RegisterScreen;
