import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

interface Props {}

const DetailPacketScreen = () => {
  return (
    <View style={style.container}>
      <Text>Detail Packet</Text>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default DetailPacketScreen;
