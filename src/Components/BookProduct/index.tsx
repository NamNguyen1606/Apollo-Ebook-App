/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Book from '../../Models/book';
import Colors from '../../Utils/color';
import FastImage from 'react-native-fast-image';

interface Props {
  img: string;
  onPress: (book: Book) => void;
}
const BookProduct: React.FC<Props> = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.65} onPress={() => {
        let book = new Book();
        book.imgUrl = props.img;
        props.onPress(book);
        }}>
      <View style={style.container}>
        <View style={style.imgHolder}>
          <FastImage
             style={{flex: 1}}
             source={{
              uri: props.img,
              priority: "high",
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    height: 210,
    width: 140,
    backgroundColor: 'white',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: Colors.Background,
    marginLeft: 10,
  },
  imgHolder: {
    height: 207,
    width: 135,
    backgroundColor: 'white',
  },
});
export default BookProduct;
