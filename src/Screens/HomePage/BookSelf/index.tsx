/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Colors from '../../../ultils/color';
import {BookScrollView} from '../../../Components';
import Book from '../../../Models/book';
import Data from '../../../ultils/data';

interface Props {
  navigation: any;
}

const BookShelfScreen: React.FC<Props> = (props) => {
  function onItemPress(book: Book) {
    alert(`${book.name} \n ${book.author}`);
  }
  return (
    <View style={style.container}>
      <View style={style.header}>
        <Text style={style.titleHeader}>Bookshelf</Text>
      </View>
      <ScrollView style={style.middle}>
        <BookScrollView
          title="Bookmark"
          books={Data.bookList}
          onItemPress={(book) => onItemPress(book)}
          onMorePress={()=>{props.navigation.navigate('BookShelf_More')}}
        />
       <BookScrollView
          title="Downloads"
          books={Data.bookList}
          onItemPress={(book) => onItemPress(book)}
          onMorePress={()=>{props.navigation.navigate('BookShelf_More')}}
        />
      </ScrollView>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    marginBottom: 20,
  },
  header: {
    height: 80,
    backgroundColor: Colors.Background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middle: {
    height: '100%',
    backgroundColor: 'white',
    width: '100%',
  },
  titleHeader: {
    fontSize: 25,
    color: Colors.Text,
  },
});
export default BookShelfScreen;
