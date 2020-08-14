/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
import Book from '../../Models/book';
import Colors from '../../Utils/color';

interface Props {
  img: string;
  title: string;
  data: Book;
  onPress: (book: Book) => void;
}
const BookProduct: React.FC<Props> = (props) => {
  const [isUrlError, setIsUrlError] = useState(false);
  const [img, setImg] = useState(props.img);
  const defaultImg =
    'https://cdn0.iconfinder.com/data/icons/book-and-library/64/Sad-Emotion-Book-512.png';
  return (
    <TouchableOpacity
      activeOpacity={0.65}
      onPress={() => {
        props.onPress(props.data);
      }}>
      <View style={style.container}>
        <View style={style.imgHolder}>
          <Image
            style={[
              style.imgHolder,
              isUrlError ? {height: 160} : {height: 207},
            ]}
            source={{
              uri: img,
            }}
            resizeMode="contain"
            onError={() => {
              setIsUrlError(true);
              setImg(defaultImg);
            }}
          />
          {isUrlError ? (
            <View>
              <Text style={style.titleStyle} numberOfLines={3}>
                {props.title}
              </Text>
            </View>
          ) : undefined}
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
    // borderWidth: 0.3,
    // borderRadius: 10,
  },
  imgHolder: {
    height: 207,
    width: 135,
    backgroundColor: 'white',
    borderRadius: 1.5,
  },
  titleStyle: {
    textAlign: 'center',
    fontSize: 14,
    marginHorizontal: 3,
    marginBottom: 5,
    color: Colors.DarkGrey,
  },
});
export default BookProduct;
