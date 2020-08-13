/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Book from '../../../Models/book';
import Colors from '../../../Utils/color';
import {BookScrollView} from '../../../Components';
import BookApi from '../../../Api/bookApi';
import {useQuery} from 'react-query';
import LottieView from 'lottie-react-native';
import Route from '../../../Utils/router';
import {useNavigation} from '@react-navigation/native';
const Token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVc2VySUQiOiIyNTVFRURGRS05RUNFLTQ3MUItOEFENS1BMjNCRDQzRDA3MTYiLCJVc2VybmFtZSI6ImRhbmdsdW9uZ3RobyIsIkZ1bGxuYW1lIjoixJDhurduZyBMxrDGoW5nIFRo4buNIiwiRW1haWwiOiJkYW5nbHVvbmd0aG9AZ21haWwuY29tIiwiUGFzc3dvcmQiOiJGQkZFQzdFODIxRjRDNDNDQjE2MjcwNDAxNzhENkMwNiIsIkFnZW50SUQiOiJZQk9PSyIsIlN1cHBsaWVySUQiOm51bGwsIkRldmljZVR5cGUiOiJBTkRST0lEIiwiRGV2aWNlTnVtYmVyIjoiMTIzNDU2IiwiTGlicmFyeVBhY2tldElEIjoiIiwiTGlicmFyeVBhY2tldE5hbWUiOiIiLCJleHAiOiIxNTk4MTY2MTQ1In0.z6dP9Wfmhe0G_b_MJhgk2G22pKKf1m1lPpdnWRLNRwE';
interface Props {
  data: Book;
  // onSuggestionBook?: (book: any) => void;
}

const SynopsisTab: React.FC<Props> = (props) => {
  const navigation = useNavigation();
  async function getSuggestionData(key: any, token: any) {
    const response: any = await BookApi.getSuggestionBooks(
      props.data.id,
      token,
    );
    const suggestData = response.map((item: any) => {
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
    return suggestData;
  }

  const {data, isSuccess} = useQuery(
    ['suggestion', {Token}],
    getSuggestionData,
    {cacheTime: 0},
  );

  const onSuggestionItemPress = (book: Book) =>
    navigation.push(Route.DetailBook, {book: book});

  return (
    <View style={style.container}>
      <Text style={[style.title, {marginTop: 0}]}>Information</Text>
      <View style={style.bookInfoHolder}>
        <TitleCard title="Publish" data={props.data.publicYear} />
        <TitleCard
          title="Authors"
          data={`${props.data.author}, ${props.data.authorMore} `}
        />
        <TitleCard title="Subject" data={props.data.subject} />
        <TitleCard title="Pages" data={props.data.page} />
      </View>
      <Text style={style.title}>Summary</Text>
      <Text style={style.summaryStyle}>{props.data.summary}</Text>
      <Text style={style.title}>Suggestion</Text>
      {isSuccess ? (
        <BookScrollView
          key={1}
          title="Suggestion"
          books={data}
          onItemPress={(book) => onSuggestionItemPress(book)}
          onMorePress={() => {}}
        />
      ) : (
        <LottieView
          style={style.loadingLottie}
          source={require('../../../Asset/Animation/loading.json')}
          autoPlay
          loop
        />
      )}
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  summaryStyle: {
    fontSize: 16,
    color: Colors.DarkGrey,
    lineHeight: 22,
  },
  bookInfoHolder: {
    borderColor: 'black',
    borderWidth: 0.15,
  },
  subInfoStyleTitle: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'black',
  },
  subInfoStyleData: {
    borderLeftWidth: 0.5,
    borderBottomColor: 'black',
  },
  loadingLottie: {height: 100, width: 100, alignSelf: 'center'},
  title: {
    fontSize: 20,
    color: 'black',
    marginVertical: 10,
  },
});

export default React.memo(SynopsisTab);

interface SubProps {
  title: string;
  data: number | string;
}
const TitleCard: React.FC<SubProps> = (props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          flex: 1,
          backgroundColor: '#EFEFEF',
          textAlign: 'center',
          paddingVertical: 8,
          fontSize: 15,
          color: 'black',
          fontWeight: '600',
        }}>
        {props.title}
      </Text>
      <Text style={{flex: 2, marginLeft: 20, fontSize: 15, color: 'black'}}>
        {props.data}
      </Text>
    </View>
  );
};
