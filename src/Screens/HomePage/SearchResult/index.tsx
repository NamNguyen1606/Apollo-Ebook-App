/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import Colors from '../../../Utils/color';
import {BookCard} from '../../../Components';
import {Icon} from 'react-native-elements';
import Route from '../../../Utils/router';
import {FlatList} from 'react-native-gesture-handler';
import Book from '../../../Models/book';
import BookApi from '../../../Api/bookApi';
import {useInfiniteQuery} from 'react-query';

const Token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVc2VySUQiOiIyNTVFRURGRS05RUNFLTQ3MUItOEFENS1BMjNCRDQzRDA3MTYiLCJVc2VybmFtZSI6ImRhbmdsdW9uZ3RobyIsIkZ1bGxuYW1lIjoixJDhurduZyBMxrDGoW5nIFRo4buNIiwiRW1haWwiOiJkYW5nbHVvbmd0aG9AZ21haWwuY29tIiwiUGFzc3dvcmQiOiJGQkZFQzdFODIxRjRDNDNDQjE2MjcwNDAxNzhENkMwNiIsIkFnZW50SUQiOiJZQk9PSyIsIlN1cHBsaWVySUQiOm51bGwsIkRldmljZVR5cGUiOiJBTkRST0lEIiwiRGV2aWNlTnVtYmVyIjoiMTIzNDU2IiwiTGlicmFyeVBhY2tldElEIjoiIiwiTGlicmFyeVBhY2tldE5hbWUiOiIiLCJleHAiOiIxNTk4MTY2MTQ1In0.z6dP9Wfmhe0G_b_MJhgk2G22pKKf1m1lPpdnWRLNRwE';

interface Props {
  navigation: any;
  route: any;
}

const SearchResultScreen: React.FC<Props> = ({navigation, route}) => {
  const {title, collectionId} = route.params;
  const [listIndex, setListIndex] = useState<number>(10);

  const loadMore = async (key: any, index: number = 0) => {
    const response: any = await BookApi.getCollection(
      collectionId,
      Token,
      index,
      5,
      0,
    );
    const newBookData: Book[] = response.map((item: any) => {
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
    return newBookData;
  };

  const {} = useInfiniteQuery(['list'], loadMore, {
    getFetchMore: (lastGroup) => lastGroup.length,
  });

  const onItemPress = (data: Book) =>
    navigation.navigate(Route.DetailBook, {book: data});

  return (
    <View style={style.container}>
      <View style={style.header}>
        <Icon
          name="chevron-back"
          type="ionicon"
          color="white"
          size={33}
          onPress={() => {
            navigation.navigate(Route.Discover);
          }}
        />
        <Text style={style.titleHeader}>{title}</Text>
      </View>
      <View style={style.middle}>
        <FlatList
          data={bookData}
          renderItem={({item}) => (
            <BookCard
              style={{marginTop: 10}}
              key={item.id}
              author={item.author}
              tittle={item.title}
              img={item.imgUrl}
              price={item.price}
              quantity={item.total}
              publishYear={item.publicYear}
              data={item}
              onPress={(data: Book) => onItemPress(data)}
            />
          )}
          keyExtractor={(item: any) => `${item.id}`}
          onEndReached={loadMore}
          onEndReachedThreshold={0.2}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  header: {
    height: 80,
    backgroundColor: Colors.Background,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  middle: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: '#F9F9F9',
  },
  titleHeader: {
    fontSize: 25,
    color: Colors.Text,
    marginLeft: Dimensions.get('window').width / 3 - 25,
  },
  counterStyle: {
    fontSize: 18,
    color: 'black',
  },
  quantityStyle: {
    fontSize: 16,
    color: '#5E6162',
  },
});
export default SearchResultScreen;
