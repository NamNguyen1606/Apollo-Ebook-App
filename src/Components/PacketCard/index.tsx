/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, useMemo} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import Colors from '../../Utils/color';
import {TextStyle} from 'react-native';
import MoneyFormat from '../../Utils/moneyFormat';
import {SharedElement} from 'react-navigation-shared-element';
import {useQuery} from 'react-query';
import PacketApi from '../../Api/packetApi';
import BookScrollView from '../BookScrollView';
import Book from '../../Models/book';
import Button from '../Button';

const Token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVc2VySUQiOiIyNTVFRURGRS05RUNFLTQ3MUItOEFENS1BMjNCRDQzRDA3MTYiLCJVc2VybmFtZSI6ImRhbmdsdW9uZ3RobyIsIkZ1bGxuYW1lIjoixJDhurduZyBMxrDGoW5nIFRo4buNIiwiRW1haWwiOiJkYW5nbHVvbmd0aG9AZ21haWwuY29tIiwiUGFzc3dvcmQiOiJGQkZFQzdFODIxRjRDNDNDQjE2MjcwNDAxNzhENkMwNiIsIkFnZW50SUQiOiJZQk9PSyIsIlN1cHBsaWVySUQiOm51bGwsIkRldmljZVR5cGUiOiJBTkRST0lEIiwiRGV2aWNlTnVtYmVyIjoiMTIzNDU2IiwiTGlicmFyeVBhY2tldElEIjoiIiwiTGlicmFyeVBhY2tldE5hbWUiOiIiLCJleHAiOiIxNTk4MTY2MTQ1In0.z6dP9Wfmhe0G_b_MJhgk2G22pKKf1m1lPpdnWRLNRwE';
interface Props {
  packetId: string;
  tittle: string;
  description: string;
  price: number;
  img: string;
  quantity?: number;
  style?: TextStyle;
  data?: any;
  onPressItem: (book: any) => void;
  onPurchasePress: (packetId: any) => void;
}

const PacketCard: React.FC<Props> = (props) => {
  const [img, setImg] = useState(props.img);
  const [isExpand, setIsExpand] = useState(false);
  const [heightAnimated] = useState<any>(new Animated.Value(180));
  const defaultImg =
    'https://cdn0.iconfinder.com/data/icons/book-and-library/64/Sad-Emotion-Book-512.png';

  const loadingBookList = async (key: any, packetId: string) => {
    return await PacketApi.getDetailPacket(Token, packetId);
  };
  const {status, data} = useQuery(['books', props.packetId], loadingBookList);

  function renderListBook() {
    const result = data.Books.map((item): any => {
      return new Book(
        item.Success,
        item.Author,
        item.BookID,
        item.CoverUrl,
        item.FileSize,
        item.Price,
        item.PublishYear,
        item.Title,
        item.TotalBooks,
        item.Sumarize,
      );
    });
    return (
      <View
        style={[
          {height: 450, marginTop: 10},
          isExpand ? {opacity: 1} : {opacity: 0},
        ]}>
        <Button
          style={{width: '100%', height: 50, alignSelf: 'center'}}
          tittle="Purchase"
          onPress={() => props.onPurchasePress(props.packetId)}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 7,
          }}>
          <Text style={{fontSize: 18}}>Book List</Text>
          <Text style={{fontSize: 14, color: Colors.SubText}}>
            {result.length} Books
          </Text>
        </View>
        <BookScrollView
          style={{height: 215}}
          books={result}
          onItemPress={(book) => props.onPressItem(book)}
          onMorePress={() => {}}
        />
      </View>
    );
  }

  const onExpandPress = () => {
    setIsExpand(!isExpand);
    Animated.spring(heightAnimated, {
      toValue: !isExpand ? 500 : 180,
      useNativeDriver: false,
    }).start();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      // onPress={() => props.onPress(props.data)}
      onPress={onExpandPress}>
      <Animated.View
        style={[style.container, props.style, {height: heightAnimated}]}>
        <View style={{height: 180, flexDirection: 'row'}}>
          <View style={style.imgHolder}>
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
          </View>
          <View style={style.detailHolder}>
            <Text numberOfLines={3} style={style.nameStyle}>
              {props.tittle}
            </Text>
            <Text style={style.authorStyle}>{props.description}</Text>
            <Tag
              title={MoneyFormat.VND(props.price)}
              isSoldOut={props.quantity === 0}
            />
          </View>
        </View>
        {status === 'success' && renderListBook()}
      </Animated.View>
    </TouchableOpacity>
  );
};
const style = StyleSheet.create({
  container: {
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
export default React.memo(PacketCard);

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
