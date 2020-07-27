/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, Text, ScrollView, Dimensions} from 'react-native';
import Colors from '../../../Utils/color';
import {BookCard} from '../../../Components';
import {Icon} from 'react-native-elements';
import Route from '../../../Utils/router';

interface Props {
  navigation: any;
  route: any;
}

const ListBookScreen: React.FC<Props> = ({navigation, route}) => {
  const {title} = route.params;
  return (
    <View style={style.container}>
      <View style={style.header}>
        <Icon
          name="chevron-back"
          type="ionicon"
          color="white"
          size={33}
          onPress={() => {
            navigation.navigate(Route.Discover);
          }}
        />
        <Text style={style.titleHeader}>{title}</Text>
      </View>
      <View style={style.middle}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            height: 40,
            alignItems: 'flex-end',
          }}>
          <Text style={style.counterStyle}>Bookmarks</Text>
          <Text style={style.quantityStyle}>27 Books</Text>
        </View>
        <ScrollView style={{marginTop: 20}}>
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
        </ScrollView>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
    backgroundColor: 'white',
  },
  header: {
    height: 80,
    backgroundColor: Colors.Background,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  middle: {
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: 20,
  },
  titleHeader: {
    fontSize: 25,
    color: Colors.Text,
    marginLeft: Dimensions.get('window').width / 3 - 25,
  },
  counterStyle: {
    fontSize: 18,
    color: 'black',
  },
  quantityStyle: {
    fontSize: 16,
    color: '#5E6162',
  },
});
export default ListBookScreen;
