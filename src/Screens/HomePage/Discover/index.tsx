/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useContext} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Colors from '../../../Utils/color';
import {BookScrollView} from '../../../Components';
import Book from '../../../Models/book';
import Route from '../../../Utils/router';
import {GlobalContext} from '../../../Utils/StoreProvider';

interface Props {
  navigation: any;
  route: any;
}

const DiscoverScreen: React.FC<Props> = (props) => {
  const {bestSellerBook, newBook} = useContext(GlobalContext);

  function onItemPress(book: Book) {
    props.navigation.navigate(Route.DetailBook, {book});
  }

  function renderBookScrollView() {
    return [
      <BookScrollView
        key={1}
        title="New Books"
        books={newBook?.data}
        style={{marginHorizontal: 20}}
        isShowHeader={true}
        onItemPress={(book) => onItemPress(book)}
        onMorePress={() => {
          props.navigation.navigate(Route.ListBook, {
            title: 'New Books',
            collection: 'AllBooks',
            data: newBook,
          });
        }}
      />,
      <BookScrollView
        key={2}
        title="Best Seller"
        books={bestSellerBook?.data}
        style={{marginBottom: 20, marginHorizontal: 20}}
        isShowHeader={true}
        onItemPress={(book) => onItemPress(book)}
        onMorePress={() => {
          props.navigation.navigate(Route.ListBook, {
            title: 'Best Seller',
            collection: 'TopSell',
            data: bestSellerBook,
          });
        }}
      />,
    ];
  }

  return (
    <View style={style.container}>
      <ScrollView style={style.middle} showsVerticalScrollIndicator={false}>
        <View style={style.header}>
          <ImageBackground
            style={style.backgroundStyle}
            source={{
              uri:
                'https://images.creativemarket.com/0.1.0/ps/6374392/300/200/m2/fpc/wm0/rz7tt7epyeamedl02kmk27udgkcpjcltux0kweivmuodculwfbq3roybhxfw7kfq-.jpg?1557575922&s=f9500d0ae1b0e8a3679358049c4ea48f',
            }}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={style.titleHeader}>Discover</Text>
            </View>
          </ImageBackground>
        </View>
        {renderBookScrollView()}
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    height: Dimensions.get('window').height / 10,
    backgroundColor: Colors.Background,
  },
  middle: {
    backgroundColor: 'white',
    width: '100%',
    paddingBottom: 20,
  },
  backgroundStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleHeader: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.Text,
  },
});
export default DiscoverScreen;
