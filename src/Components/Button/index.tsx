/* eslint-disable no-sparse-arrays */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import Colors from '../../Utils/color';
import {vs} from '../../Utils/Scaling';

interface Props {
  tittle?: string;
  isReserve?: boolean;
  style?: TextStyle;
  isDisable?: boolean;
  onPress: () => void;
}

const Button: React.FC<Props> = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={props.onPress}
      disabled={props.isDisable}>
      <View
        style={[
          style.container,
          props.style,
          props.isReserve ? {backgroundColor: 'white'} : null,
        ]}>
        {props.isDisable ? (
          <ActivityIndicator size="large" color="white" />
        ) : (
          <Text
            style={[
              style.titleStyle,
              ,
              props.isReserve ? {color: Colors.SubText} : null,
            ]}>
            {props.tittle}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};
const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.Background,
    height: vs(60),
    width: '100%',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.Background,
  },
  titleStyle: {
    fontSize: 18,
    color: Colors.Text,
  },
});
export default Button;
