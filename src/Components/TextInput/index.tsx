/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, StyleSheet, TextInput, TextStyle} from 'react-native';
import {Icon} from 'react-native-elements';

interface Props {
  title: string;
  icon?: 'user' | 'envelope';
  isPassword?: boolean;
  onChangeText: (val: any) => void;
  style?: TextStyle;
}

const TextField: React.FC<Props> = (props) => {
  const [isShowPwd, setIsShowPwd] = useState(true);
  return (
    <View style={[style.container, props.style]}>
      <TextInput
        style={{marginLeft: 15}}
        placeholder={props.title}
        onChangeText={props.onChangeText}
        secureTextEntry={isShowPwd}
      />
      {props.isPassword ? (
        <Icon
          name={isShowPwd ? 'eye-slash' : 'eye'}
          type="font-awesome"
          size={20}
          color="#8C9BA5"
          onPress={() => setIsShowPwd(!isShowPwd)}
        />
      ) : (
        <Icon
          name={props.icon || ''}
          type="font-awesome"
          size={20}
          color="#8C9BA5"
        />
      )}
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    width: '100%',
    borderColor: '#E3E7E9',
    borderWidth: 1,
    borderRadius: 5,
    paddingRight: 10,
  },
});
export default TextField;
