/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import Colors from '../../../Utils/color';
import {BookCard} from '../../../Components';
import Route from '../../../Utils/router';
import Book from '../../../Models/book';
import BookApi from '../../../Api/bookApi';
import {useInfiniteQuery} from 'react-query';
import LottieView from 'lottie-react-native';
import {APP_TOKEN} from '../../../Api/axiosClient';
import {vs} from '../../../Utils/Scaling';

interface Props {
  navigation: any;
}

const BookShelfScreen: React.FC<Props> = ({navigation}) => {
  const loadMore: any = async (key: any, index: number = 0) => {
    const response: any = await BookApi.getCollection(
      'PurchasedBooks',
      APP_TOKEN,
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
    isLoading,
  } = useInfiniteQuery(['bookShelf'], loadMore, {
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

  const renderEmptyAnimation = () => {
    if (!isLoading) {
      if (data![0].length === 0) {
        return (
          <LottieView
            style={style.emptyBox}
            source={require('../../../Asset/Animation/empty_box.json')}
            autoPlay
            loop
          />
        );
      }
    } else {
      return null;
    }
  };

  const renderFooterFlatList = () => {
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

  const renderHeaderFlatList = () => (
    <View style={style.header}>
      <Text style={style.titleHeader}>BookShelf</Text>
    </View>
  );

  const renderItem = ({item}: any) => (
    <BookCard
      style={style.cardProduct}
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
  );

  return (
    <View style={style.container}>
      {isSuccess ? (
        <FlatList
          data={covertData()}
          renderItem={renderItem}
          onEndReachedThreshold={0.5}
          onEndReached={onFetch}
          keyExtractor={(item: any, index: any) => `${index}`}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={renderFooterFlatList}
          ListHeaderComponent={renderHeaderFlatList}
        />
      ) : (
        <LottieView
          style={style.loading}
          source={require('../../../Asset/Animation/loading.json')}
          autoPlay
          loop
        />
      )}
      {renderEmptyAnimation()}
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
  },
  header: {
    height: 70,
    backgroundColor: Colors.Background,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    width: '100%',
  },
  middle: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
  },
  titleHeader: {
    fontSize: 30,
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
  cardProduct: {
    marginHorizontal: 10,
    marginTop: 10,
  },
  emptyBox: {
    top: -vs(85),
    height: 250,
    width: 250,
    alignSelf: 'center',
  },
});
export default BookShelfScreen;
