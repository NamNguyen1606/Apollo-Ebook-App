import React, {useEffect, useContext} from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import Colors from '../../Utils/color';
import LottieView from 'lottie-react-native';
import Book from '../../Models/book';
import BookApi from '../../Api/bookApi';
import Route from '../../Utils/router';
import CategoryApi from '../../Api/categoryApi';
import ParentCollection from '../../Models/parentCollection';
import ChildCollection from '../../Models/childCollection';
import {StoreProviderInterface, GlobalContext} from '../../Utils/StoreProvider';
const Token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVc2VySUQiOiIyNTVFRURGRS05RUNFLTQ3MUItOEFENS1BMjNCRDQzRDA3MTYiLCJVc2VybmFtZSI6ImRhbmdsdW9uZ3RobyIsIkZ1bGxuYW1lIjoixJDhurduZyBMxrDGoW5nIFRo4buNIiwiRW1haWwiOiJkYW5nbHVvbmd0aG9AZ21haWwuY29tIiwiUGFzc3dvcmQiOiJGQkZFQzdFODIxRjRDNDNDQjE2MjcwNDAxNzhENkMwNiIsIkFnZW50SUQiOiJZQk9PSyIsIlN1cHBsaWVySUQiOm51bGwsIkRldmljZVR5cGUiOiJBTkRST0lEIiwiRGV2aWNlTnVtYmVyIjoiMTIzNDU2IiwiTGlicmFyeVBhY2tldElEIjoiIiwiTGlicmFyeVBhY2tldE5hbWUiOiIiLCJleHAiOiIxNTk4MTY2MTQ1In0.z6dP9Wfmhe0G_b_MJhgk2G22pKKf1m1lPpdnWRLNRwE';
interface Props {
  navigation: any;
}

const SplashScreen: React.FC<Props> = (props) => {
  let newBookList: Book[] = [];
  let bestSellerBookList: Book[] = [];
  let categoryList: ParentCollection[] = [];
  const {newBook, bestSellerBook, categoryData} = useContext<
    StoreProviderInterface
  >(GlobalContext);
  async function getBookData(index: number, count: number) {
    const newBookResponse: any = await BookApi.getAllNewBook(
      index,
      count,
      Token,
    );
    const bestSellerResponse: any = await BookApi.getAllBestSellerBook(
      index,
      count,
      Token,
    );
    const newBookListData: Book[] = newBookResponse.map((item: any) => {
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
    const bestSellerListData: Book[] = bestSellerResponse.map((item: any) => {
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
    newBookList = newBookListData;
    bestSellerBookList = bestSellerListData;
    return true;
  }

  async function getCategory() {
    const response: any = await CategoryApi.getCategory(Token);
    let collection: any;
    let isAdd: boolean = true;
    let listCategory: ParentCollection[] = [];
    response.map((item: any) => {
      if (item.ParentID === '') {
        isAdd = !isAdd;
        if (isAdd) {
          listCategory.push(collection);
          isAdd = !isAdd;
        }
        collection = new ParentCollection(
          item.CollectionID,
          item.CollectionName,
        );
      } else {
        let subCollection = new ChildCollection(
          item.CollectionID,
          item.CollectionName,
          item.TotalBooks,
          item.ParentID,
        );
        collection.children.push(subCollection);
      }
    });
    categoryList = listCategory;
    return true;
  }

  useEffect(() => {
    const fetchData = async () => {
      const isBookLoadingDone = await getBookData(0, 10);
      const isCategoryLoadingDone = await getCategory();
      if (isBookLoadingDone && isCategoryLoadingDone) {
        newBook.setData(newBookList);
        bestSellerBook.setData(bestSellerBookList);
        categoryData.setData(categoryList);
        props.navigation.navigate(Route.Welcome);
      }
    };
    fetchData();
  }, []);
  return (
    <View style={style.container}>
      <Text style={style.tittleStyle}>apollo</Text>
      <LottieView
        style={style.imgHolder}
        resizeMode="contain"
        source={require('../../Asset/Animation/line_loading.json')}
        autoPlay
        loop
      />
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Dimensions.get('window').height / 3,
    backgroundColor: Colors.Background,
    alignItems: 'center',
  },
  imgHolder: {
    backgroundColor: 'transparent',
    height: 80,
    width: 100,
  },
  tittleStyle: {
    // top: -90,
    fontSize: 55,
    fontWeight: 'bold',
    color: 'white',
  },
});
export default SplashScreen;
