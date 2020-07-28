/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, ImageBackground, Dimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Colors from '../../../Utils/color';
import {BookScrollView} from '../../../Components';
import Book from '../../../Models/book';
import Route from '../../../Utils/router';
import BookApi from '../../../Api/bookApi';

interface Props {
  navigation: any;
}

const DiscoverScreen: React.FC<Props> = (props) => {
  const [newBookList, setNewBookList] = useState<Book[]>([]);
  const [bestSellerBookList, setBestSellerBookList] = useState<Book[]>([]);

  function onItemPress(book: Book) {
    console.log(book);
  }
  function renderBookScrollView() {
    return [<BookScrollView
    key={1}
    title="New Books"
    books={newBookList}
    onItemPress={(book) => onItemPress(book)}
    onMorePress={()=>{props.navigation.navigate(Route.ListBook, {title: 'New Books', data: newBookList});}}
  />,
  <BookScrollView
    key={2}
    title="Best Seller"
    books={bestSellerBookList}
    style={{marginBottom: 20}}
    onItemPress={(book) => onItemPress(book)}
    onMorePress={()=>{props.navigation.navigate(Route.ListBook, {title: 'Best Seller', data: bestSellerBookList});}}
  />];
  }
  async function getBookData(index: number, count: number){
    const newBookResponse:any = await BookApi.getAllNewBook(index, count, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVc2VySUQiOiIyNTVFRURGRS05RUNFLTQ3MUItOEFENS1BMjNCRDQzRDA3MTYiLCJVc2VybmFtZSI6ImRhbmdsdW9uZ3RobyIsIkZ1bGxuYW1lIjoixJDhurduZyBMxrDGoW5nIFRo4buNIiwiRW1haWwiOiJkYW5nbHVvbmd0aG9AZ21haWwuY29tIiwiUGFzc3dvcmQiOiJGQkZFQzdFODIxRjRDNDNDQjE2MjcwNDAxNzhENkMwNiIsIkFnZW50SUQiOiJZQk9PSyIsIlN1cHBsaWVySUQiOm51bGwsIkRldmljZVR5cGUiOiJBTkRST0lEIiwiRGV2aWNlTnVtYmVyIjoiMTIzNDU2IiwiTGlicmFyeVBhY2tldElEIjoiIiwiTGlicmFyeVBhY2tldE5hbWUiOiIiLCJleHAiOiIxNTk4MTY2MTQ1In0.z6dP9Wfmhe0G_b_MJhgk2G22pKKf1m1lPpdnWRLNRwE');
    const bestSellerResponse: any = await BookApi.getAllBestSellerBook(index, count, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVc2VySUQiOiIyNTVFRURGRS05RUNFLTQ3MUItOEFENS1BMjNCRDQzRDA3MTYiLCJVc2VybmFtZSI6ImRhbmdsdW9uZ3RobyIsIkZ1bGxuYW1lIjoixJDhurduZyBMxrDGoW5nIFRo4buNIiwiRW1haWwiOiJkYW5nbHVvbmd0aG9AZ21haWwuY29tIiwiUGFzc3dvcmQiOiJGQkZFQzdFODIxRjRDNDNDQjE2MjcwNDAxNzhENkMwNiIsIkFnZW50SUQiOiJZQk9PSyIsIlN1cHBsaWVySUQiOm51bGwsIkRldmljZVR5cGUiOiJBTkRST0lEIiwiRGV2aWNlTnVtYmVyIjoiMTIzNDU2IiwiTGlicmFyeVBhY2tldElEIjoiIiwiTGlicmFyeVBhY2tldE5hbWUiOiIiLCJleHAiOiIxNTk4MTY2MTQ1In0.z6dP9Wfmhe0G_b_MJhgk2G22pKKf1m1lPpdnWRLNRwE');
    const newBookListData: Book[] = newBookResponse.map((item: any)=>{
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
    setNewBookList(newBookListData);
    const bestSellerListData: Book[] = bestSellerResponse.map((item: any)=>{
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
    setBestSellerBookList(bestSellerListData);
  }
  useEffect(()=>{
    getBookData(0, 10);
  },[]);

  return (
    <View style={style.container}>
     <ScrollView style={style.middle}>
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
    height: Dimensions.get('window').height / 8,
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
