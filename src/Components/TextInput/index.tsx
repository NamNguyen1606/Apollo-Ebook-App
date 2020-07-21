import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';

interface Props {
  title: string;
  icon?: 'user' | 'email' | 'password';
  onChangeText: () => void;
}

const TextField: React.FC<Props> = (props) => {
  return (
    <View style={style.container}>
      <TextInput onChangeText={props.onChangeText} />
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default TextField;
