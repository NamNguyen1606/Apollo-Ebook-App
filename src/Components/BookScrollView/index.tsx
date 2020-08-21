import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  TextStyle,
} from 'react-native';
import BookProduct from '../BookProduct';
import Colors from '../../Utils/color';
import Book from '../../Models/book';
import {vs, ms} from '../../Utils/Scaling';

interface Props {
  title?: string;
  books: Book[];
  style?: TextStyle;
  onItemPress: (book: Book) => void;
  onMorePress: () => void;
  isShowHeader?: boolean;
}

const BookScrollView: React.FC<Props> = (props) => {
  function renderBookList(bookArr: Book[]) {
    let result: any[] = [];
    if (bookArr.length === 0) {
      return [];
    }
    for (let book of bookArr) {
      let widget: any = (
        <BookProduct
          key={book.id}
          img={book.imgUrl}
          title={book.title}
          data={book}
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
    <View style={[style.container, props.style]}>
      {props.isShowHeader ? (
        <View style={style.header}>
          <Text style={style.titleStyle}>{props.title}</Text>
          <TouchableOpacity activeOpacity={0.6} onPress={props.onMorePress}>
            <View style={style.borderSubTitle}>
              <Text style={{color: Colors.DarkGrey}}>MORE</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : null}
      <ScrollView
        style={style.footer}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {renderBookList(props.books)}
      </ScrollView>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    height: vs(300),
    backgroundColor: 'white',
  },
  header: {
    height: vs(70),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footer: {
    flex: 2,
    backgroundColor: 'white',
  },
  titleStyle: {
    fontSize: ms(20),
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

export default React.memo(BookScrollView);
