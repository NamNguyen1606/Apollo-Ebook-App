/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import {Rating} from 'react-native-elements';
import Colors from '../../Utils/color';
import FastImage from 'react-native-fast-image';

interface Props {
  tittle: string;
  author: string;
  price: number;
  publishYear: number;
  img: string;
}

const BookCard: React.FC<Props> = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
      <View style={style.container}>
        <View style={style.imgHolder}>
          <FastImage
            style={{
              height: 190,
              width: 107,
            }}
            resizeMode="contain"
            source={{
              uri: props.img,
            }}
          />
        </View>
        <View style={style.detailHolder}>
          <Text numberOfLines={3} style={style.nameStyle}>
            {props.tittle}
          </Text>
          <Text style={style.authorStyle}>{props.author}</Text>
          <Text style={style.priceStyle}>{props.price} VND</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 200,
    width: '100%',
    backgroundColor: 'white',
    borderColor: Colors.SubText,
    borderBottomWidth: 0.3,
  },
  imgHolder: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'white',
  },
  detailHolder: {
    flex: 2.4,
    backgroundColor: 'white',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
  },
  nameStyle: {
    fontSize: 19,
    color: 'black',
    fontWeight: 'bold',
  },
  authorStyle: {
    fontSize: 16,
    color: 'grey',
  },
  priceStyle: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
});
export default BookCard;

const Tag = ({title}) => {
  return (
    <View
      style={{
        backgroundColor: '#61C4C1',
        borderRadius: 3,
        paddingHorizontal: 3,
        marginRight: 5,
      }}>
      <Text style={{fontSize: 14, color: 'white'}}>{title}</Text>
    </View>
  );
};
