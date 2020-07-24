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
import Colors from '../../../ultils/color';
import {CategoryTag, BookScrollView} from '../../../Components';
import Data from '../../../ultils/data';

interface Props {
  navigation: any;
}

const DiscoverScreen: React.FC<Props> = (props) => {
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
            <Text style={style.titleHeader}>Discover</Text>
          </View>
          <ScrollView horizontal={true} style={style.category}>
            <CategoryTag
              onPress={() => {}}
              tittle="COMIC"
              img="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSJ7YTW8XbzRhNotonJzpOfnHDr2pn608BNCA&usqp=CAU"
            />
            <CategoryTag
              onPress={() => {}}
              tittle="DETECTIVE"
              img="https://resize.hswstatic.com/u_0/w_480/gif/private-investigator-6.jpg  "
            />
            <CategoryTag
              onPress={() => {}}
              tittle="HISTORICAL"
              img="https://www.book-editing.com/wp-content/uploads/2018/08/historical-fiction.jpg"
            />
          </ScrollView>
        </ImageBackground>
      </View>
      <View style={style.middle}>
        <BookScrollView
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
        />
      </View>
    </ScrollView>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: Dimensions.get('window').height / 4 + 40,
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

export default DiscoverScreen;
