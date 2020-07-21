/* eslint-disable no-sparse-arrays */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextStyle,
} from 'react-native';
import Colors from '../../ultils/color';

interface Props {
  width?: number;
  height?: number;
  tittle?: string;
  isReserve?: boolean;
  style?: TextStyle;
  onPress: () => void;
}

const Button: React.FC<Props> = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={props.onPress}>
      <View
        style={[
          style.container,
          props.style,
          props.isReserve ? {backgroundColor: 'white'} : null,
        ]}>
        <Text
          style={[
            style.titleStyle,
            ,
            props.isReserve ? {color: Colors.SubText} : null,
          ]}>
          {props.tittle}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.Background,
    height: 60,
    width: '100%',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.Background,
  },
  titleStyle: {
    fontSize: 20,
    color: Colors.Text,
  },
});
export default Button;
