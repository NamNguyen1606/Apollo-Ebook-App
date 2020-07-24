import React, { useState } from 'react';
import {View, StyleSheet, Text, TouchableWithoutFeedback, Keyboard} from 'react-native';
import Colors from '../../../ultils/color';
import {TextField, CategoryCard} from '../../../Components';
import { ScrollView } from 'react-native-gesture-handler';

interface Props {}

const SearchScreen = () => {
  const [search, setSearch] = useState<string>();
  function handleSearch(val: string) {
    setSearch(val);
  }

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
            onChangeText={(val) => handleSearch(val)}
          />
        </View>
        <View style={style.middle}>
          <Text style={style.title}>All Categories</Text>
          <ScrollView>
            <CategoryCard />
            <CategoryCard />
          </ScrollView>
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
