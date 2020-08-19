/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, StyleSheet, TextInput, TextStyle} from 'react-native';
import {Icon} from 'react-native-elements';

interface Props {
  title: string;
  icon?: 'user' | 'envelope' | 'search';
  isPassword?: boolean;
  onChangeText: (val: any) => void;
  onIconPress?: () => void;
  onSubmit?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  style?: TextStyle;
  returnKeyType?:
    | 'done'
    | 'go'
    | 'next'
    | 'search'
    | 'send'
    | 'none'
    | 'previous'
    | 'default'
    | 'google'
    | 'join'
    | 'route'
    | 'yahoo'
    | 'emergency-call'
    | undefined;
}

const TextField: React.FC<Props> = (props) => {
  const [isShowPwd, setIsShowPwd] = useState(true);
  return (
    <View style={[style.container, props.style]}>
      <View style={{flex: 14}}>
        <TextInput
          style={{marginLeft: 15}}
          placeholder={props.title}
          onChangeText={props.onChangeText}
          secureTextEntry={props.isPassword ? isShowPwd : false}
          onFocus={props.onFocus}
          onSubmitEditing={props.onSubmit}
          onBlur={props.onBlur}
          returnKeyType={props.returnKeyType}
        />
      </View>
      <View style={{flex: 1}}>
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
            onPress={props.onIconPress}
          />
        )}
      </View>
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
