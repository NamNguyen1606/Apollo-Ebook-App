/* eslint-disable prettier/prettier */
import React, {useState, useContext} from 'react';
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
import ParentCollection from '../../../Models/parentCollection';
import {DataContext} from '../../../Navigation/homeTab';

interface Props {}

const SearchScreen = () => {
  const data = useContext(DataContext);
  const {categoryData} = data;
  const [search, setSearch] = useState<string>();
  const [list] = useState<ParentCollection[]>(categoryData);

  const renderItem = ({item}: any) => (
    <CategoryCard
      title={item.name}
      listSubCategory={item.children}
      onPressSubItem={(val) => console.log(val)}
    />
  );

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
            onIconPress={() => {}}
          />
        </View>
        <View style={style.middle}>
          <Text style={style.title}>All Categories</Text>
          <FlatList
            data={list}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            getItemLayout={(data, index) => ({
              length: 60,
              offset: index * 60,
              index,
            })}
            showsVerticalScrollIndicator={false}
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
