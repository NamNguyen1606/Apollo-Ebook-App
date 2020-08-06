/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import Colors from '../../Utils/color';
import {TextStyle} from 'react-native';
import MoneyFormat from '../../Utils/moneyFormat';
import Book from '../../Models/book';
import {SharedElement} from 'react-navigation-shared-element';

interface Props {
  tittle: string;
  author: string;
  price: number;
  publishYear: number;
  img: string;
  quantity: number;
  style?: TextStyle;
  data: Book;
  onPress: (book: Book) => void;
}

const BookCard: React.FC<Props> = (props) => {
  const [img, setImg] = useState(props.img);
  const defaultImg =
    'https://cdn0.iconfinder.com/data/icons/book-and-library/64/Sad-Emotion-Book-512.png';
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => props.onPress(props.data)}>
      <View style={[style.container, props.style]}>
        <View style={style.imgHolder}>
          <SharedElement id={`item.${props.data.id}.photo`}>
            <Image
              style={{
                height: 175,
                width: 115,
              }}
              resizeMode="contain"
              source={{
                uri: img,
              }}
              onError={() => {
                setImg(defaultImg);
              }}
            />
          </SharedElement>
        </View>
        <View style={style.detailHolder}>
          <Text numberOfLines={3} style={style.nameStyle}>
            {props.tittle}
          </Text>
          <Text style={style.authorStyle}>{props.author}</Text>
          <Tag
            title={MoneyFormat.VND(props.price)}
            isSoldOut={props.quantity === 0}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 180,
    width: '100%',
    backgroundColor: 'white',
    borderColor: Colors.SubText,
    borderBottomWidth: 0.3,
    paddingRight: 10,
  },
  imgHolder: {
    height: 165,
    width: 115,
    marginRight: 10,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'white',
  },
  detailHolder: {
    flex: 2.4,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 10,
    paddingBottom: 30,
  },
  nameStyle: {
    fontSize: 19,
    color: Colors.DarkGrey,
    fontWeight: 'normal',
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

interface TagProps {
  title: string;
  isSoldOut: boolean;
}
const Tag: React.FC<TagProps> = (props) => {
  return (
    <View
      style={{
        backgroundColor: props.isSoldOut ? '#E85147' : Colors.Background,
        borderRadius: 3,
        paddingHorizontal: 5,
        paddingVertical: 3,
        marginRight: 10,
      }}>
      <Text style={{fontSize: 15, color: 'white', fontWeight: 'bold'}}>
        {props.isSoldOut ? 'Sold Out' : props.title}
      </Text>
    </View>
  );
};
