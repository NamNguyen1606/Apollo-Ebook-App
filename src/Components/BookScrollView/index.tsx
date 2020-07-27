/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import BookProduct from '../BookProduct';
import Colors from '../../Utils/color';
import Book from '../../Models/book';

interface Props {
  title: string;
  books: Book[];
  onItemPress: (book: Book) => void;
  onMorePress: () => void;
}

const BookScrollView: React.FC<Props> = (props) => {
  function renderBookList(bookArr: Book[]) {
    let result: [] = [];
    for (let index in bookArr) {
      let widget: any = (
        <BookProduct
          key={index}
          name={bookArr[index].name}
          author={bookArr[index].author}
          img={bookArr[index].img}
          onPress={(book) => {
            props.onItemPress(book);
          }}
        />
      );
      result.push(widget);
    }
    return result;
  }

  return (
    <View style={style.container}>
      <View style={style.header}>
        <Text style={style.titleStyle}>{props.title}</Text>
        <TouchableOpacity activeOpacity={0.6} onPress={props.onMorePress}>
          <View style={style.borderSubTitle}>
            <Text>MORE</Text>
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView style={style.footer} horizontal={true}>
        {renderBookList(props.books)}
      </ScrollView>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    height: 320,
    backgroundColor: 'white',
    marginHorizontal: 20,
  },
  header: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footer: {
    flex: 2,
    backgroundColor: 'white',
  },
  titleStyle: {
    fontSize: 20,
    color: 'black',
  },
  subTitleStyle: {
    fontSize: 15,
    color: Colors.SubText,
  },
  borderSubTitle: {
    borderColor: '#D4D3D1',
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 15,
    paddingVertical: 1,
  },
});

export default BookScrollView;
