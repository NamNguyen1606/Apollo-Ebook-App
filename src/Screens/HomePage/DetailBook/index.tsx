/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Dimensions,
  Image,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {Button} from '../../../Components';
import Book from '../../../Models/book';
import MoneyFormat from '../../../Utils/moneyFormat';

interface Props {
  navigation: any;
  route: any;
}

const DetailBookScreen: React.FC<Props> = (props) => {
  const {book} = props.route.params;
  let data: Book = book;
  const [img, setImg] = useState(data.imgUrl);
  const defaultImg =
    'https://cdn0.iconfinder.com/data/icons/book-and-library/64/Sad-Emotion-Book-512.png';
  return (
    <View style={style.container}>
      <ImageBackground
        style={style.header}
        resizeMode="cover"
        imageStyle={{opacity: 0.45}}
        source={{
          uri: img,
        }}
        onError={() => setImg(defaultImg)}>
        <View style={style.subHeader}>
          <Icon
            name="chevron-back"
            type="ionicon"
            color="white"
            size={33}
            onPress={() => {
              props.navigation.pop();
            }}
          />
          <Icon
            name="cloud-download"
            type="font-awesome"
            color="white"
            size={26}
            onPress={() => {
              props.navigation.pop();
            }}
          />
        </View>
        <View style={style.middle}>
          <Image
            style={style.img}
            resizeMode="cover"
            source={{
              uri: img,
            }}
            onError={() => setImg(defaultImg)}
          />
          <View style={style.detail}>
            <Text
              style={style.title}
              allowFontScaling={true}
              maxFontSizeMultiplier={1}
              minimumFontScale={0.5}
              numberOfLines={4}>
              {data.title}
            </Text>
            <Text style={style.author}>by {data.author}</Text>
            <Text style={style.author}>Published: {data.publicYear}</Text>
            <Text style={style.price}>{MoneyFormat.VND(data.price)}</Text>
            <Button
              style={{borderRadius: 15, height: 45, width: 120}}
              tittle="READ NOW"
              onPress={() => {}}
            />
          </View>
        </View>
      </ImageBackground>
      <View style={style.bottom} />
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: Dimensions.get('window').height * 0.45,
    alignItems: 'flex-start',
    backgroundColor: 'black',
  },
  subHeader: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginTop: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '92%',
  },
  middle: {
    top: 110,
    left: 20,
    flexDirection: 'row',
  },
  bottom: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  img: {
    height: 215,
    width: 140,
    borderRadius: 8,
  },
  detail: {
    marginLeft: 10,
    justifyContent: 'space-between',
    paddingRight: 10,
    width: Dimensions.get('window').width * 0.56,
  },
  title: {
    fontSize: 20,
    color: '#F6F6F6',
    fontWeight: 'bold',
  },
  author: {
    fontSize: 15,
    color: '#E1E1E1',
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#F6F6F6',
  },
});
export default DetailBookScreen;
