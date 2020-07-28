/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ScrollView,
  ImageBackground,
} from 'react-native';
import Colors from '../../../Utils/color';
import {BookScrollView} from '../../../Components';
import Book from '../../../Models/book';

interface Props {
  navigation: any;
}

const BookshelfScreen: React.FC<Props> = (props) => {
  function onItemPress(book: Book) {
    alert(`${book.name} \n ${book.author}`);
  }
  return (
    <ScrollView style={style.container}>
      <View style={style.header}>
        <ImageBackground
          style={{flex: 1}}
          source={{
            uri:
              'https://images.creativemarket.com/0.1.0/ps/6374392/300/200/m2/fpc/wm0/rz7tt7epyeamedl02kmk27udgkcpjcltux0kweivmuodculwfbq3roybhxfw7kfq-.jpg?1557575922&s=f9500d0ae1b0e8a3679358049c4ea48f',
          }}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={style.titleHeader}>BookShelf</Text>
          </View>
        </ImageBackground>
      </View>
      <View style={style.middle}>
        {/* <BookScrollView
          title="Trending Now"
          books={Data.bookList}
          onItemPress={(book) => onItemPress(book)}
          onMorePress={() => {
            () => {
              props.navigation.navigate('BookShelf_More');
            };
          }}
        />
        <BookScrollView
          title="Sale"
          books={Data.bookList}
          onItemPress={(book) => onItemPress(book)}
          onMorePress={() => {
            () => {
              props.navigation.navigate('BookShelf_More');
            };
          }}
        /> */}
      </View>
    </ScrollView>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: Dimensions.get('window').height / 5,
    backgroundColor: Colors.Background,
  },
  middle: {
    flex: 1,
    backgroundColor: 'white',
  },
  category: {
    flex: 1.5,
    marginHorizontal: 10,
    paddingBottom: 30,
  },
  titleHeader: {
    fontSize: 30,
    color: Colors.Text,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default BookshelfScreen;
