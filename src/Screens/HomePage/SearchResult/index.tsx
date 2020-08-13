/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Colors from '../../../Utils/color';
import {BookCard} from '../../../Components';
import {Icon} from 'react-native-elements';
import Route from '../../../Utils/router';
import {FlatList} from 'react-native-gesture-handler';
import Book from '../../../Models/book';
import BookApi from '../../../Api/bookApi';
import {useInfiniteQuery} from 'react-query';
import LottieView from 'lottie-react-native';

const Token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVc2VySUQiOiIyNTVFRURGRS05RUNFLTQ3MUItOEFENS1BMjNCRDQzRDA3MTYiLCJVc2VybmFtZSI6ImRhbmdsdW9uZ3RobyIsIkZ1bGxuYW1lIjoixJDhurduZyBMxrDGoW5nIFRo4buNIiwiRW1haWwiOiJkYW5nbHVvbmd0aG9AZ21haWwuY29tIiwiUGFzc3dvcmQiOiJGQkZFQzdFODIxRjRDNDNDQjE2MjcwNDAxNzhENkMwNiIsIkFnZW50SUQiOiJZQk9PSyIsIlN1cHBsaWVySUQiOm51bGwsIkRldmljZVR5cGUiOiJBTkRST0lEIiwiRGV2aWNlTnVtYmVyIjoiMTIzNDU2IiwiTGlicmFyeVBhY2tldElEIjoiIiwiTGlicmFyeVBhY2tldE5hbWUiOiIiLCJleHAiOiIxNTk4MTY2MTQ1In0.z6dP9Wfmhe0G_b_MJhgk2G22pKKf1m1lPpdnWRLNRwE';

interface Props {
  navigation: any;
  route: any;
}

const CategoryResultScreen: React.FC<Props> = ({navigation, route}) => {
  const {title, collectionId} = route.params;

  const loadMore: any = async (key: any, index: number = 0) => {
    const response: any = await BookApi.getCollection(
      collectionId,
      Token,
      index,
      10,
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

  const {
    data,
    isSuccess,
    fetchMore,
    isFetching,
    canFetchMore,
  } = useInfiniteQuery(['collection'], loadMore, {
    cacheTime: 0,
    getFetchMore: (lastGroup: any, allGroups: any) => {
      if (lastGroup.length === 10) {
        return allGroups.length * 10;
      } else {
        return false;
      }
    },
  });

  const onFetch = () => {
    canFetchMore && fetchMore();
  };

  const covertData = () => {
    var result: any[] = [];
    data?.map((item) => {
      item.map((subItem: any) => result.push(subItem));
    });
    return result;
  };

  const onItemPress = (data: Book) =>
    navigation.navigate(Route.DetailBook, {book: data});

  const renderFooter = () => {
    if (isFetching) {
      return (
        <LottieView
          style={style.loading}
          source={require('../../../Asset/Animation/loading.json')}
          autoPlay
          loop
        />
      );
    } else {
      return null;
    }
  };

  return (
    <View style={style.container}>
      <View style={style.header}>
        <Icon
          name="chevron-back"
          type="ionicon"
          color="white"
          size={33}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={style.titleHeader}>{title}</Text>
      </View>
      <View style={style.middle}>
        {isSuccess ? (
          <FlatList
            data={covertData()}
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
            onEndReachedThreshold={0.5}
            onEndReached={onFetch}
            keyExtractor={(item: any, index: any) => `${index}`}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={renderFooter}
          />
        ) : (
          <LottieView
            style={style.loading}
            source={require('../../../Asset/Animation/loading.json')}
            autoPlay
            loop
          />
        )}
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
    justifyContent: 'center',
  },
  titleHeader: {
    fontSize: 22,
    color: Colors.Text,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  counterStyle: {
    fontSize: 18,
    color: 'black',
  },
  quantityStyle: {
    fontSize: 16,
    color: '#5E6162',
  },
  loading: {
    height: 100,
    width: 100,
    alignSelf: 'center',
  },
});
export default CategoryResultScreen;
