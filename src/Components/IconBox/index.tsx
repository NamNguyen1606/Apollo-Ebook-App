import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import Colors from '../../Utils/color';

interface Props {
  icon?: 'facebook' | 'twitter' | 'google';
}

const IconBox: React.FC<Props> = ({icon}) => {
  return (
    <View style={style.container}>
      <Icon name={icon} type="font-awesome" size={20} color="white" />
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    height: 50,
    width: 50,
    backgroundColor: Colors.Background,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 1,
  },
});
export default IconBox;
