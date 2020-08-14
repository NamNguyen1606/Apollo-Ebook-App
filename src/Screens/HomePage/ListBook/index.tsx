/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Dimensions, Animated} from 'react-native';
import Colors from '../../../Utils/color';
import {BookCard} from '../../../Components';
import {Icon} from 'react-native-elements';
import Route from '../../../Utils/router';
import Book from '../../../Models/book';
import BookApi from '../../../Api/bookApi';
import LottieView from 'lottie-react-native';

interface Props {
  navigation: any;
  route: any;
}

const ListBookScreen: React.FC<Props> = ({navigation, route}) => {
  const {title, collection, data} = route.params;
  const [bookData, setBookData] = useState(() => data);
  const [index, setIndex] = useState(10);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 80);
  const scrollHeaderTranslateY = diffClamp.interpolate({
    inputRange: [0, 80],
    outputRange: [0, -80],
    extrapolate: 'clamp',
  });
  const scrollListTranslateY = diffClamp.interpolate({
    inputRange: [0, 80],
    outputRange: [80, 0],
    extrapolate: 'clamp',
  });

  async function loadMore() {
    setIndex(index + 5);
    setIsLoading(!isLoading);
    const response: any = await BookApi.getAll(
      collection,
      index,
      5,
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVc2VySUQiOiIyNTVFRURGRS05RUNFLTQ3MUItOEFENS1BMjNCRDQzRDA3MTYiLCJVc2VybmFtZSI6ImRhbmdsdW9uZ3RobyIsIkZ1bGxuYW1lIjoixJDhurduZyBMxrDGoW5nIFRo4buNIiwiRW1haWwiOiJkYW5nbHVvbmd0aG9AZ21haWwuY29tIiwiUGFzc3dvcmQiOiJGQkZFQzdFODIxRjRDNDNDQjE2MjcwNDAxNzhENkMwNiIsIkFnZW50SUQiOiJZQk9PSyIsIlN1cHBsaWVySUQiOm51bGwsIkRldmljZVR5cGUiOiJBTkRST0lEIiwiRGV2aWNlTnVtYmVyIjoiMTIzNDU2IiwiTGlicmFyeVBhY2tldElEIjoiIiwiTGlicmFyeVBhY2tldE5hbWUiOiIiLCJleHAiOiIxNTk4MTY2MTQ1In0.z6dP9Wfmhe0G_b_MJhgk2G22pKKf1m1lPpdnWRLNRwE',
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
    setBookData([...bookData, ...newBookData]);
    setIsLoading(!isLoading);
  }

  const renderFooter = () => {
    if (isLoading) {
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

  const onItemPress = (data: Book) =>
    navigation.navigate(Route.DetailBook, {book: data});

  useEffect(() => {}, [bookData]);
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
            navigation.navigate(Route.Discover);
          }}
        />
        <Text style={style.titleHeader}>{title}</Text>
      </Animated.View>
      <View style={style.middle}>
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
          data={bookData}
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
          keyExtractor={(item: any) => `${item.id}`}
          onEndReached={loadMore}
          onEndReachedThreshold={0.2}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={renderFooter}
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
    position: 'absolute',
    width: '100%',
    zIndex: 1,
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
  loading: {
    height: 100,
    width: 100,
    alignSelf: 'center',
  },
});
export default ListBookScreen;
