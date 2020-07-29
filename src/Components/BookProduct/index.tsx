/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {View, StyleSheet, TouchableOpacity, ImageBackground, Text} from 'react-native';
import Book from '../../Models/book';
import Colors from '../../Utils/color';
import FastImage from 'react-native-fast-image';

interface Props {
  img: string;
  title: string;
  onPress: (book: Book) => void;
}
const BookProduct: React.FC<Props> = (props) => {
  const [isUrlError, setIsUrlError] = useState(false);
  const [img, setImg] = useState(props.img);
  const defaultImg = 'https://cdn0.iconfinder.com/data/icons/book-and-library/64/Sad-Emotion-Book-512.png';
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
              uri: img,
              priority: 'high',
            }}
            resizeMode={FastImage.resizeMode.contain}
            onError={()=> {setIsUrlError(true); setImg(defaultImg);}}
          />
          {isUrlError ?  <View><Text style={style.titleStyle} numberOfLines={2}>{props.title}</Text></View> : undefined}
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
    marginLeft: 10,
    borderWidth: 0.3,
    borderColor: Colors.Background,
  },
  imgHolder: {
    height: 207,
    width: 135,
    backgroundColor: 'white',
  },
  titleStyle:{
    textAlign: 'center',
    fontSize: 14,
    marginHorizontal: 3,
    marginBottom: 5,
  },
});
export default BookProduct;
