/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Dimensions,
  Image,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import {Icon, Input} from 'react-native-elements';
import {Button} from '../../../Components';
import MoneyFormat from '../../../Utils/moneyFormat';
import Colors from '../../../Utils/color';
import ReviewTab from '../ReviewTab';
import SynopsisTab from '../Synopsis';
import {ScrollView} from 'react-native-gesture-handler';
import BookApi from '../../../Api/bookApi';
import Book from '../../../Models/book';
import {SharedElement} from 'react-navigation-shared-element';
import axios from 'axios';

const Token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVc2VySUQiOiIyNTVFRURGRS05RUNFLTQ3MUItOEFENS1BMjNCRDQzRDA3MTYiLCJVc2VybmFtZSI6ImRhbmdsdW9uZ3RobyIsIkZ1bGxuYW1lIjoixJDhurduZyBMxrDGoW5nIFRo4buNIiwiRW1haWwiOiJkYW5nbHVvbmd0aG9AZ21haWwuY29tIiwiUGFzc3dvcmQiOiJGQkZFQzdFODIxRjRDNDNDQjE2MjcwNDAxNzhENkMwNiIsIkFnZW50SUQiOiJZQk9PSyIsIlN1cHBsaWVySUQiOm51bGwsIkRldmljZVR5cGUiOiJBTkRST0lEIiwiRGV2aWNlTnVtYmVyIjoiMTIzNDU2IiwiTGlicmFyeVBhY2tldElEIjoiIiwiTGlicmFyeVBhY2tldE5hbWUiOiIiLCJleHAiOiIxNTk4MTY2MTQ1In0.z6dP9Wfmhe0G_b_MJhgk2G22pKKf1m1lPpdnWRLNRwE';
interface Props {
  navigation: any;
  route: any;
}

const DetailBookScreen: React.FC<Props> = (props) => {
  const {book} = props.route.params;
  console.log(' book detail render' + book.id);
  const [data, setData] = useState(book);
  const [suggestionData, setSuggestionData] = useState(null);
  const [isReview, setIsReview] = useState(false);
  const [img, setImg] = useState(book.imgUrl);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const defaultImg =
    'https://cdn0.iconfinder.com/data/icons/book-and-library/64/Sad-Emotion-Book-512.png';

  const onTabPress = useCallback((value: boolean) => {
    setIsReview(value);
  }, []);
  function onRead() {}
  const showModal = () => setIsModalVisible(!isModalVisible);
  async function getBookInfoData(cancelToken: any, token: any) {
    const response: any = await BookApi.getDetailBook(
      data.id,
      token,
      cancelToken,
    );
    data.page = response.Pages;
    data.authorMore = response.AuthorMore;
    data.publisher = response.Publisher;
    data.subject = response.Subject;
    data.summary = response.Sumarize;
    setData({...data, ...data});
  }

  async function getSuggestionData(cancelToken: any, token: any) {
    const response: any = await BookApi.getSuggestionBooks(
      data.id,
      token,
      cancelToken,
    );
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
    const source = axios.CancelToken.source();
    const loading = (cancelToken: any) => {
      getBookInfoData(cancelToken, Token);
      getSuggestionData(cancelToken, Token);
    };
    loading(source.token);
    return () => {
      source.cancel();
    };
  }, []);
  return (
    <View style = {{flex: 1, backgroundColor: 'white'}}>
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
          <SharedElement id={`item.${book.id}.photo`}>
            <Image
              style={{height: 220, width: 140, borderRadius: 8}}
              resizeMode="cover"
              source={{
                uri: img,
              }}
              onError={() => setImg(defaultImg)}
            />
          </SharedElement>
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
          <TouchableOpacity
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
          </TouchableOpacity>
          <TouchableOpacity
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
          </TouchableOpacity>
        </View>
        {isReview ? (
          <ReviewTab />
        ) : (
            <SynopsisTab data={data} suggestionData={suggestionData} />
        )}
      </View>
    </ScrollView>
    <Modal
       animationType="slide"
       transparent={true}
       visible={isModalVisible}>
       <TouchableWithoutFeedback onPress={showModal}>
       <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center'}}>
        <View style={style.modal}>
          <TouchableOpacity onPress={showModal}>
          <Icon style={{alignSelf: 'flex-end', marginTop: 20, marginRight: 20}} name="close" type="font-awesome" size={20} color="black" />
          </TouchableOpacity>
          <Text style={{alignSelf: 'center', fontSize: 20}}>Review this book</Text>
          <View style={{height: 100, backgroundColor: 'white'}}>
            <Input placeholder="Write a review" multiline={true} scrollEnabled = {true}/>
          </View>
          <Button style={{width: '85%', alignSelf: 'center', marginBottom: 20}} tittle="SUBMIT" onPress={() => {}}/>
        </View>
        </View>
       </TouchableWithoutFeedback>
    </Modal>
    {isReview && <TouchableOpacity onPress={showModal}>
      <View style={style.reviewButton}>
        <Text style={style.reviewTitle}>WRITE A REVIEW</Text>
      </View>
      </TouchableOpacity>}
    </View>
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
    top: 90,
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
    height: 200,
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
  reviewButton: {
    height: 50,
    borderWidth: 1,
    borderColor: Colors.Background,
    borderRadius: 5,
    backgroundColor: 'white',
    justifyContent:'center',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  reviewTitle: {
    fontSize: 16,
    color: Colors.SubText,
    fontWeight: 'bold',
  },
  modal: {
    height: 350,
    width: '90%',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    borderRadius: 20},
});

export default DetailBookScreen;
