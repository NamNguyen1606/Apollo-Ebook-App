/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import {Rating} from 'react-native-elements';
import Colors from '../../ultils/color';

interface Props {}

const BookCard = () => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
      <View style={style.container}>
        <View style={style.imgHolder}>
          <Image
            style={{
              height: 190,
              width: 107,
            }}
            resizeMode="contain"
            source={{
              uri:
                'https://images-na.ssl-images-amazon.com/images/I/81zvl3KfEIL.jpg',
            }}
          />
        </View>
        <View style={style.detailHolder}>
          <Text style={style.nameStyle}>Red Dragon</Text>
          <Text style={style.authorStyle}>
            Author of ther silence of the lambs
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Tag title="HORROR" />
            <Tag title="FICTION" />
            <Tag title="FANTASY" />
          </View>
          <Text style={style.authorStyle}>by Thomas Harris</Text>
          <Rating imageSize={20} readonly={true} />
        </View>
      </View>
    </TouchableOpacity>
  );
};
const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 200,
    width: '100%',
    backgroundColor: 'white',
  },
  imgHolder: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'white',
  },
  detailHolder: {
    flex: 2.4,
    backgroundColor: 'white',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
  },
  nameStyle: {
    fontSize: 19,
    color: 'black',
    fontWeight: '600',
  },
  authorStyle: {
    fontSize: 16,
    color: Colors.SubText,
  },
});
export default BookCard;

const Tag = ({title}) => {
  return (
    <View
      style={{
        backgroundColor: '#61C4C1',
        borderRadius: 3,
        paddingHorizontal: 3,
        marginRight: 5,
      }}>
      <Text style={{fontSize: 14, color: 'white'}}>{title}</Text>
    </View>
  );
};
