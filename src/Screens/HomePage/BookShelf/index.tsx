/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, Text, Animated} from 'react-native';
import Colors from '../../../Utils/color';
import {BookCard} from '../../../Components';
import Route from '../../../Utils/router';
import Book from '../../../Models/book';
import BookApi from '../../../Api/bookApi';
import {useInfiniteQuery} from 'react-query';
import LottieView from 'lottie-react-native';

const Token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVc2VySUQiOiIyNTVFRURGRS05RUNFLTQ3MUItOEFENS1BMjNCRDQzRDA3MTYiLCJVc2VybmFtZSI6ImRhbmdsdW9uZ3RobyIsIkZ1bGxuYW1lIjoixJDhurduZyBMxrDGoW5nIFRo4buNIiwiRW1haWwiOiJkYW5nbHVvbmd0aG9AZ21haWwuY29tIiwiUGFzc3dvcmQiOiJGQkZFQzdFODIxRjRDNDNDQjE2MjcwNDAxNzhENkMwNiIsIkFnZW50SUQiOiJZQk9PSyIsIlN1cHBsaWVySUQiOm51bGwsIkRldmljZVR5cGUiOiJBTkRST0lEIiwiRGV2aWNlTnVtYmVyIjoiMTIzNDU2IiwiTGlicmFyeVBhY2tldElEIjoiIiwiTGlicmFyeVBhY2tldE5hbWUiOiIiLCJleHAiOiIxNTk4MTY2MTQ1In0.z6dP9Wfmhe0G_b_MJhgk2G22pKKf1m1lPpdnWRLNRwE';

interface Props {
  navigation: any;
}

const BookShelfScreen: React.FC<Props> = ({navigation}) => {
  const loadMore: any = async (key: any, index: number = 0) => {
    const response: any = await BookApi.getCollection(
      'PurchasedBooks',
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

  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 80);
  const scrollTranslateY = diffClamp.interpolate({
    inputRange: [0, 80],
    outputRange: [0, -80],
    extrapolate: 'clamp',
  });
  const scrollTranslateListY = diffClamp.interpolate({
    inputRange: [0, 80],
    outputRange: [80, 0],
    extrapolate: 'clamp',
  });

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

  const renderItem = ({item}: any) => (
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
  );

  return (
    <View style={style.container}>
      <Animated.View
        style={[
          style.header,
          {
            transform: [{translateY: scrollTranslateY}],
            width: '100%',
            position: 'absolute',
            zIndex: 1,
          },
        ]}>
        <Text style={style.titleHeader}>BookShelf</Text>
      </Animated.View>
      <View style={style.middle}>
        {isSuccess ? (
          <Animated.FlatList
            style={{transform: [{translateY: scrollTranslateListY}]}}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: scrollY}}}],
              {useNativeDriver: true},
            )}
            data={covertData()}
            renderItem={renderItem}
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
    justifyContent: 'center',
    paddingLeft: 10,
    width: '100%',
    position: 'absolute',
    zIndex: 2,
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
});
export default BookShelfScreen;
