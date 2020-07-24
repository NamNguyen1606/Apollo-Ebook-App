/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import Book from '../../Models/book';

interface Props {
  name: string;
  author: string;
  img: string;
  onPress: (book: Book) => void;
}
const BookProduct: React.FC<Props> = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.65} onPress={() => {
        let book = new Book(props.name, props.author, props.img);
        props.onPress(book);
        }}>
      <View style={style.container}>
        <View style={style.imgHolder}>
          <Image
            style={{flex: 1}}
            resizeMode="contain"
            source={{
              uri: props.img,
            }}
          />
        </View>
        <View style={{height:50, width: 120, justifyContent: 'space-between'}}>
          <Text numberOfLines={2} style={style.nameStyle}>
            {props.name}
          </Text>
          <Text numberOfLines={1} style={style.authorStyle}>
            {props.author}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    height: '100%',
    width: 135,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  imgHolder: {
    height: 180,
    width: 120,
    backgroundColor: 'white',
  },
  nameStyle: {
    fontSize: 14,
    fontWeight: '600',
    color: 'black',
    textAlign: 'center',
    marginTop: 5,
  },
  authorStyle: {
    fontSize: 13,
    color: '#5E6162',
    textAlign: 'center',
  },
});
export default BookProduct;
