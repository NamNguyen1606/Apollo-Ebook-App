/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Dimensions,
  Image,
  TouchableHighlight,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {Button} from '../../../Components';
import MoneyFormat from '../../../Utils/moneyFormat';
import Colors from '../../../Utils/color';
import ReviewTab from '../ReviewTab';
import SynopsisTab from '../Synopsis';
import {ScrollView} from 'react-native-gesture-handler';
import BookApi from '../../../Api/bookApi';
import Book from '../../../Models/book';

const Token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVc2VySUQiOiIyNTVFRURGRS05RUNFLTQ3MUItOEFENS1BMjNCRDQzRDA3MTYiLCJVc2VybmFtZSI6ImRhbmdsdW9uZ3RobyIsIkZ1bGxuYW1lIjoixJDhurduZyBMxrDGoW5nIFRo4buNIiwiRW1haWwiOiJkYW5nbHVvbmd0aG9AZ21haWwuY29tIiwiUGFzc3dvcmQiOiJGQkZFQzdFODIxRjRDNDNDQjE2MjcwNDAxNzhENkMwNiIsIkFnZW50SUQiOiJZQk9PSyIsIlN1cHBsaWVySUQiOm51bGwsIkRldmljZVR5cGUiOiJBTkRST0lEIiwiRGV2aWNlTnVtYmVyIjoiMTIzNDU2IiwiTGlicmFyeVBhY2tldElEIjoiIiwiTGlicmFyeVBhY2tldE5hbWUiOiIiLCJleHAiOiIxNTk4MTY2MTQ1In0.z6dP9Wfmhe0G_b_MJhgk2G22pKKf1m1lPpdnWRLNRwE';
interface Props {
  navigation: any;
  route: any;
}

const DetailBookScreen: React.FC<Props> = (props) => {
  const {book} = props.route.params;
  const [data, setData] = useState(book);
  const [suggestionData, setSuggestionData] = useState(null);
  const [isReview, setIsReview] = useState(false);
  const [img, setImg] = useState(book.imgUrl);
  const defaultImg =
    'https://cdn0.iconfinder.com/data/icons/book-and-library/64/Sad-Emotion-Book-512.png';

  function onTabPress(value: boolean) {
    setIsReview(value);
  }
  function onRead() {}

  async function getBookInfoData() {
    const response: any = await BookApi.getDetailBook(data.id, Token);
    data.page = response.Pages;
    data.authorMore = response.AuthorMore;
    data.publisher = response.Publisher;
    data.subject = response.Subject;
    setData({...data, ...data});
  }

  async function getSuggestionData() {
    const response: any = await BookApi.getSuggestionBooks(data.id, Token);
    const suggestData = response.map((item): any => {
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
    setSuggestionData(suggestData);
  }
  useEffect(() => {
    getBookInfoData();
    getSuggestionData();
    console.log('effect');
  }, []);
  return (
    <ScrollView style={style.container} showsVerticalScrollIndicator={false}>
      <ImageBackground
        style={style.header}
        resizeMode="cover"
        imageStyle={{opacity: 0.35}}
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
              adjustsFontSizeToFit
              minimumFontScale={0.5}
              numberOfLines={4}>
              {data.title}
            </Text>
            <Text
              adjustsFontSizeToFit
              minimumFontScale={0.5}
              numberOfLines={1}
              style={style.author}>
              by {data.author}
            </Text>
            <Text style={style.author}>Published: {data.publicYear}</Text>
            <Text style={style.price}>{MoneyFormat.VND(data.price)}</Text>
            <Button
              style={{borderRadius: 15, height: 45, width: 120}}
              tittle="READ NOW"
              onPress={onRead}
            />
          </View>
        </View>
      </ImageBackground>
      <View style={style.bottom}>
        <View style={style.tabHolder}>
          <TouchableHighlight
            style={[
              style.tab,
              isReview
                ? {backgroundColor: '#F9FAFC'}
                : {backgroundColor: Colors.Background},
            ]}
            onPress={() => onTabPress(false)}>
            <View>
              <Text
                style={[
                  style.titleTab,
                  isReview ? {color: 'grey'} : {color: 'white'},
                ]}>
                Synopsis
              </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={[
              style.tab,
              !isReview
                ? {backgroundColor: '#F9FAFC'}
                : {backgroundColor: Colors.Background},
            ]}
            onPress={() => onTabPress(true)}>
            <View>
              <Text
                style={[
                  style.titleTab,
                  !isReview ? {color: 'grey'} : {color: 'white'},
                ]}>
                Reviews
              </Text>
            </View>
          </TouchableHighlight>
        </View>
        {isReview ? (
          <ReviewTab />
        ) : (
          <SynopsisTab data={data} suggestionData={suggestionData} />
        )}
      </View>
    </ScrollView>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    height: 215,
    top: 110,
    left: 20,
    flexDirection: 'row',
  },
  bottom: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  tabHolder: {
    height: 45,
    marginTop: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 3,
    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: 5,
    marginBottom: 15,
  },
  tab: {
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  img: {
    width: 140,
    borderRadius: 8,
  },
  detail: {
    marginLeft: 10,
    justifyContent: 'space-between',
    width: Dimensions.get('window').width * 0.56,
  },
  title: {
    fontSize: 20,
    color: '#F6F6F6',
    fontWeight: 'bold',
  },
  titleTab: {
    fontSize: 16,
  },
  author: {
    fontSize: 15,
    color: '#E1E1E1',
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#F6F6F6',
  },
});
export default DetailBookScreen;
