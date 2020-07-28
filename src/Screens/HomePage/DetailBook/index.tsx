import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface Props {
    navigation: any;
}

const DetailBookScreen: React.FC<Props> = (props) => {
  return (
    <View style={style.container}>
      <TouchableOpacity
        onPress={() => {
          props.navigation.pop();
        }}>
        <Text>Detail</Text>
      </TouchableOpacity>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default DetailBookScreen;
