import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

interface Props {}

const ProfileScreen = () => {
  return (
    <View style={style.container}>
      <Text>Profile</Text>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default ProfileScreen;
