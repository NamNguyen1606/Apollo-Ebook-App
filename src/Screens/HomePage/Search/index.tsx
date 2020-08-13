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
import {useNavigation} from '@react-navigation/native';
import Route from '../../../Utils/router';

interface Props {}

const SearchScreen = () => {
  const navigation = useNavigation();
  const data: any = useContext(DataContext);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [search, setSearch] = useState<string>();
  const [list] = useState<ParentCollection[]>(data.categoryData);

  const renderItem = ({item}: any) => (
    <CategoryCard
      title={item.name}
      listSubCategory={item.children}
      onPressSubItem={(val) =>
        navigation.navigate(Route.SearchResult, {
          title: val.title,
          collectionId: val.id,
        })
      }
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
            style={style.textField}
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
  textField: {
    backgroundColor: 'white',
  },
});
export default SearchScreen;
