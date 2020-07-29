/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {Rating} from 'react-native-elements';
import Colors from '../../Utils/color';
import FastImage from 'react-native-fast-image';
import {TextStyle} from 'react-native';

interface Props {
  tittle: string;
  author: string;
  price: number;
  publishYear: number;
  img: string;
  style?: TextStyle;
}

const BookCard: React.FC<Props> = (props) => {
  const [isUrlError, setIsUrlError] = useState(false);
  const [img, setImg] = useState(props.img);
  const defaultImg =
    'https://cdn0.iconfinder.com/data/icons/book-and-library/64/Sad-Emotion-Book-512.png';
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
      <View style={[style.container, style]}>
        <View style={style.imgHolder}>
          <FastImage
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
    height: 170,
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
