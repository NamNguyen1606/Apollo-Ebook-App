import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Colors from '../../../Utils/color';
import {ReviewCard} from '../../../Components';

interface Props {}

const ReviewTab = () => {
  return (
    <View style={style.container}>
      <View style={style.header}>
        <Text style={style.title}>All Reviews</Text>
        <Text style={style.subTitle}>58 Reviews</Text>
      </View>
      <ReviewCard
        username="John Wick"
        createdDate="28 jun 18"
        content="Very interesting"
      />
      <ReviewCard
        username="Bill Legend"
        createdDate="28 jun 18"
        content="Waiting for next..."
      />
      <ReviewCard
        username="Bill Legend"
        createdDate="28 jun 18"
        content="Waiting for next..."
      />
      <ReviewCard
        username="Bill Legend"
        createdDate="28 jun 18"
        content="Waiting for next..."
      />
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    color: 'black',
  },
  subTitle: {
    fontSize: 15,
    color: Colors.SubText,
  },
});
export default ReviewTab;
