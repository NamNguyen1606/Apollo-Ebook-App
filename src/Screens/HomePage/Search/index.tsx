/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Colors from '../../../Utils/color';
import {TextField, CategoryCard} from '../../../Components';
import {FlatList} from 'react-native-gesture-handler';
import CategoryApi from '../../../Api/categoryApi';
import ParentCollection from '../../../Models/parentCollection';
import ChildCollection from '../../../Models/childCollection';

interface Props {}

const SearchScreen = () => {
  const [search, setSearch] = useState<string>();
  const [list, setList] = useState<ParentCollection[]>([]);

  const renderItem = ({item}: any) => (  <CategoryCard
    title={item.name}
    listSubCategory={item.children}
    onPressSubItem={(val) => console.log(val)}
  />);

  async function LoadingCategory() {
    const response = await CategoryApi.getCategory(
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVc2VySUQiOiIyNTVFRURGRS05RUNFLTQ3MUItOEFENS1BMjNCRDQzRDA3MTYiLCJVc2VybmFtZSI6ImRhbmdsdW9uZ3RobyIsIkZ1bGxuYW1lIjoixJDhurduZyBMxrDGoW5nIFRo4buNIiwiRW1haWwiOiJkYW5nbHVvbmd0aG9AZ21haWwuY29tIiwiUGFzc3dvcmQiOiJGQkZFQzdFODIxRjRDNDNDQjE2MjcwNDAxNzhENkMwNiIsIkFnZW50SUQiOiJZQk9PSyIsIlN1cHBsaWVySUQiOm51bGwsIkRldmljZVR5cGUiOiJBTkRST0lEIiwiRGV2aWNlTnVtYmVyIjoiMTIzNDU2IiwiTGlicmFyeVBhY2tldElEIjoiIiwiTGlicmFyeVBhY2tldE5hbWUiOiIiLCJleHAiOiIxNTk4MTY2MTQ1In0.z6dP9Wfmhe0G_b_MJhgk2G22pKKf1m1lPpdnWRLNRwE',
    );
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
    setList(listCategory);
    console.log('render');
  }
  useEffect(()=>{
    LoadingCategory();
  }, []);
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={style.container}>
        <View style={style.header}>
          <TextField
            style={{backgroundColor: 'white'}}
            title="Search book or author"
            icon="search"
            onChangeText={(val) => setSearch(val)}
            onIconPress={LoadingCategory}
          />
        </View>
        <View style={style.middle}>
          <Text style={style.title}>All Categories</Text>
          <FlatList
            data={list}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 100,
    backgroundColor: Colors.Background,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  middle: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    marginHorizontal: 20,
    marginVertical: 15,
    fontWeight: 'bold',
  },
});
export default SearchScreen;
