import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Colors from '../../Utils/color';

interface Props {
  username: string;
  createdDate: string;
  content: string;
}

const ReviewCard: React.FC<Props> = (props) => {
  return (
    <View style={style.container}>
      <View style={style.header}>
        <Text style={style.name}>{props.username}</Text>
        <Text style={style.dateTime}>{props.createdDate}</Text>
      </View>
      <Text style={style.content}>{props.content}.</Text>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    paddingVertical: 10,
    // borderBottomWidth: 0.3,
    // borderBottomColor: Colors.Background,
    borderTopWidth: 0.3,
    borderTopColor: Colors.Background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    color: 'black',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  dateTime: {
    fontSize: 13,
    color: Colors.SubText,
  },
  content: {
    fontSize: 15,
    color: Colors.DarkGrey,
  },
});
export default ReviewCard;
