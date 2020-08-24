/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, Text, Animated} from 'react-native';
import Colors from '../../../Utils/color';
import {BookCard} from '../../../Components';
import {Icon} from 'react-native-elements';
import Route from '../../../Utils/router';
import Book from '../../../Models/book';
import BookApi from '../../../Api/bookApi';
import {useInfiniteQuery} from 'react-query';
import LottieView from 'lottie-react-native';
import {APP_TOKEN} from '../../../Api/axiosClient';
import {vs} from '../../../Utils/Scaling';

interface Props {
  navigation: any;
  route: any;
}

const SearchResultScreen: React.FC<Props> = ({navigation, route}) => {
  const {collection, searchContent} = route.params;
  const loadMore: any = async (key: any, index: number = 0) => {
    const response: any = await BookApi.search(
      APP_TOKEN,
      collection,
      searchContent,
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
  const scrollHeaderTranslateY = diffClamp.interpolate({
    inputRange: [0, vs(70)],
    outputRange: [0, -vs(70)],
    extrapolate: 'clamp',
  });
  const scrollListTranslateY = diffClamp.interpolate({
    inputRange: [0, vs(70)],
    outputRange: [vs(70), 0],
    extrapolate: 'clamp',
  });

  const {
    data,
    isLoading,
    isSuccess,
    fetchMore,
    isFetching,
    canFetchMore,
  } = useInfiniteQuery(['searchResult'], loadMore, {
    cacheTime: 0,
    getFetchMore: (lastGroup: any, allGroups: any) => {
      if (lastGroup.length === 10) {
        return allGroups.length * 10;
      } else {
        return false;
      }
    },
  });

  const renderEmptyAnimation = () => {
    if (!isLoading) {
      if (data![0].length === 0) {
        return (
          <LottieView
            source={require('../../../Asset/Animation/empty_search.json')}
            autoPlay
            loop
          />
        );
      }
    } else {
      return null;
    }
  };

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
      <Animated.View
        style={[
          style.header,
          {transform: [{translateY: scrollHeaderTranslateY}]},
        ]}>
        <Icon
          name="chevron-back"
          type="ionicon"
          color="white"
          size={33}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={style.titleHeader}>{searchContent}</Text>
      </Animated.View>
      <View style={style.middle}>
        {isSuccess ? (
          <Animated.FlatList
            style={{transform: [{translateY: scrollListTranslateY}]}}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {contentOffset: {y: scrollY}},
                },
              ],
              {useNativeDriver: true},
            )}
            data={covertData()}
            renderItem={({item}: any) => (
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
        {!isLoading && renderEmptyAnimation()}
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
    height: vs(70),
    backgroundColor: Colors.Background,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    position: 'absolute',
    width: '100%',
    zIndex: 1,
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
  emptyView: {
    height: '80%',
    width: '80%',
  },
});
export default SearchResultScreen;
